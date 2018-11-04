from django.conf.urls import url, include
from rest_framework import routers
from .views import CourseViewSet, LessonViewSet

router = routers.DefaultRouter()
router.register('courses', CourseViewSet)
router.register('lessons', LessonViewSet)

urlpatterns = [
    url('', include(router.urls))
]