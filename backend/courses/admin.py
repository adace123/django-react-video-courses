from django.contrib import admin
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Course, Lesson

# Register your models here.

class LessonInline(admin.TabularInline):
    model = Lesson
    fields = ('title', 'video_url')
    show_change_link = True
    extra = 0

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    inlines = [LessonInline]
    

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    model = Lesson
    readonly_fields = ['video_preview']
