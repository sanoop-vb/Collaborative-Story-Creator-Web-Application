from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Story(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    is_completed = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    #image = models.ImageField(upload_to='story_images/', blank=True, null=True)

    def __str__(self):
        return self.title

class Contribution(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name="contributions")
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author.username}: {self.content[:30]}"
