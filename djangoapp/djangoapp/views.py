from django.shortcuts import render
from django.http import JsonResponse
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import os
from django.views.decorators.csrf import csrf_exempt

cred = credentials.Certificate(os.path.join(os.getcwd(), 'serviceAccountKey.json'))
firebase_admin.initialize_app(cred, {
    "apiKey": "AIzaSyDvy3PE_ncl1CRLT2efnBkGav9iFHsBujU",
    "authDomain": "coauthorly.firebaseapp.com",
    "databaseURL": "https://coauthorly-default-rtdb.firebaseio.com",
    "projectId": "coauthorly",
    "storageBucket": "coauthorly.appspot.com",
    "messagingSenderId": "1076406101513",
    "appId": "1:1076406101513:web:1e477aaa3e4b5ede5fbad8",
    "measurementId": "G-34SN4QNMF4"
})

def index(request):
    return render(request, 'index.html')

def example(request):
    data = {
        'message': 'This is a GET endpoint response',
    }
    return JsonResponse(data)

@csrf_exempt
def login_api(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    ref = db.reference('/users')
    user_data = ref.child(username).get()
    if user_data and user_data.get('password') == password:
        return JsonResponse({'status': True})
    else:
        return JsonResponse({'status': False})

@csrf_exempt
def register_api(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    ref = db.reference('/users')
    if ref.child(username).get():
        return JsonResponse({'status': False, 'message': 'Username already exists.'})
    else:
        user_data = {
            'password': password
        }
        ref.child(username).set(user_data)
        return JsonResponse({'status': True, 'message': 'Registration successful.'})

def fetch_projects_api(request):
    ref = db.reference('/projects')
    projects = ref.get()
    return JsonResponse({'projects': projects})

def fetch_project_details_api(request, project_id):
    ref = db.reference('/projects')
    project_data = ref.child(project_id).get()
    if project_data:
        return JsonResponse({'status': True, 'project_data': project_data})
    else:
        return JsonResponse({'status': False, 'message': 'Project not found.'})
