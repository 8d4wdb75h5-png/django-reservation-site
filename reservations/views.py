from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponseNotAllowed
from django.db import transaction
from .models import Slot

def index(request):
    slots = Slot.objects.all()
    return render(request, "reservations/index.html", {"slots": slots})

@transaction.atomic
def reserve(request, slot_id):
    if request.method != "POST":
        return HttpResponseNotAllowed(["POST"])

    # *ここが二重防止の核心：行ロック
    slot = Slot.objects.select_for_update().get(id=slot_id)

    # 残り0なら減らさない（満席）
    if slot.capacity <= 0:
        return redirect("reservations:index")
    
    slot.capacity -= 1
    slot.save(update_fields=["capacity"])

    return redirect("reservations:thanks")

def thanks(request):
    return render(request, "reservations/thanks.html")


