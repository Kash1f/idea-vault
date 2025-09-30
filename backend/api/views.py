from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, VaultItemSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import VaultItem


# GET and POST for vault items
class VaultItemListCreate(generics.ListCreateAPIView):
    serializer_class = VaultItemSerializer
    permission_classes = [IsAuthenticated] # this route can't be called unless user is authenticated and a valid JWT token is passed

    
    def get_queryset(self): # using get_queryset to filter vault items by the authenticated user
        user = self.request.user
        return VaultItem.objects.filter(author=user) # vault items created by the authenticated users are returned
    
    def perform_create(self, serializer):
        if serializer.is_valid(): # if serializer is valid, save the vault item with the author which is the authenticated user
            serializer.save(author=self.request.user) # manually adding the author field since it's read only
        else:
            print(serializer.errors)

# PUT for vault items

class VaultItemUpdate(generics.UpdateAPIView):
    serializer_class = VaultItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return VaultItem.objects.filter(author=user)

# DELETE for vault items
class VaultItemDelete(generics.DestroyAPIView):
    serializer_class = VaultItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return VaultItem.objects.filter(author=user)
     

# creating a view with generics that automatically registers a new user
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() # consider this queryset as a list of all users
    serializer_class = UserSerializer # this specifies the data we need to accept to make a new user so here username and password
    permission_classes = [AllowAny] # this permission specifies who can call this 

class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    #object instead of queryset because we are retrieving a single object, queryset is for multiple objects
    def get_object(self):
        return self.request.user
    