from django.urls import path
from . import views

app_name = "reservations"

urlpatterns = [
    path("", views.index, name="index"),
    path("slots/<int:slot_id>/reserve/", views.reserve, name="reserve"),
    path("thanks/", views.thanks, name="thanks"),
    path("cancel/<int:reservation_id>/",views.cansel_reservation,name="cansel_reservation"),
    path("manage/", views.manage_home, name="manage_home"),
]

