from django.db import models
from courses.models import Course
from django.contrib.auth.models import User

# Create your models here.
class Membership(models.Model):
    membership_choices = (('FREE', 'Free'), ('PROFESSIONAL', 'Professional'), ('ENTERPRISE', 'Enterprise'))
    membership_type = models.CharField(max_length=250, choices=membership_choices)
    price = models.IntegerField()
    courses = models.ManyToManyField(to=Course)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.membership_type

class UserMembership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stripe_id = models.CharField(max_length=250)
    membership = models.ForeignKey(Membership, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class Subscription(models.Model):
    user_membership = models.ForeignKey(UserMembership, on_delete=models.CASCADE)
    stripe_subscription_id = models.CharField(max_length=250)
    membership = models.ForeignKey(Membership, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.user_membership)
