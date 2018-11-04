from django.contrib import admin
from .models import Membership, UserMembership, Subscription

# Register your models here.
@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    pass

@admin.register(UserMembership)
class UserMembershipAdmin(admin.ModelAdmin):
    pass

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    pass
