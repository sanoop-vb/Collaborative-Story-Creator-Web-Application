from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Story, Contribution
from .serializers import StorySerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import ContributionSerializer


@api_view(['POST'])
def create_story(request):
    if request.method == 'POST':
        # Get the authenticated user from the request
        user = request.user
        data = request.data

        # Create the story, setting created_by automatically from request.user
        story = Story.objects.create(
            title=data.get('title'),
            content=data.get('content'),
            created_by=user,  # Set the author to the current user
        )

        # Serialize the created story
        serializer = StorySerializer(story)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_stories(request):
    stories = Story.objects.all()
    serializer = StorySerializer(stories, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_story(request, story_id):
    try:
        # Fetch the story
        story = Story.objects.get(pk=story_id)

        # Fetch the contributions related to the story
        contributions = Contribution.objects.filter(story=story).order_by('created_at')

        # Start with the main story content
        final_content = story.content

        # Append each contribution's content to the main story content
        for contribution in contributions:
            final_content += ' ' +  contribution.content

        # Serialize the story and contributions
        story_serializer = StorySerializer(story)
        contribution_serializer = ContributionSerializer(contributions, many=True)

        # Return the full story with appended contributions
        return Response({
            'story': {
                'id': story_serializer.data['id'],
                'title': story_serializer.data['title'],
                'content': final_content,  # Concatenated content
                'created_by': story_serializer.data['created_by'],
                'author_username':story_serializer.data['author_username'],
                'is_completed': story_serializer.data['is_completed'],
            },
            'contributions': contribution_serializer.data
        }, status=status.HTTP_200_OK)

    except Story.DoesNotExist:
        return Response({"error": "Story not found."}, status=status.HTTP_404_NOT_FOUND)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_contribution(request, story_id):
    try:
        story = Story.objects.get(pk=story_id)
    except Story.DoesNotExist:
        return Response({"error": "Story not found."}, status=status.HTTP_404_NOT_FOUND)

    if story.contributions.count() >= 4:
        return Response({"error": "This story is already completed."}, status=status.HTTP_400_BAD_REQUEST)

    data = request.data.copy()  # Copy the request data so we can add extra fields
    data['story'] = story.id  # Add the story ID to the contribution data
    data['author'] = request.user.id  # Add the user ID as the author of the contribution

    serializer = ContributionSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        # Check if the story has reached 4 contributions
        if story.contributions.count() == 4:
            story.is_completed = True
            story.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register(request):
    username = request.data.get('username')  # Get the username from the request
    email = request.data.get('email')
    password = request.data.get('password')

    # Validate inputs
    if not username or not email or not password:
        return Response({'error': 'Username, email, and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the username or email is already registered
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username is already taken.'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email is already registered.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new user
    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')


    # Authenticate the user
    user = authenticate(request, username=username, password=password)

    if user is not None:
        # Create tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username':username,
            'email': user.email


        })
    else:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_story(request, story_id):
    try:
        story = Story.objects.get(pk=story_id)
    except Story.DoesNotExist:
        return Response({"error": "Story not found."}, status=status.HTTP_404_NOT_FOUND)

    # Check if the user is the author or an admin
    if story.created_by != request.user and not request.user.is_staff:
        return Response({"error": "You do not have permission to delete this story."}, status=status.HTTP_403_FORBIDDEN)

    story.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)