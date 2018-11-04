from django.db import models
from django.contrib import admin
from django.utils.html import mark_safe
import re

# Create your models here.
class Course(models.Model):

    title = models.CharField(max_length=250)
    description = models.TextField(default='')
    created_at = models.DateTimeField(auto_now=True)
    premium = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
class Lesson(models.Model):

    video_url = models.URLField()
    title = models.CharField(max_length=250)
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='lessons')
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}: Lesson {}".format(self.course, self.course.lessons.count())

    def video_preview(self):
        return mark_safe("<iframe width=400 height=300 src={}></iframe>".format(self.video_url))

    def save(self, *args, **kwargs):
        self.video_url = re.sub(r'watch\?v=', 'embed/', self.video_url)
        super(Lesson, self).save(*args, **kwargs)
