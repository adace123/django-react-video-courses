from rest_framework import serializers
from django.contrib.auth.models import User
from courses.serializers import CourseSerializer
from .models import Membership, Subscription, UserMembership

class MembershipSerializer(serializers.ModelSerializer):

    courses = CourseSerializer(many=True)

    class Meta:
        model = Membership
        fields = ['price', 'membership_type', 'courses']

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'username']

class SubscriptionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Subscription
        fields = ['user_membership', 'stripe_subscription_id', 'membership', 'active']

class UserMembershipSerializer(serializers.ModelSerializer):

    membership = MembershipSerializer('membership')
    user = UserSerializer('user')

    class Meta:
        model = UserMembership
        fields = ['user', 'stripe_id', 'membership']
