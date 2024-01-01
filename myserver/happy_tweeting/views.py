import json
import sys

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def index(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(body)
        response = JsonResponse({
            "score": 0.9
        })
        response["Access-Control-Allow-Origin"] = "*"
        return response
    elif request.method == "OPTIONS":
        response = HttpResponse()
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "Access-Control-Allow-Origin, Content-Length, Content-Type, accept"
        return response
    else:
        response = JsonResponse({
            "status": "online",
            "version": "1.0.0"
        })
        response["Access-Control-Allow-Origin"] = "*"
        return response
