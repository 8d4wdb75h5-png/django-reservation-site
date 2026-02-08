from django.db import models
from django.utils import timezone


class Slot(models.Model):
    date = models.DateField()
    time = models.TimeField()
    capacity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ("date", "time")
        ordering = ["date", "time"]

    def __str__(self):
        return f"{self.date} {self.time.strftime('%H:%M')} (cap:{self.capacity})"

    @property
    def reserved_count(self):
        return self.reservations.filter(status=Reservation.Status.ACTIVE).count()

    @property
    def is_full(self):
        return self.reserved_count >= self.capacity


class Reservation(models.Model):
    class Status(models.TextChoices):
        ACTIVE = "active", "予約中"
        CANCELED = "canceled", "キャンセル"

    slot = models.ForeignKey(Slot, related_name="reservations", on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.ACTIVE)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} / {self.slot} ({self.status})"


