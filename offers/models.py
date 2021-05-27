from django.db import models
from uuid import uuid4
import os

from django.db.models.signals import pre_save
from authentication.models import User
from django.dispatch import receiver
from gdstorage.storage import GoogleDriveStorage

gd_storage = GoogleDriveStorage()


def path_and_rename(instance, filename):
    upload_to = 'images/'
    ext = filename.split('.')[-1]
    if instance.id:
        filename = '{}.{}'.format(instance.id, ext)
    else:
        filename = '{}.{}'.format(uuid4().hex, ext)
    return os.path.join(upload_to, filename)

# Create your models here.


class Offer(models.Model):
    product = models.CharField("Name of the product", max_length=100)
    shop = models.CharField("Name of the shop", max_length=100)
    city = models.CharField("City of the shop", max_length=100)
    region = models.CharField("Region", max_length=100)
    price = models.DecimalField(
        "Price (€)", max_digits=6, decimal_places=2, null=False, blank=False)
    date = models.DateField(auto_now_add=True, null=False, blank=False)
    image = models.ImageField(upload_to=path_and_rename, storage=gd_storage, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        unique_together = (('product', 'shop', 'city', 'date'),)
        ordering = ['-date', 'product']

    def __str__(self):
        return f'{self.product}, {self.price}, @({self.shop}, {self.city}), {self.date}'

@receiver(models.signals.post_delete, sender=Offer)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `Offer` object is deleted.
    """
    if instance.image:
        gd_storage.delete('images/' + str(instance.image))