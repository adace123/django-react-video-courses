from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import CourseSerializer, LessonSerializer
from .models import Course, Lesson

# # Create your views here.
class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    permission_classes = [AllowAny]

class LessonViewSet(viewsets.ModelViewSet):
    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()
    permission_classes = [AllowAny]

    def get_queryset(self):
        course = self.request.query_params.get('course', None)
        if course:
            return self.queryset.filter(course=int(course))
        return self.queryset
