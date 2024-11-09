from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.

@api_view(['GET'])
def welcome_view(request):
    data = {"message": "Welcome to DRA"}
    return Response(data)
