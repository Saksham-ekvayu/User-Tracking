from django.db import models
from django.utils.timezone import now
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator

class Details(models.Model):
    username = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    uniqueId = models.CharField(max_length=255, unique=True)    
    os = models.CharField(max_length=100, default="Unknown")
    timezone = models.CharField(max_length=100, null=True, blank=True)
    visit_timestamp = models.DateTimeField(default=now)
    visited_routes = models.JSONField(default=list)
    ekvayu_visit_count = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Details"

class TotalVisits(models.Model):
    total_ekvayu_visit_count = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Total Visits"

class BaseOffers(models.Model):
    OFFER_CHOICES = [
        ('basic', 'Basic'),
        ('standard', 'Standard'),
        ('premium', 'Premium'),
    ]
    
    title = models.CharField(max_length=200, blank=False)
    description = models.TextField(blank=True,null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)],null=True,blank=True)
    features = models.JSONField(default=list, null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    offer_type = models.CharField(max_length=20, choices=OFFER_CHOICES, unique=True)

    class Meta:
        verbose_name_plural = "Offers"
        ordering = ['-created_at']

    def clean(self):
        if BaseOffers.objects.filter(offer_type=self.offer_type).exists() and not self.pk:
            raise ValidationError(f"A {self.offer_type} offer already exists")



