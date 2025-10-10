from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import generics
from .serializers import UserSerializer, VaultItemSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import VaultItem


class VaultItemViewSet(viewsets.ModelViewSet):
    serializer_class = VaultItemSerializer
    permission_classes = [IsAuthenticated] # this route can't be called unless user is authenticated and a valid JWT token is passed

    # determining which objects the view should show
    def get_queryset(self): # using get_queryset to filter vault items by the authenticated user
        user = self.request.user
        return VaultItem.objects.filter(author=user).order_by('-created_at')

    def perform_create(self, serializer):
        if serializer.is_valid(): # if serializer is valid, save the vault item with the author which is the authenticated user
            serializer.save(author=self.request.user) # manually adding the author field since it's read only
        else:
            print(serializer.errors)


# creating a view with generics that automatically registers a new user
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() # consider this queryset as a list of all users
    serializer_class = UserSerializer # this specifies the data we need to accept to make a new user so here username and password
    permission_classes = [AllowAny] # this permission specifies who can call this 

# view to retrieve the profile of the currently authenticated user, will use the same User object and serializer
class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    # object instead of queryset because we are retrieving a single object, queryset is for multiple objects
    def get_object(self):
        return self.request.user
    


