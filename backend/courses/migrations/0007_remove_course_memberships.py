# Generated by Django 2.1.2 on 2018-11-02 07:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0006_course_memberships'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='memberships',
        ),
    ]