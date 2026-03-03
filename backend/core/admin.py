from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Category,Announcement
from .models import Address

# ---------------- USER ADMIN ----------------
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    model = User

    list_display = ('id', 'email', 'full_name', 'phone', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('full_name', 'phone')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
        ('Important Dates', {'fields': ('last_login', 'created_at')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'full_name', 'phone', 'password1', 'password2'),
        }),
    )

    search_fields = ('email', 'full_name', 'phone')
    ordering = ('email',)


# from django.contrib import admin
# from .models import Category, SubCategory

# class SubCategoryInline(admin.TabularInline):
#     model = SubCategory
#     extra = 1

# @admin.register(Category)
# class CategoryAdmin(admin.ModelAdmin):
#     list_display = ("name", "slug", "is_active")
#     prepopulated_fields = {"slug": ("name",)}
#     inlines = [SubCategoryInline]

# @admin.register(SubCategory)
# class SubCategoryAdmin(admin.ModelAdmin):
#     list_display = ("name", "category", "is_active")
#     prepopulated_fields = {"slug": ("name",)}


# from django.contrib import admin
# from .models import Category, SubCategory


# @admin.register(Category)
# class CategoryAdmin(admin.ModelAdmin):
#     list_display = (
#         "id",
#         "name",
#         "slug",
#         "icon",
#         "is_active",
#         "created_at",
#     )
#     list_filter = ("is_active",)
#     search_fields = ("name", "slug")
#     prepopulated_fields = {"slug": ("name",)}
#     ordering = ("name",)


# @admin.register(SubCategory)
# class SubCategoryAdmin(admin.ModelAdmin):
#     list_display = (
#         "id",
#         "name",
#         "category",
#         "slug",
#         "is_active",
#     )
#     list_filter = ("is_active", "category")
#     search_fields = ("name", "slug")
#     prepopulated_fields = {"slug": ("name",)}
#     ordering = ("category", "name")


from django.contrib import admin
from .models import Category, SubCategory, Product


# ============================
# CATEGORY ADMIN
# ============================
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "is_active", "created_at")
    list_filter = ("is_active",)
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("name",)


# ============================
# SUB CATEGORY ADMIN
# ============================
@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "slug", "is_active")
    list_filter = ("category", "is_active")
    search_fields = ("name", "category__name")
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("category", "name")


# ============================
# PRODUCT ADMIN
# ============================
# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = (
#         "name",
#         "category",
#         "subcategory",
#         "price",
#         "mrp",
#         "is_active",
#     )
#     list_filter = ("category", "subcategory", "is_active")
#     search_fields = ("name", "category__name", "subcategory__name")
#     prepopulated_fields = {"slug": ("name",)}
#     ordering = ("name",)


# from django.contrib import admin
# from .models import Announcement

# @admin.register(Announcement)
# class AnnouncementAdmin(admin.ModelAdmin):
#     list_display = ("description", "is_active", "created_at")
#     list_editable = ("is_active",)


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ("description", "is_active", "created_at")
    list_filter = ("is_active",)
    search_fields = ("description",)
    ordering = ("-created_at",)

    actions = ["make_active", "make_inactive"]

    def make_active(self, request, queryset):
        queryset.update(is_active=True)

    def make_inactive(self, request, queryset):
        queryset.update(is_active=False)

    make_active.short_description = "Mark selected announcements as Active"
    make_inactive.short_description = "Mark selected announcements as Inactive"


from django.contrib import admin
from .models import Banner

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ("heading", "tag", "is_active", "created_at")
    list_filter = ("is_active",)
    search_fields = ("heading", "tag")



from django.contrib import admin
from .models import Product

# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = (
#         "name",
#         "category",
#         "price",
#         "in_stock",
#         "stock_quantity",
#         "priority",
#         "is_active",
#     )

#     list_filter = ("category", "in_stock", "is_active")
#     search_fields = ("name",)
#     ordering = ("-priority",)   # ✅ HIGH PRIORITY FIRST
#     prepopulated_fields = {"slug": ("name",)}


# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = (
#         "name",
#         "category",
#         "price",
#         "mrp",
#         "in_stock",
#         "stock_quantity",
#         "priority",
#         "is_trending",     # 🔥 ADD THIS
#         "is_active",
#     )

#     list_filter = (
#         "category",
#         "subcategory",    # 🔥 ADD THIS
#         "in_stock",
#         "is_trending",    # 🔥 ADD THIS
#         "is_active",
#     )

#     search_fields = ("name",)
#     ordering = ("-priority",)
#     prepopulated_fields = {"slug": ("name",)}

#     list_editable = (
#         "priority",
#         "is_trending",    # 🔥 QUICK TOGGLE
#         "is_active",
#     )


from django.contrib import admin
from .models import Product

#working code 
# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ("name", "formatted_price", "formatted_mrp", "in_stock")
#     list_filter = ("in_stock", "is_active", "is_trending")
#     search_fields = ("name", "slug")

#     # 🔥 Change field labels in form
#     def get_form(self, request, obj=None, **kwargs):
#         form = super().get_form(request, obj, **kwargs)
#         form.base_fields["price"].label = "Price (€ EUR)"
#         form.base_fields["mrp"].label = "MRP (€ EUR)"
#         return form

#     def formatted_price(self, obj):
#         return f"€{obj.price}"
#     formatted_price.short_description = "Price (€)"

#     def formatted_mrp(self, obj):
#         return f"€{obj.mrp}"
#     formatted_mrp.short_description = "MRP (€)"
# from django.contrib import admin
# from .models import PromoCode


# @admin.register(PromoCode)
# class PromoCodeAdmin(admin.ModelAdmin):
#     list_display = (
#         "code",
#         "discount_percent",
#         "active",
#         "valid_from",
#         "valid_until",
#         "is_valid",
#     )
#     list_filter = ("active", "valid_from", "valid_until")
#     search_fields = ("code",)
#     ordering = ("-valid_until",)


from django.contrib import admin
from .models import PromoCode


@admin.register(PromoCode)
class PromoCodeAdmin(admin.ModelAdmin):
    list_display = (
        "code",
        "discount_type",
        "discount_value",
        "is_active",
        "valid_from",
        "valid_to",
        "times_used",
    )
    list_filter = ("is_active", "discount_type")
    search_fields = ("code",)

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "city", "state", "zip_code", "is_default", "updated_at")
    list_filter = ("is_default", "country", "state")
    search_fields = ("user__email", "line1", "city", "zip_code")



from django.contrib import admin
from .models import Order, OrderItem


# 🔹 OrderItem Inline (shows products inside order page)
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("product_name", "quantity", "price")
    can_delete = False


# # 🔹 Order Admin
# @admin.register(Order)
# class OrderAdmin(admin.ModelAdmin):

#     list_display = (
#         "order_id",
#         "user",
#         "payment_status",
#         "status",
#         "total_amount",
#         "created_at",
#     )

#     list_filter = (
#         "payment_status",
#         "status",
#         "created_at",
#     )

#     search_fields = (
#         "order_id",
#         "user__email",
#         "name",
#         "phone",
#     )

#     readonly_fields = (
#         "order_id",
#         "revolut_order_id",
#         "payment_status",
#         "subtotal",
#         "discount",
#         "delivery_fee",
#         "total_amount",
#         "created_at",
#     )

#     inlines = [OrderItemInline]

#     ordering = ("-created_at",)

#     fieldsets = (
#         ("Order Info", {
#             "fields": (
#                 "order_id",
#                 "user",
#                 "revolut_order_id",
#                 "payment_status",
#                 "status",
#             )
#         }),

#         ("Customer Info", {
#             "fields": (
#                 "name",
#                 "phone",
#                 "address",
#                 "city",
#                 "state",
#                 "pincode",
#             )
#         }),

#         ("Pricing", {
#             "fields": (
#                 "subtotal",
#                 "discount",
#                 "delivery_fee",
#                 "total_amount",
#             )
#         }),

#         ("Timestamps", {
#             "fields": ("created_at",)
#         }),
#     )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        "order_id",
        "user",
        "revolut_order_id",   # ✅ ADD THIS
        "payment_status",
        "status",
        "total_amount",
        "created_at",
    )

    list_filter = (
        "payment_status",
        "status",
        "created_at",
    )

    search_fields = (
        "order_id",
        "revolut_order_id",   # ✅ ADD THIS
        "user__email",
        "name",
        "phone",
    )

    readonly_fields = (
        "order_id",
        "revolut_order_id",
        "payment_status",
        "status",             # ✅ ADD THIS
        "subtotal",
        "discount",
        "delivery_fee",
        "total_amount",
        "created_at",
    )

    inlines = [OrderItemInline]

    ordering = ("-created_at",)

    fieldsets = (

        ("Order Info", {
            "fields": (
                "order_id",
                "user",
                "revolut_order_id",
                "payment_status",
                "status",
            )
        }),

        ("Customer Info", {
            "fields": (
                "name",
                "phone",
                "address",
                "city",
                "state",
                "pincode",
            )
        }),

        ("Pricing", {
            "fields": (
                "subtotal",
                "discount",
                "delivery_fee",
                "total_amount",
            )
        }),

        ("Timestamps", {
            "fields": (
                "created_at",
            )
        }),
    )



# 🔹 Optional: Register OrderItem separately (optional)
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "product_name", "quantity", "price")



from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "formatted_price",
        "formatted_mrp",
        "stock_quantity",
        "in_stock",
        "weight",
        "is_active",
    )

    list_filter = (
        "in_stock",
        "is_active",
        "is_trending",
        "category",
    )

    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("priority",)

    # 🔥 Change field labels in form
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields["price"].label = "Price (€ EUR)"
        form.base_fields["mrp"].label = "MRP (€ EUR)"
        form.base_fields["weight"].label = "Weight (KG)"
        form.base_fields["stock_quantity"].label = "Stock Quantity"
        return form

    # 💶 Format Price
    def formatted_price(self, obj):
        return f"€{obj.price}"
    formatted_price.short_description = "Price (€)"

    # 💶 Format MRP
    def formatted_mrp(self, obj):
        return f"€{obj.mrp}"
    formatted_mrp.short_description = "MRP (€)"