"""
URL configuration for djangoapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('Main/', views.index, name='main'),
    path('Dashboard/', views.index, name='dashboard'),
    path('Login/', views.index, name='login'),
    path('Register/', views.index, name='register'),
    path('api/login/', views.login_api, name='login_api'),
    path('api/example/', views.example, name='example'),
    path('api/register/', views.register_api, name='register_api'),
    path('api/projects/', views.projects_api, name='projects_api'),
    path('api/project/<int:project_id>/', views.project_details_api, name='project_details_api'),
]

