from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, UserProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/user/profile/", UserProfileView.as_view(), name="user_profile"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")), # including the urls from the api app 
]

"""
these views are are pre-built views connecting our Auth Routes that allow us to obtain our access and refresh tokens and to refresh the token, they're already built for us and now that we've implemented what we need to do which is creating a new user once the user is created we can use these pre-built views to obtain the token for that user and to effectively sign them in
"""


