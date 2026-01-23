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




from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny] 
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

        # ✅ PRIORITY FIRST, THEN STOCK, THEN NEW
        return queryset.order_by(
            "-priority",
            "-in_stock",
            "-created_at"
        )
    

class ValidatePromoCodeView(APIView):
    def post(self, request):
        code = request.data.get('code', '').upper()
        
        if not code:
            return Response({'error': 'No code provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            promo = PromoCode.objects.get(code=code)
            
            if not promo.active:
                return Response({'error': 'This promo code is inactive'}, status=status.HTTP_400_BAD_REQUEST)
                
            if not promo.is_valid:
                return Response({'error': 'This promo code has expired'}, status=status.HTTP_400_BAD_REQUEST)

            # Return success with discount amount
            return Response({
                'code': promo.code,
                'discount': promo.discount_percent,
                'message': 'Promo code applied successfully'
            })
        except PromoCode.DoesNotExist:
            return Response({'error': 'Invalid promo code'}, status=status.HTTP_404_NOT_FOUND)
        

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