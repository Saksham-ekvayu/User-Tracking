'''from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_user, name='create_user'),
    path('user/<str:unique_id>/', views.get_user_details, name='user_details'),
    path('users/', views.all_users, name='all_users'),
]'''

from django.urls import path
from . import views

urlpatterns = [
    path('api/user-tracking/', views.create_details, name='create_details'),
    path('api/user-details/all/', views.get_all_details, name='get_all_details'),
    path('api/user-details/<str:unique_id>/', views.get_user_details, name='get_user_details'),
    path('api/total-visits/', views.get_total_visits, name='get_total_visits'),
    path('api/user-details/<str:unique_id>/update/', views.update_user_details, name='update_user_details'),

    path('api/<str:offer_type>/offers/', views.create_offer, name='create_offer'),
    path('api/<str:offer_type>/offers/all/', views.get_all_offers, name='get_all_offers'),
    path('api/<str:offer_type>/offers/<int:pk>/', views.get_offer, name='get_offer'),
    path('api/<str:offer_type>/offers/<int:pk>/update/', views.update_offer, name='update_offer'),


]




