from django.urls import path
from . import views

urlpatterns = [
    path('stories/', views.list_stories, name='story_list'),
    path('stories/<int:story_id>/', views.get_story, name='story_detail'),
    path('stories/new/', views.create_story, name='create_story'),
    path('stories/<int:story_id>/contribute/', views.add_contribution, name='add_contribution'),
    path('api/register/', views.register, name='register'),
    path('api/login/', views.login_view, name='login'),  # Add the login path
    path('stories/<int:story_id>/delete', views.delete_story, name='delete'),
]
