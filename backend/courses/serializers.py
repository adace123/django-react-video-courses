from rest_framework import serializers
from .models import Course, Lesson

class LessonSerializer(serializers.ModelSerializer):

    course = serializers.SlugRelatedField(read_only=True, slug_field='title')
    
    class Meta:
        model = Lesson
        fields = ['title', 'video_url', 'course']

class CourseSerializer(serializers.ModelSerializer):

    lessons = LessonSerializer(many=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'lessons']
