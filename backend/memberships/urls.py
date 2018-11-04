from django.urls import include, path
from rest_framework import routers
from .views import MembershipViewSet, SubscriptionViewSet, UserMembershipViewSet, \
LoginView, RegisterView, LogoutView

router = routers.DefaultRouter()
router.register('memberships', MembershipViewSet)
router.register('subscriptions', SubscriptionViewSet)
router.register('user_memberships', UserMembershipViewSet)

auth_urls = [
    path('login', LoginView.as_view()),
    path('register', RegisterView.as_view()),
    path('logout', LogoutView.as_view()),
]

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include(auth_urls)),
]