from rest_framework import serializers
from .models import Story, Contribution



class ContributionSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = Contribution
        fields = '__all__'

    def validate_content(self, value):
        # Split the content by spaces to count the number of words
        word_count = len(value.split())

        # Check if the word count exceeds 20 words
        if word_count > 20:
            raise serializers.ValidationError('The contribution cannot exceed 20 words.')

        return value

class StorySerializer(serializers.ModelSerializer):
    contributions = ContributionSerializer(many=True,read_only=True)  # Assuming reverse relationship is 'contributions'
    author_username = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = Story
        fields = '__all__'


