from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils.text import slugify
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, email, full_name, password=None):
        if not email:
            raise ValueError("Email is required")

        user = self.model(
            email=self.normalize_email(email),
            full_name=full_name
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, password):
        user = self.create_user(email, full_name, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.email

from django.conf import settings
from django.db import models, transaction
from django.db.models import Q


class Address(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="addresses",
    )

    label = models.CharField(max_length=30, blank=True)  # Home/Work/etc
    full_name = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=15, blank=True)

    line1 = models.CharField(max_length=255)
    line2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=2, default="IN")  # ISO-2

    notes = models.CharField(max_length=255, blank=True)
    is_default = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-is_default", "-updated_at"]
        indexes = [
            models.Index(fields=["user", "is_default"]),
            models.Index(fields=["user", "updated_at"]),
        ]
        constraints = [
            # Ensures at most one default address per user
            models.UniqueConstraint(
                fields=["user"],
                condition=Q(is_default=True),
                name="uniq_default_address_per_user",
            ),
        ]

    def __str__(self):
        return f"{self.user_id} - {self.line1}, {self.city}"

    @transaction.atomic
    def make_default(self):
        Address.objects.filter(user=self.user, is_default=True).exclude(pk=self.pk).update(is_default=False)
        Address.objects.filter(pk=self.pk).update(is_default=True)



# class Category(models.Model):
#     name = models.CharField(max_length=100, unique=True)
#     slug = models.SlugField(unique=True)
#     icon = models.CharField(max_length=50, blank=True)
#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.name


# class SubCategory(models.Model):
#     category = models.ForeignKey(
#         Category,
#         related_name="subcategories",
#         on_delete=models.CASCADE
#     )
#     name = models.CharField(max_length=100)
#     slug = models.SlugField()
#     image = models.ImageField(upload_to="subcategories/", blank=True, null=True)
#     is_active = models.BooleanField(default=True)  # ✅ ADD THIS

#     def __str__(self):
#         return f"{self.category.name} → {self.name}"



# ============================
# CATEGORY
# ============================
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# ============================
# SUB CATEGORY (NO IMAGE ✅)
# ============================
class SubCategory(models.Model):
    category = models.ForeignKey(
        Category,
        related_name="subcategories",
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)
    slug = models.SlugField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.category.name} → {self.name}"


# ============================
# PRODUCT (IMAGE + PRICE HERE ✅)
# ============================
# class Product(models.Model):
#     category = models.ForeignKey(
#         Category,
#         related_name="products",
#         on_delete=models.CASCADE
#     )
#     subcategory = models.ForeignKey(
#         SubCategory,
#         related_name="products",
#         on_delete=models.CASCADE
#     )

#     name = models.CharField(max_length=150)
#     slug = models.SlugField(unique=True)

#     image = models.ImageField(upload_to="products/")
#     mrp = models.DecimalField(max_digits=10, decimal_places=2)
#     price = models.DecimalField(max_digits=10, decimal_places=2)

#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.name
    

# class Announcement(models.Model):
#     description = models.CharField(max_length=255)
#     is_active = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.description

class Announcement(models.Model):
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description[:50]



class Banner(models.Model):
    tag = models.CharField(max_length=50)  # eg: "Fresh Arrival"
    heading = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="banners/")
    link = models.CharField(max_length=200) 
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.heading


class Product(models.Model):
    category = models.ForeignKey(
        Category,
        related_name="products",
        on_delete=models.CASCADE
    )
    subcategory = models.ForeignKey(
        SubCategory,
        related_name="products",
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)

    image = models.ImageField(upload_to="products/")
    mrp = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    # ✅ STOCK MANAGEMENT
    in_stock = models.BooleanField(default=True)
    stock_quantity = models.PositiveIntegerField(default=0)

    # ✅ PRODUCT PRIORITY (HIGHER = SHOWN FIRST)
    priority = models.PositiveIntegerField(default=0)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    
from django.db import models
from django.utils import timezone


class PromoCode(models.Model):
    code = models.CharField(max_length=20, unique=True)
    discount_percent = models.PositiveIntegerField(
        help_text="Discount percentage (e.g., 10 for 10%)"
    )
    valid_from = models.DateTimeField(default=timezone.now)
    valid_until = models.DateTimeField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.code} - {self.discount_percent}%"

    @property
    def is_valid(self):
        now = timezone.now()
        return self.active and self.valid_from <= now <= self.valid_until