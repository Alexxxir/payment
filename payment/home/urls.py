from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('index.html', views.home),
    path('admin/', views.admin),
    path('admin/from_card/', views.from_card),
    path('admin/from_request/', views.from_request),
    path('admin/request_select/', views.request_select),
    path('admin/card_select/', views.card_select)
]
