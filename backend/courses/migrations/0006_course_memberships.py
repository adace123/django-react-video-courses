# Generated by Django 2.1.2 on 2018-11-02 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('memberships', '0007_remove_membership_courses'),
        ('courses', '0005_course_premium'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='memberships',
            field=models.ManyToManyField(to='memberships.Membership'),
        ),
    ]
