from django.shortcuts import render
from django.http import JsonResponse
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import os
from django.views.decorators.csrf import csrf_exempt


cred = credentials.Certificate(os.path.join(os.getcwd(), 'serviceAccountKey.json'))
firebase_admin.initialize_app(cred, {

})
def index(request):
    return render(request, 'index.html')

def example(request):
    data = {
        'message': 'This is a GET endpoint response',
    }
    return JsonResponse(data)

@csrf_exempt
def login_api(self, request):
    username = request.data.get('username')
    password = request.data.get('password')
    ref = db.reference('/users')
    user_data = ref.child(username).get()
    if user_data and user_data.get('password') == password:
        return JsonResponse({'status': True})
    else:
        return JsonResponse({'status': False})