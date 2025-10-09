from django.contrib.auth.models import User
from rest_framework import serializers
from .models import VaultItem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"] #these fields will be serialized when accepting new user & returning a new user
        extra_kwargs = {"password": {"write_only": True}} #making sure password is not returned when returning a user, read only

    # validating data so that input is vaild to create the user
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class VaultItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = VaultItem
        fields = [
            "id", "title", "content", "status", "category", "priority", 
            "market_potential", "target_audience", "revenue_model", 
            "competition_level", "created_at", "updated_at", "author"
        ]
        extra_kwargs = {"author": {"read_only": True}}



















# We're going to pass to this the validated data, and then we return the user. Now all this is doing is implementing a method that will be called when we want to create a new version of this user. 

# In this case, to create a new version of the user, we're going to accept the validated data. This is data that has already passed all of the checks that the serializer does for us, where it looks for a valid username and a valid password.

# What happens is the serializer will look at the model, it will look at all of the fields on that model, and the ones we've specified here. It will make sure that they are valid, and if they're valid, it will pass the data here. Once the data has been passed here, it's up to us to actually create the new user.