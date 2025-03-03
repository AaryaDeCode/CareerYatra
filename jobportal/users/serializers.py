from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from .models import CustomUser

CustomUser = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "password", "user_type"]

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            user_type=validated_data["user_type"],
        )
        return user


class LoginSerializer(serializers.Serializer):
    email_or_username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email_or_username = data.get("email_or_username")
        password = data.get("password")

        user = authenticate(username=email_or_username, password=password)

        if user is None:
            try:
                user_obj = CustomUser.objects.get(email=email_or_username)
                user = authenticate(username=user_obj.username, password=password)
            except CustomUser.DoesNotExist:
                raise serializers.ValidationError("Invalid credentials")

        if user is None:
            raise serializers.ValidationError("Invalid credentials")

        return {"user": user}


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "user_type"]
