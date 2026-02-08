from django.urls import path
from . import views

app_name = "reservations"

urlpatterns = [
    path("", views.index, name="index"),
    path("slots/<int:slot_id>/reserve/", views.reserve, name="reserve"),
    path("thanks/", views.thanks, name="thanks"),
]

