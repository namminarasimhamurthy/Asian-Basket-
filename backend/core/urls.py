from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView,
    LoginView,
    CategoryListAPIView,
    AnnouncementListAPIView,
    ProductListView,
    BannerListAPIView,
    ValidatePromoCodeView,
    AddressViewSet,
    update_profile,
)


router = DefaultRouter()
router.register(r"addresses", AddressViewSet, basename="addresses")

urlpatterns = [
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path("categories/", CategoryListAPIView.as_view(), name="categories"),
    path("announcement/", AnnouncementListAPIView.as_view(), name="announcement"),
    path("products/", ProductListView.as_view(), name="product-list"),
    path("banners/", BannerListAPIView.as_view(), name="banners"),
    path("promocode/",ValidatePromoCodeView.as_view(), name="PromoCode"),
    path('profile/update/', update_profile, name='update_profile'),
    path('', include(router.urls)),
]
