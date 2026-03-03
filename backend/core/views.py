from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import PromoCode

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import generics

from django.db.models import Q

from .models import Category, Announcement, Product
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    CategorySerializer,
    AnnouncementSerializer,
    ProductSerializer
)


# ===================== AUTH =====================
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=201)
        return Response(serializer.errors, status=400)


# class LoginView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = LoginSerializer(data=request.data)
#         if serializer.is_valid():
#             return Response(serializer.validated_data, status=200)
#         return Response(serializer.errors, status=400)

# views.py - Replace your LoginView with this EXACT code:
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .serializers import LoginSerializer

# views.py - Replace LoginView
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            # ✅ Extract from validated_data (has email/password)
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            # ✅ Authenticate separately
            user = authenticate(email=email, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'full_name': user.full_name,
                        'phone': user.phone or '',
                    }
                }, status=200)
        
        return Response(serializer.errors, status=400)


from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Category

class CategoryListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categories = Category.objects.filter(
            is_active=True,
            subcategories__is_active=True
        ).distinct()

        serializer = CategorySerializer(
            categories,
            many=True,
            context={"request": request}
        )
        return Response(serializer.data)



from rest_framework.generics import ListAPIView
from .models import Announcement
from .serializers import AnnouncementSerializer
from .pagination import AnnouncementPagination

class AnnouncementListAPIView(ListAPIView):
    serializer_class = AnnouncementSerializer
    queryset = Announcement.objects.filter(is_active=True)
    permission_classes = [AllowAny] 
    def get_queryset(self):
        qs = super().get_queryset()
        print("ANNOUNCEMENTS COUNT:", qs.count())
        return qs
    
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Banner
from .serializers import BannerSerializer

class BannerListAPIView(APIView):
    permission_classes = [AllowAny] 
    def get(self, request):
        banners = Banner.objects.filter(is_active=True).order_by("-created_at")
        serializer = BannerSerializer(banners, many=True, context={"request": request})
        return Response(serializer.data)




# from rest_framework import generics
# from .models import Product
# from .serializers import ProductSerializer

# class ProductListView(generics.ListAPIView):
#     serializer_class = ProductSerializer
#     permission_classes = [AllowAny] 
#     def get_queryset(self):
#         queryset = Product.objects.filter(is_active=True)

#         category = self.request.query_params.get("category")
#         subcategory = self.request.query_params.get("subcategory")
#         search = self.request.query_params.get("search")

#         if category:
#             queryset = queryset.filter(category__slug=category)

#         if subcategory:
#             queryset = queryset.filter(subcategory__slug=subcategory)

#         if search:
#             queryset = queryset.filter(name__icontains=search)

#         # ✅ PRIORITY FIRST, THEN STOCK, THEN NEW
#         return queryset.order_by(
#             "-priority",
#             "-in_stock",
#             "-created_at"
#         )
    



from rest_framework import generics
from rest_framework.permissions import AllowAny   # 🔥 REQUIRED
from .models import Product
from .serializers import ProductSerializer

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]  # 🔥 PUBLIC API

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)

        category = self.request.query_params.get("category")
        subcategory = self.request.query_params.get("subcategory")
        search = self.request.query_params.get("search")

        if category:
            queryset = queryset.filter(category__slug=category)

        if subcategory:
            queryset = queryset.filter(subcategory__slug=subcategory)

        if search:
            queryset = queryset.filter(name__icontains=search)

        return queryset.order_by(
            "-priority",
            "-in_stock",
            "-created_at"
        )

# class ValidatePromoCodeView(APIView):
#     def post(self, request):
#         code = request.data.get('code', '').upper()
        
#         if not code:
#             return Response({'error': 'No code provided'}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             promo = PromoCode.objects.get(code=code)
            
#             if not promo.active:
#                 return Response({'error': 'This promo code is inactive'}, status=status.HTTP_400_BAD_REQUEST)
                
#             if not promo.is_valid:
#                 return Response({'error': 'This promo code has expired'}, status=status.HTTP_400_BAD_REQUEST)

#             # Return success with discount amount
#             return Response({
#                 'code': promo.code,
#                 'discount': promo.discount_percent,
#                 'message': 'Promo code applied successfully'
#             })
#         except PromoCode.DoesNotExist:
#             return Response({'error': 'Invalid promo code'}, status=status.HTTP_404_NOT_FOUND)

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .models import PromoCode
# from rest_framework.permissions import AllowAny

# class ValidatePromoCodeView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         code = request.data.get('code', '').strip()

#         if not code:
#             return Response({'error': 'No code provided'}, status=400)

#         promo = PromoCode.objects.filter(code__iexact=code).first()

#         if not promo:
#             return Response({'error': 'Invalid promo code'}, status=400)

#         if not promo.active:
#             return Response({'error': 'This promo code is inactive'}, status=400)

#         if not promo.is_valid:
#             return Response({'error': 'This promo code has expired'}, status=400)

#         return Response({
#             'code': promo.code,
#             'discount': promo.discount_percent,
#             'message': 'Promo code applied successfully'
#         })

from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Address
from .serializers import AddressSerializer


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user).order_by("-is_default", "-updated_at")

    @transaction.atomic
    def perform_destroy(self, instance):
        user = instance.user
        was_default = instance.is_default
        instance.delete()

        if was_default:
            next_addr = Address.objects.filter(user=user).order_by("-updated_at").first()
            if next_addr:
                Address.objects.filter(user=user).update(is_default=False)
                Address.objects.filter(pk=next_addr.pk).update(is_default=True)

    @action(detail=True, methods=["post"])
    def set_default(self, request, pk=None):
        addr = self.get_object()
        Address.objects.filter(user=request.user).update(is_default=False)
        Address.objects.filter(pk=addr.pk).update(is_default=True)
        return Response({"detail": "Default address updated."}, status=status.HTTP_200_OK)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    data = request.data

    user.full_name = data.get('name', user.full_name) # Frontend sends 'name'
    user.phone = data.get('phone', user.phone)
    user.save()

    return Response({
        "id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "phone": user.phone
    })

# from django.http import JsonResponse
# from .models import Product

# def trending_products(request):
#     products = Product.objects.filter(
#         is_trending=True,
#         is_active=True
#     ).select_related("category", "subcategory")

#     data = []
#     for p in products:
#         data.append({
#             "id": p.id,
#             "name": p.name,
#             "slug": p.slug,
#             "category": p.category.slug,       # ✅ slug
#             "subcategory": p.subcategory.slug, # ✅ slug
#         })

#     return JsonResponse(data, safe=False)


# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response
# from .models import Product

# @api_view(["GET"])
# @permission_classes([AllowAny])
# def trending_products(request):
#     products = Product.objects.filter(
#         is_trending=True,   # 🔥 ONLY TRUE
#         is_active=True
#     ).select_related("category", "subcategory")

#     data = [
#         {
#             "id": p.id,
#             "name": p.name,
#             "slug": p.slug,
#             "category": p.category.slug,
#             "subcategory": p.subcategory.slug,
#         }
#         for p in products
#     ]

#     return Response(data)



from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

# @api_view(["GET"])
# @authentication_classes([])   # public API
# @permission_classes([AllowAny])
# def trending_products(request):
#     products = Product.objects.filter(
#         is_trending=True,
#         is_active=True
#     ).order_by("-priority", "-created_at")

#     serializer = ProductSerializer(
#         products,
#         many=True,
#         context={"request": request}
#     )
#     return Response(serializer.data)

from .serializers import ProductSerializer

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
def trending_products(request):
    products = Product.objects.filter(
        is_trending=True,
        is_active=True
    )

    serializer = ProductSerializer(
        products,
        many=True,
        context={"request": request}
    )
    return Response(serializer.data)

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Product

@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
def trending_products_simple(request):
    products = Product.objects.filter(
        is_trending=True,
        is_active=True
    ).select_related("category", "subcategory")

    data = [
        {
            "id": p.id,
            "name": p.name,
            "category_slug": p.category.slug,
            "subcategory_slug": p.subcategory.slug,
        }
        for p in products
    ]

    return Response(data)

#this section i will be changed 
@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
def trending_products_simple(request):
    products = Product.objects.filter(
        is_trending=True,
        is_active=True
    ).select_related("category", "subcategory")

    data = [
        {
            "id": p.id,
            "name": p.name,
            "category_slug": p.category.slug,
            "subcategory_slug": p.subcategory.slug,
        }
        for p in products
    ]

    return Response(data)


# @api_view(["GET"])
# @authentication_classes([])
# @permission_classes([AllowAny])
# def trending_products_simple(request):
#     products = Product.objects.filter(
#         is_trending=True,
#         is_active=True
#     )

#     data = [
#         {
#             "id": p.id,
#             "name": p.name,
#             "slug": p.slug,          # ✅ IMPORTANT
#         }
#         for p in products
#     ]

#     return Response(data)



# import requests
# from django.conf import settings
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from .models import Order


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_revolut_payment(request):

#     amount = request.data.get("amount")

#     # 1️⃣ Create local order
#     order = Order.objects.create(
#         user=request.user,
#         total_amount=amount,
#         currency="EUR"
#     )

#     headers = {
#         "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#         "Content-Type": "application/json",
#     }

#     payload = {
#         "amount": int(float(amount) * 100),  # Convert to cents
#         "currency": "EUR",
#         "capture_mode": "AUTOMATIC",
#         "redirect_url": f"{settings.FRONTEND_URL}/payment-success?order_id={order.order_id}"
#     }

#     response = requests.post(
#         f"{settings.REVOLUT_BASE_URL}/orders",
#         json=payload,
#         headers=headers
#     )

#     data = response.json()

#     if response.status_code != 201:
#         return Response(data, status=400)

#     # Save Revolut order ID
#     order.revolut_order_id = data.get("id")
#     order.save()

#     return Response({
#         "checkout_url": data.get("checkout_url"),
#         "order_id": str(order.order_id)
#     })

# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# import requests

# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def verify_revolut_payment(request):

#     order_id = request.GET.get("order_id")

#     if not order_id:
#         return Response({"error": "Order ID missing"}, status=400)

#     try:
#         order = Order.objects.get(order_id=order_id, user=request.user)
#     except Order.DoesNotExist:
#         return Response({"error": "Order not found"}, status=404)

#     headers = {
#         "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#     }

#     response = requests.get(
#         f"{settings.REVOLUT_BASE_URL}/orders/{order.revolut_order_id}",
#         headers=headers
#     )

#     data = response.json()

#     # 🔥 IMPORTANT PART
#     if data.get("state") == "COMPLETED":
#         order.status = "PAID"
#         order.save()
#     elif data.get("state") == "FAILED":
#         order.status = "FAILED"
#         order.save()

#     return Response({
#         "order_id": str(order.order_id),
#         "status": order.status,
#         "amount": order.total_amount,
#     })


# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from django.views.decorators.csrf import csrf_exempt
# import json

# @csrf_exempt
# @api_view(["POST"])
# def revolut_webhook(request):

#     payload = json.loads(request.body)
#     revolut_id = payload.get("id")
#     state = payload.get("state")

#     try:
#         order = Order.objects.get(revolut_order_id=revolut_id)
#     except Order.DoesNotExist:
#         return Response(status=200)

#     if state == "COMPLETED":
#         order.status = "PAID"
#     elif state == "FAILED":
#         order.status = "FAILED"

#     order.save()

#     return Response(status=200)



# core/views.py

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db import transaction

from .models import PromoCode
from .serializers import PromoCodeSerializer, ApplyPromoCodeSerializer


# CRUD ViewSet (optional)
class PromoCodeViewSet(viewsets.ModelViewSet):
    queryset = PromoCode.objects.all()
    serializer_class = PromoCodeSerializer
    filterset_fields = ["code", "discount_type", "is_active"]
    search_fields = ["code", "description"]


# Apply Promo Code API
class ApplyPromoCodeView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ApplyPromoCodeSerializer(data=request.data)

        if serializer.is_valid():
            promo = serializer.validated_data["promo"]
            discount_amount = serializer.validated_data["discount_amount"]
            cart_total = serializer.validated_data["cart_total"]

            new_total = cart_total - discount_amount

            return Response({
                "code": promo.code,
                "discount_type": promo.discount_type,
                "discount_value": promo.discount_value,
                "discount_amount": discount_amount,
                "new_total": new_total
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    





# import requests
# from django.conf import settings
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from .models import Order

# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_revolut_payment(request):

#     amount = request.data.get("amount")

#     if not amount:
#         return Response({"error": "Amount required"}, status=400)

#     # 1️⃣ Create local order
#     order = Order.objects.create(
#         user=request.user,
#         total_amount=amount,
#         currency="EUR"
#     )

#     headers = {
#         "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#         "Content-Type": "application/json",
#     }

#     payload = {
#         "amount": int(float(amount) * 100),  # convert to cents
#         "currency": "EUR",
#         "capture_mode": "AUTOMATIC",
#         "merchant_order_ext_ref": str(order.order_id),
#         "redirect_url": f"{settings.FRONTEND_URL}/payment-success?order_id={order.order_id}"
#     }

#     response = requests.post(
#         f"{settings.REVOLUT_BASE_URL}/orders",
#         json=payload,
#         headers=headers
#     )

#     data = response.json()

#     if response.status_code != 201:
#         return Response(data, status=400)

#     order.revolut_order_id = data.get("id")
#     order.save()

#     return Response({
#         "checkout_url": data.get("checkout_url"),
#         "order_id": str(order.order_id)
#     })


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def verify_revolut_payment(request):

#     order_id = request.GET.get("order_id")

#     try:
#         order = Order.objects.get(order_id=order_id, user=request.user)
#     except Order.DoesNotExist:
#         return Response({"error": "Order not found"}, status=404)

#     headers = {
#         "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#     }

#     response = requests.get(
#         f"{settings.REVOLUT_BASE_URL}/orders/{order.revolut_order_id}",
#         headers=headers
#     )

#     data = response.json()

#     if data.get("state") == "COMPLETED":
#         order.status = "PAID"
#     elif data.get("state") == "FAILED":
#         order.status = "FAILED"

#     order.save()

#     return Response({
#         "order_id": str(order.order_id),
#         "status": order.status,
#         "amount": order.total_amount
#     })



# import requests
# from django.conf import settings
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from .models import Order


# # ==========================================
# # CREATE REVOLUT PAYMENT
# # ==========================================
# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_revolut_payment(request):

#     amount = request.data.get("amount")

#     if not amount:
#         return Response({"error": "Amount required"}, status=400)

#     try:
#         amount = float(amount)
#         if amount <= 0:
#             return Response({"error": "Invalid amount"}, status=400)
#     except ValueError:
#         return Response({"error": "Amount must be number"}, status=400)

#     # 1️⃣ Create Local Order
#     order = Order.objects.create(
#         user=request.user,
#         total_amount=amount,
#         currency="EUR",
#         status="PENDING"
#     )

#     headers = {
#         "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#         "Content-Type": "application/json",
#     }

#     # ✅ CORRECT REVOLUT PAYLOAD STRUCTURE
#     payload = {
#         "amount": int(amount * 100),  # convert to cents
#         "currency": "EUR",
#         "capture_mode": "AUTOMATIC",
#         "merchant_order_ext_ref": str(order.order_id),
#         "checkout": {
#             "redirect_url": f"{settings.FRONTEND_URL}/payment-success?order_id={order.order_id}"
#         }
#     }

#     response = requests.post(
#         f"{settings.REVOLUT_BASE_URL}/orders",
#         json=payload,
#         headers=headers
#     )

#     try:
#         data = response.json()
#     except Exception:
#         return Response({"error": "Invalid response from Revolut"}, status=500)

#     # 🔥 Debug if failed
#     if response.status_code != 201:
#         print("REVOLUT ERROR:", data)
#         return Response({"error": data}, status=400)

#     # Save Revolut order ID
#     order.revolut_order_id = data.get("id")
#     order.save()

#     return Response({
#         "checkout_url": data.get("checkout_url"),
#         "order_id": str(order.order_id)
#     })


# # ==========================================
# # VERIFY REVOLUT PAYMENT
# # ==========================================
# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def verify_revolut_payment(request):

#     order_id = request.GET.get("order_id")

#     if not order_id:
#         return Response({"error": "Order ID required"}, status=400)

#     try:
#         order = Order.objects.get(order_id=order_id, user=request.user)
#     except Order.DoesNotExist:
#         return Response({"error": "Order not found"}, status=404)

#     if not order.revolut_order_id:
#         return Response({"error": "Invalid Revolut order"}, status=400)

#     headers = {
#         "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#     }

#     response = requests.get(
#         f"{settings.REVOLUT_BASE_URL}/orders/{order.revolut_order_id}",
#         headers=headers
#     )

#     try:
#         data = response.json()
#     except Exception:
#         return Response({"error": "Invalid response from Revolut"}, status=500)

#     state = data.get("state")

#     if state == "COMPLETED":
#         order.status = "PAID"
#     elif state == "FAILED":
#         order.status = "FAILED"
#     else:
#         order.status = "PENDING"

#     order.save()

#     return Response({
#         "order_id": str(order.order_id),
#         "status": order.status,
#         "amount": order.total_amount
#     })


# import requests
# from django.conf import settings
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from .models import Order


# # ==================================================
# # CREATE REVOLUT PAYMENT
# # ==================================================
# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_revolut_payment(request):

#     amount = request.data.get("amount")

#     if not amount:
#         return Response({"error": "Amount required"}, status=400)

#     try:
#         amount = float(amount)
#         if amount <= 0:
#             return Response({"error": "Invalid amount"}, status=400)
#     except ValueError:
#         return Response({"error": "Amount must be number"}, status=400)

#     # 1️⃣ Create Local Order
#     order = Order.objects.create(
#         user=request.user,
#         total_amount=amount,
#         currency="EUR",
#         status="PENDING"
#     )

#     headers = {
#         "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#         "Content-Type": "application/json",
#     }

#     payload = {
#         "amount": int(amount * 100),  # convert to cents
#         "currency": "EUR",
#         "capture_mode": "AUTOMATIC",
#         "merchant_order_ext_ref": str(order.order_id),
#         "checkout": {
#             "redirect_url": f"{settings.FRONTEND_URL}/payment-success?order_id={order.order_id}"
#         }
#     }

#     try:
#         response = requests.post(
#             f"{settings.REVOLUT_BASE_URL}/orders",
#             json=payload,
#             headers=headers
#         )

#         data = response.json()

#     except Exception as e:
#         return Response({"error": str(e)}, status=500)

#     if response.status_code != 201:
#         print("REVOLUT ERROR STATUS:", response.status_code)
#         print("REVOLUT ERROR BODY:", data)

#         return Response({
#             "error": data.get("message") or data.get("code") or str(data)
#         }, status=400)

#     order.revolut_order_id = data.get("id")
#     order.save()

#     return Response({
#         "checkout_url": data.get("checkout_url"),
#         "order_id": str(order.order_id)
#     })


# # ==================================================
# # VERIFY REVOLUT PAYMENT
# # ==================================================
# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def verify_revolut_payment(request):

#     order_id = request.GET.get("order_id")

#     if not order_id:
#         return Response({"error": "Order ID required"}, status=400)

#     try:
#         order = Order.objects.get(order_id=order_id, user=request.user)
#     except Order.DoesNotExist:
#         return Response({"error": "Order not found"}, status=404)

#     if not order.revolut_order_id:
#         return Response({"error": "Invalid Revolut order"}, status=400)

#     headers = {
#         "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#     }

#     try:
#         response = requests.get(
#             f"{settings.REVOLUT_BASE_URL}/orders/{order.revolut_order_id}",
#             headers=headers
#         )

#         data = response.json()

#     except Exception as e:
#         return Response({"error": str(e)}, status=500)

#     state = data.get("state")

#     if state == "COMPLETED":
#         order.status = "PAID"
#     elif state == "FAILED":
#         order.status = "FAILED"
#     else:
#         order.status = "PENDING"

#     order.save()

#     return Response({
#         "order_id": str(order.order_id),
#         "status": order.status,
#         "amount": order.total_amount
#     })


# import requests
# from django.conf import settings
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from .models import Order


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_revolut_payment(request):

#     amount = request.data.get("amount")

#     if not amount:
#         return Response({"error": "Amount required"}, status=400)

#     try:
#         amount = float(amount)
#         if amount <= 0:
#             return Response({"error": "Invalid amount"}, status=400)
#     except ValueError:
#         return Response({"error": "Amount must be number"}, status=400)

#     # Create local order
#     order = Order.objects.create(
#         user=request.user,
#         total_amount=amount,
#         currency="EUR",
#         status="PENDING"
#     )

#     headers = {
#         "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#         "Content-Type": "application/json",
#         "Accept": "application/json",
#         "Revolut-Api-Version": "2023-09-01",  # 🔥 REQUIRED
#     }

#     payload = {
#         "amount": int(amount * 100),
#         "currency": "EUR",
#         "capture_mode": "automatic"
#     }

#     response = requests.post(
#         "https://merchant.revolut.com/api/orders",
#         json=payload,
#         headers=headers
#     )

#     data = response.json()

#     if response.status_code != 201:
#         print("REVOLUT ERROR STATUS:", response.status_code)
#         print("REVOLUT ERROR BODY:", data)
#         return Response({"error": data}, status=400)

#     order.revolut_order_id = data.get("id")
#     order.save()

#     return Response({
#         "checkout_url": data.get("checkout_url"),
#         "order_id": str(order.order_id)
#     })



import requests
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Order


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_revolut_payment(request):

    amount = request.data.get("amount")
    currency = request.data.get("currency")

    if not amount:
        return Response({"error": "Amount required"}, status=400)

    if not currency:
        return Response({"error": "Currency required"}, status=400)

    try:
        amount = float(amount)
        if amount <= 0:
            return Response({"error": "Invalid amount"}, status=400)
    except ValueError:
        return Response({"error": "Amount must be number"}, status=400)

    currency = currency.upper()

    # Create local order
    order = Order.objects.create(
        user=request.user,
        total_amount=amount,
        currency=currency,
        status="PENDING"
    )

    headers = {
        "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Revolut-Api-Version": "2023-09-01",
    }

    payload = {
        "amount": int(amount * 100),
        "currency": currency,
        "capture_mode": "automatic"
    }

    response = requests.post(
        "https://merchant.revolut.com/api/orders",
        json=payload,
        headers=headers
    )

    data = response.json()

    if response.status_code != 201:
        print("REVOLUT ERROR STATUS:", response.status_code)
        print("REVOLUT ERROR BODY:", data)
        return Response({"error": data}, status=400)

    order.revolut_order_id = data.get("id")
    order.save()

    return Response({
        "checkout_url": data.get("checkout_url"),
        "order_id": str(order.order_id)
    })


import requests
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Order, OrderItem


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_revolut_payment(request):

#     data = request.data

#     # 1️⃣ Create Local Order FIRST
#     order = Order.objects.create(
#         user=request.user,
#         name=data.get("name"),
#         phone=data.get("phone"),
#         address=data.get("address"),
#         city=data.get("city"),
#         state=data.get("state"),
#         pincode=data.get("pincode"),
#         subtotal=data.get("subtotal"),
#         discount=data.get("discount", 0),
#         delivery_fee=data.get("delivery_fee", 0),
#         total_amount=data.get("total_amount"),
#     )

#     # 2️⃣ Save Order Items
#     for item in data.get("items", []):
#         OrderItem.objects.create(
#             order=order,
#             product_name=item["name"],
#             quantity=item["quantity"],
#             price=item["price"],
#         )

#     # 3️⃣ Create Revolut Order
#     headers = {
#         "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#         "Content-Type": "application/json",
#         "Revolut-Api-Version": "2023-09-01",
#     }

#     payload = {
#         "amount": int(float(order.total_amount) * 100),
#         "currency": "EUR",
#         "capture_mode": "automatic",
#     }

#     response = requests.post(
#         "https://merchant.revolut.com/api/orders",
#         json=payload,
#         headers=headers
#     )

#     if response.status_code != 201:
#         order.payment_status = "FAILED"
#         order.save()
#         return Response({"error": "Payment creation failed"}, status=400)

#     revolut_data = response.json()

#     order.revolut_order_id = revolut_data.get("id")
#     order.save()

#     return Response({
#         "checkout_url": revolut_data.get("checkout_url"),
#         "order_id": order.order_id
#     })


import requests
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Order, OrderItem


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_revolut_payment(request):

#     data = request.data

#     # ✅ REQUIRED FIELD VALIDATION
#     required_fields = [
#         "name",
#         "phone",
#         "address",
#         "city",
#         "state",
#         "pincode",
#         "subtotal",
#         "delivery_fee",
#         "total_amount",
#         "items"
#     ]

#     for field in required_fields:
#         if not data.get(field):
#             return Response(
#                 {"error": f"{field} is required"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#     try:
#         # ✅ CREATE LOCAL ORDER
#         order = Order.objects.create(
#             user=request.user,
#             name=data.get("name"),
#             phone=data.get("phone"),
#             address=data.get("address"),
#             city=data.get("city"),
#             state=data.get("state"),
#             pincode=data.get("pincode"),
#             subtotal=data.get("subtotal"),
#             discount=data.get("discount", 0),
#             delivery_fee=data.get("delivery_fee", 0),
#             total_amount=data.get("total_amount"),
#             status="PENDING",
#             payment_status="PENDING"
#         )

#         # ✅ SAVE ORDER ITEMS
#         for item in data.get("items", []):
#             OrderItem.objects.create(
#                 order=order,
#                 product_name=item["name"],
#                 quantity=item["quantity"],
#                 price=item["price"],
#             )

#         # ✅ REVOLUT API CALL
#         headers = {
#             "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#             "Content-Type": "application/json",
#             "Revolut-Api-Version": "2023-09-01",
#         }

#         payload = {
#             "amount": int(float(order.total_amount) * 100),
#             "currency": "EUR",
#             "capture_mode": "automatic",
#         }

#         response = requests.post(
#             "https://merchant.revolut.com/api/orders",
#             json=payload,
#             headers=headers
#         )

#         revolut_data = response.json()

#         # ❌ HANDLE FAILURE
#         if response.status_code != 201:

#             order.payment_status = "FAILED"
#             order.status = "FAILED"
#             order.save()

#             return Response(
#                 {"error": revolut_data},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # ✅ SAVE REVOLUT ID
#         order.revolut_order_id = revolut_data.get("id")
#         order.save()

#         return Response({
#             "checkout_url": revolut_data.get("checkout_url"),
#             "order_id": order.order_id
#         })

#     except Exception as e:

#         return Response(
#             {"error": str(e)},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )

#working code
# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_revolut_payment(request):

#     data = request.data

#     print("CHECKOUT DATA RECEIVED:", data)

#     required_fields = [
#         "name",
#         "phone",
#         "address",
#         "city",
#         "state",
#         "pincode",
#         "subtotal",
#         "delivery_fee",
#         "total_amount",
#         "items"
#     ]

#     for field in required_fields:

#         if field not in data:
#             return Response(
#                 {"error": f"{field} is required"},
#                 status=400
#             )

#         if data[field] is None:
#             return Response(
#                 {"error": f"{field} cannot be null"},
#                 status=400
#             )

#     try:

#         order = Order.objects.create(
#             user=request.user,
#             name=data["name"],
#             phone=data["phone"],
#             address=data["address"],
#             city=data["city"],
#             state=data["state"],
#             pincode=data["pincode"],
#             subtotal=data["subtotal"],
#             discount=data.get("discount", 0),
#             delivery_fee=data["delivery_fee"],
#             total_amount=data["total_amount"],
#             status="PENDING",
#             payment_status="PENDING"
#         )

#         for item in data["items"]:

#             OrderItem.objects.create(
#                 order=order,
#                 product_name=item["name"],
#                 quantity=item["quantity"],
#                 price=item["price"],
#             )

#         headers = {
#             "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#             "Content-Type": "application/json",
#             "Revolut-Api-Version": "2023-09-01",
#         }

#         payload = {
#             "amount": int(float(order.total_amount) * 100),
#             "currency": "EUR",
#             "capture_mode": "automatic",
#         }

#         response = requests.post(
#             "https://merchant.revolut.com/api/orders",
#             json=payload,
#             headers=headers
#         )

#         revolut_data = response.json()

#         if response.status_code != 201:

#             order.payment_status = "FAILED"
#             order.status = "FAILED"
#             order.save()

#             return Response(
#                 {"error": revolut_data},
#                 status=400
#             )

#         order.revolut_order_id = revolut_data["id"]
#         order.save()

#         return Response({
#             "checkout_url": revolut_data["checkout_url"],
#             "order_id": order.order_id
#         })

#     except Exception as e:

#         print("PAYMENT ERROR:", str(e))

#         return Response(
#             {"error": str(e)},
#             status=500
#         )
    

# working code

# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_revolut_payment(request):

#     data = request.data

#     print("CHECKOUT DATA RECEIVED:", data)

#     required_fields = [
#         "name",
#         "phone",
#         "address",
#         "city",
#         "state",
#         "pincode",
#         "subtotal",
#         "delivery_fee",
#         "total_amount",
#         "items",
#         "currency"
#     ]

#     for field in required_fields:
#         if field not in data or data[field] is None:
#             return Response({"error": f"{field} is required"}, status=400)

#     try:

#         # 1️⃣ CREATE ORDER
#         order = Order.objects.create(
#             user=request.user,
#             name=data["name"],
#             phone=data["phone"],
#             address=data["address"],
#             city=data["city"],
#             state=data["state"],
#             pincode=data["pincode"],
#             subtotal=data["subtotal"],
#             discount=data.get("discount", 0),
#             delivery_fee=data["delivery_fee"],
#             total_amount=data["total_amount"],
#             currency=data["currency"],
#             status="PENDING",
#             payment_status="PENDING"
#         )

#         # 2️⃣ SAVE ITEMS
#         for item in data["items"]:
#             OrderItem.objects.create(
#                 order=order,
#                 product_name=item["name"],
#                 quantity=item["quantity"],
#                 price=item["price"],
#             )

#         # 3️⃣ REVOLUT HEADERS
#         headers = {
#             "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#             "Content-Type": "application/json",
#             "Accept": "application/json",
#             "Revolut-Api-Version": "2023-09-01",
#         }

#         # ✅ FULL REDIRECT CONFIGURATION
#         payload = {
#             "amount": int(float(order.total_amount) * 100),
#             "currency": data["currency"],
#             "capture_mode": "automatic",

#             "checkout": {

#                 # SUCCESS redirect
#                 "redirect_url":
#                 f"{settings.FRONTEND_URL}/payment-success?order_id={order.order_id}",

#                 # REQUIRED
#                 "return_url":
#                 f"{settings.FRONTEND_URL}/payment-success?order_id={order.order_id}",

#                 # REQUIRED
#                 "cancel_url":
#                 f"{settings.FRONTEND_URL}/checkout"
#             }
#         }

#         response = requests.post(
#             "https://merchant.revolut.com/api/orders",
#             json=payload,
#             headers=headers
#         )

#         revolut_data = response.json()

#         print("REVOLUT RESPONSE:", revolut_data)

#         if response.status_code != 201:

#             order.payment_status = "FAILED"
#             order.status = "FAILED"
#             order.save()

#             return Response({"error": revolut_data}, status=400)

#         # 4️⃣ SAVE REVOLUT ID
#         order.revolut_order_id = revolut_data["id"]
#         order.save()

#         # 5️⃣ RETURN CHECKOUT URL
#         return Response({
#             "checkout_url": revolut_data["checkout_url"],
#             "order_id": order.order_id
#         })

#     except Exception as e:

#         print("PAYMENT ERROR:", str(e))

#         return Response({"error": str(e)}, status=500)
# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def verify_revolut_payment(request):

#     order_id = request.data.get("order_id")

#     try:
#         order = Order.objects.get(order_id=order_id, user=request.user)
#     except Order.DoesNotExist:
#         return Response({"error": "Order not found"}, status=404)

#     headers = {
#         "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#         "Revolut-Api-Version": "2023-09-01",
#     }

#     response = requests.get(
#         f"https://merchant.revolut.com/api/orders/{order.revolut_order_id}",
#         headers=headers
#     )

#     data = response.json()

#     if data.get("state") == "completed":
#         order.payment_status = "PAID"
#         order.status = "PROCESSED"
#     else:
#         order.payment_status = "FAILED"

#     order.save()

#     return Response({"payment_status": order.payment_status})

# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_revolut_payment(request):

#     data = request.data

#     required_fields = [
#         "name",
#         "phone",
#         "address",
#         "city",
#         "state",
#         "pincode",
#         "subtotal",
#         "delivery_fee",
#         "total_amount",
#         "items"
#     ]

#     for field in required_fields:
#         if field not in data or data[field] is None:
#             return Response({"error": f"{field} is required"}, status=400)

#     try:

#         # CREATE ORDER
#         order = Order.objects.create(
#             user=request.user,
#             name=data["name"],
#             phone=data["phone"],
#             address=data["address"],
#             city=data["city"],
#             state=data["state"],
#             pincode=data["pincode"],
#             subtotal=data["subtotal"],
#             discount=data.get("discount", 0),
#             delivery_fee=data["delivery_fee"],
#             total_amount=data["total_amount"],
#             status="PENDING",
#             payment_status="PENDING"
#         )

#         # SAVE ITEMS
#         for item in data["items"]:
#             OrderItem.objects.create(
#                 order=order,
#                 product_name=item["name"],
#                 quantity=item["quantity"],
#                 price=item["price"],
#             )

#         headers = {
#             "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#             "Content-Type": "application/json",
#             "Revolut-Api-Version": "2023-09-01",
#         }

#         # ✅ CORRECT PAYLOAD
#         payload = {
#             "amount": int(float(order.total_amount) * 100),
#             "currency": "EUR",
#             "capture_mode": "AUTOMATIC",
#             "checkout": {
#                 "redirect_url": f"{settings.FRONTEND_URL}/payment-success?order_id={order.order_id}"
#             }
#         }

#         # ✅ CORRECT ENDPOINT
#         response = requests.post(
#             "https://merchant.revolut.com/api/1.0/orders",
#             json=payload,
#             headers=headers
#         )

#         revolut_data = response.json()

#         print("REVOLUT RESPONSE:", revolut_data)

#         if response.status_code != 201:
#             order.payment_status = "FAILED"
#             order.status = "FAILED"
#             order.save()
#             return Response({"error": revolut_data}, status=400)

#         order.revolut_order_id = revolut_data["id"]
#         order.save()

#         return Response({
#             "checkout_url": revolut_data["checkout_url"],
#             "order_id": order.order_id
#         })

#     except Exception as e:
#         print("REVOLUT ERROR:", str(e))
#         return Response({"error": str(e)}, status=500)




# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# import requests
# from django.conf import settings
# from .models import Order, OrderItem


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_revolut_payment(request):

#     data = request.data

#     print("CHECKOUT REQUEST DATA:", data)

#     required_fields = [
#         "name",
#         "phone",
#         "address",
#         "city",
#         "state",
#         "pincode",
#         "subtotal",
#         "delivery_fee",
#         "total_amount",
#         "items"
#     ]

#     for field in required_fields:
#         if field not in data or data[field] is None:
#             return Response(
#                 {"error": f"{field} is required"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#     try:

#         # ✅ CREATE LOCAL ORDER
#         order = Order.objects.create(
#             user=request.user,
#             name=data["name"],
#             phone=data["phone"],
#             address=data["address"],
#             city=data["city"],
#             state=data["state"],
#             pincode=data["pincode"],
#             subtotal=data["subtotal"],
#             discount=data.get("discount", 0),
#             delivery_fee=data["delivery_fee"],
#             total_amount=data["total_amount"],
#             status="PENDING",
#             payment_status="PENDING"
#         )

#         # ✅ SAVE ITEMS
#         for item in data["items"]:
#             OrderItem.objects.create(
#                 order=order,
#                 product_name=item["name"],
#                 quantity=item["quantity"],
#                 price=item["price"],
#             )

#         # ✅ REVOLUT HEADERS
#         headers = {
#             "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#             "Content-Type": "application/json",
#             "Accept": "application/json",
#             "Revolut-Api-Version": "2023-09-01",
#         }

#         # ✅ REVOLUT PAYLOAD (CORRECT FORMAT)
#         payload = {
#             "amount": int(float(order.total_amount) * 100),
#             "currency": "EUR",
#             "capture_mode": "automatic",
#             "merchant_order_ext_ref": str(order.order_id),
#             "checkout": {
#                 "redirect_url":
#                 f"{settings.FRONTEND_URL}/payment-success?order_id={order.order_id}"
#             }
#         }

#         print("REVOLUT PAYLOAD:", payload)

#         # ✅ CORRECT ENDPOINT
#         response = requests.post(
#             "https://merchant.revolut.com/api/orders",
#             json=payload,
#             headers=headers
#         )

#         revolut_data = response.json()

#         print("REVOLUT RESPONSE STATUS:", response.status_code)
#         print("REVOLUT RESPONSE DATA:", revolut_data)

#         if response.status_code != 201:

#             order.payment_status = "FAILED"
#             order.status = "FAILED"
#             order.save()

#             return Response(
#                 {"error": revolut_data},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # ✅ SAVE REVOLUT ORDER ID
#         order.revolut_order_id = revolut_data["id"]
#         order.save()

#         # ✅ RETURN CHECKOUT URL
#         return Response({
#             "checkout_url": revolut_data["checkout_url"],
#             "order_id": str(order.order_id)
#         })

#     except Exception as e:

#         print("REVOLUT ERROR:", str(e))

#         return Response(
#             {"error": str(e)},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )



from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import requests
from django.conf import settings
from .models import Order, OrderItem


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_revolut_payment(request):

    data = request.data

    print("CHECKOUT REQUEST DATA:", data)

    required_fields = [
        "name",
        "phone",
        "address",
        "city",
        "state",
        "pincode",
        "subtotal",
        "delivery_fee",
        "total_amount",
        "items"
    ]

    # ✅ Validate fields
    for field in required_fields:
        if field not in data or data[field] is None:
            return Response(
                {"error": f"{field} is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

    try:

        # ✅ STEP 1: Create local order
        order = Order.objects.create(
            user=request.user,
            name=data["name"],
            phone=data["phone"],
            address=data["address"],
            city=data["city"],
            state=data["state"],
            pincode=data["pincode"],
            subtotal=data["subtotal"],
            discount=data.get("discount", 0),
            delivery_fee=data["delivery_fee"],
            total_amount=data["total_amount"],
            status="PENDING",
            payment_status="CREATED"
        )

        print("LOCAL ORDER CREATED:", order.order_id)

        # ✅ STEP 2: Save order items
        for item in data["items"]:
            OrderItem.objects.create(
                order=order,
                product_name=item["name"],
                quantity=item["quantity"],
                price=item["price"],
            )

        # ✅ STEP 3: Revolut headers
        headers = {
            "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Revolut-Api-Version": "2023-09-01",
        }

        # ✅ STEP 4: CORRECT hosted checkout payload
        payload = {
            "amount": int(float(order.total_amount) * 100),  # cents
            "currency": "EUR",
            "capture_mode": "automatic",

            # important reference
            "merchant_order_ext_ref": str(order.order_id),

            # ✅ THIS IS THE FIX
            "hosted_checkout": {
                "return_url": f"{settings.FRONTEND_URL}/payment-success?order_id={order.order_id}",
                "cancel_url": f"{settings.FRONTEND_URL}/checkout"
            }
        }

        print("REVOLUT PAYLOAD:", payload)

        # ✅ STEP 5: Create Revolut order
        response = requests.post(
            "https://merchant.revolut.com/api/orders",
            json=payload,
            headers=headers
        )

        revolut_data = response.json()

        print("REVOLUT STATUS:", response.status_code)
        print("REVOLUT DATA:", revolut_data)

        if response.status_code != 201:

            order.payment_status = "FAILED"
            order.status = "CANCELLED"
            order.save()

            return Response(
                {"error": revolut_data},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ✅ STEP 6: Save revolut order id
        order.revolut_order_id = revolut_data.get("id")
        order.save()

        print("REVOLUT ORDER CREATED:", order.revolut_order_id)

        # ✅ STEP 7: Return checkout url
        return Response({
            "checkout_url": revolut_data.get("checkout_url"),
            "order_id": str(order.order_id)
        })

    except Exception as e:

        print("REVOLUT ERROR:", str(e))

        order.payment_status = "FAILED"
        order.status = "CANCELLED"
        order.save()

        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )



# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def verify_revolut_payment(request):

#     order_id = request.data.get("order_id")

#     try:
#         order = Order.objects.get(order_id=order_id, user=request.user)
#     except Order.DoesNotExist:
#         return Response({"error": "Order not found"}, status=404)

#     headers = {
#         "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#         "Revolut-Api-Version": "2023-09-01",
#     }

#     response = requests.get(
#         f"https://merchant.revolut.com/api/orders/{order.revolut_order_id}",
#         headers=headers
#     )

#     data = response.json()

#     state = data.get("state")

#     if state == "COMPLETED":

#         order.payment_status = "PAID"
#         order.status = "PROCESSED"

#     elif state == "FAILED":

#         order.payment_status = "FAILED"
#         order.status = "FAILED"

#     else:

#         order.payment_status = "PENDING"
#         order.status = "PENDING"

#     order.save()

#     return Response({
#         "payment_status": order.payment_status,
#         "order_status": order.status
#     })


# import time

# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def verify_revolut_payment(request):

#     order_id = request.data.get("order_id")

#     try:
#         order = Order.objects.get(order_id=order_id, user=request.user)
#     except Order.DoesNotExist:
#         return Response({"error": "Order not found"}, status=404)

#     headers = {
#         "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
#         "Revolut-Api-Version": "2023-09-01",
#     }

#     # ✅ Retry up to 5 times
#     for i in range(5):

#         response = requests.get(
#             f"https://merchant.revolut.com/api/orders/{order.revolut_order_id}",
#             headers=headers
#         )

#         data = response.json()
#         state = data.get("state")

#         print("Revolut state:", state)

#         if state == "COMPLETED":

#             order.payment_status = "PAID"
#             order.status = "PROCESSED"
#             order.save()

#             return Response({
#                 "payment_status": "PAID",
#                 "order_status": "PROCESSED"
#             })

#         elif state == "FAILED":

#             order.payment_status = "FAILED"
#             order.status = "FAILED"
#             order.save()

#             return Response({
#                 "payment_status": "FAILED",
#                 "order_status": "FAILED"
#             })

#         time.sleep(2)  # wait 2 seconds

#     # If still pending
#     order.payment_status = "PENDING"
#     order.save()

#     return Response({
#         "payment_status": "PENDING",
#         "order_status": order.status
#     })


# import time

# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def verify_revolut_payment(request):

#     order_id = request.data.get("order_id")

#     try:
#         order = Order.objects.get(
#             order_id=order_id,
#             user=request.user
#         )
#     except Order.DoesNotExist:
#         return Response(
#             {"error": "Order not found"},
#             status=404
#         )

#     headers = {
#         "Authorization":
#         f"Bearer {settings.REVOLUT_SECRET_KEY}",
#         "Revolut-Api-Version": "2023-09-01",
#     }

#     for i in range(5):

#         response = requests.get(
#             f"https://merchant.revolut.com/api/orders/{order.revolut_order_id}",
#             headers=headers
#         )

#         data = response.json()

#         state = data.get("state")

#         print("Revolut state:", state)

#         # Save raw state
#         order.revolut_status = state

#         if state == "COMPLETED":

#             order.payment_status = "PAID"
#             order.status = "PROCESSED"

#             order.save()

#             return Response({
#                 "payment_status": "PAID",
#                 "order_status": "PROCESSED"
#             })

#         elif state == "FAILED":

#             order.payment_status = "FAILED"
#             order.status = "FAILED"

#             order.save()

#             return Response({
#                 "payment_status": "FAILED",
#                 "order_status": "FAILED"
#             })

#         time.sleep(2)

#     order.payment_status = "PENDING"
#     order.save()

#     return Response({
#         "payment_status": "PENDING",
#         "order_status": order.status
#     })


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def verify_revolut_payment(request):

    order_id = request.data.get("order_id")

    try:
        order = Order.objects.get(order_id=order_id, user=request.user)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)

    headers = {
        "Authorization": f"Bearer {settings.REVOLUT_SECRET_KEY}",
        "Revolut-Api-Version": "2023-09-01",
    }

    response = requests.get(
        f"https://merchant.revolut.com/api/orders/{order.revolut_order_id}",
        headers=headers
    )

    data = response.json()

    state = data.get("state")

    print("REVOLUT STATE:", state)

    if state == "COMPLETED":

        order.payment_status = "PAID"
        order.status = "PROCESSED"

    elif state == "FAILED":

        order.payment_status = "FAILED"
        order.status = "CANCELLED"

    else:

        order.payment_status = "PENDING"
        order.status = "PENDING"

    order.save()

    return Response({
        "payment_status": order.payment_status,
        "order_status": order.status
    })