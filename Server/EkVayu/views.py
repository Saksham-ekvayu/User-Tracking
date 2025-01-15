from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.paginator import Paginator
from .models import Details, TotalVisits, BaseOffers
from .serializers import DetailsSerializer,BaseOffersSerializer



@api_view(['POST'])
def create_details(request):
    if request.method == 'POST':
        if 'user_tracking_info' not in request.data or 'uniqueId' not in request.data['user_tracking_info']:
            return Response(
                {"error": "uniqueId is required in user_tracking_info"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = DetailsSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Update total visits counter
            total_visits, created = TotalVisits.objects.get_or_create(id=1)
            total_visits.total_ekvayu_visit_count += 1
            total_visits.save()
            
            response_data = {
                "totalEkvayuVisitCount": total_visits.total_ekvayu_visit_count,
                "users": [{
                    "username": user.username,
                    "email": user.email,
                    "phone": user.phone,
                    "uniqueId": user.uniqueId,
                    "visitedRoutes": user.visited_routes,
                    "ekvayuVisitCount": user.ekvayu_visit_count,
                    "os": user.os,
                    "timezone": user.timezone,
                    "visitTimestamp": user.visit_timestamp
                }]
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_details(request):
    details = Details.objects.all()
    serializer = DetailsSerializer(details, many=True)
    
    total_visits = TotalVisits.objects.first()
    total_count = total_visits.total_ekvayu_visit_count if total_visits else 0
    
    response_data = {
        "totalEkvayuVisitCount": total_count,
        "users": serializer.data
    }
    
    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_details(request, unique_id):
    try:
        user = Details.objects.get(uniqueId=unique_id)
        total_visits = TotalVisits.objects.get(id=1)
        
        response_data = {
            "message": "User details retrieved successfully",
            "user": {
                "username": user.username,
                "email": user.email,
                "phone": user.phone,
                "uniqueId": user.uniqueId,
                "visitedRoutes": user.visited_routes,
                "ekvayuVisitCount": user.ekvayu_visit_count,
                "os": user.os,
                "timezone": user.timezone,
                "visitTimestamp": user.visit_timestamp
            }
        }
        return Response(response_data, status=status.HTTP_200_OK)
    except Details.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )



@api_view(['GET'])
def get_total_visits(request):
    total_visits = TotalVisits.objects.first()
    if total_visits:
        response_data = {
            "totalEkvayuVisitCount": total_visits.total_ekvayu_visit_count
        }
        return Response(response_data, status=status.HTTP_200_OK)
    return Response({"totalEkvayuVisitCount": 0}, status=status.HTTP_200_OK)




@api_view(['PATCH'])
def update_user_details(request, unique_id):
    try:
        user = Details.objects.get(uniqueId=unique_id)
        
        # Create a serializer instance with the existing user and partial update data
        serializer = DetailsSerializer(user, data={'user_tracking_info': request.data}, partial=True)
        
        if serializer.is_valid():
            user = serializer.save()
            
            # Get total visits for response
            total_visits = TotalVisits.objects.first()
            total_visits_count = total_visits.total_ekvayu_visit_count if total_visits else 0
            
            response_data = {
                "message": "User details updated successfully",
                "users": {
                    "username": user.username,
                    "email": user.email,
                    "phone": user.phone,
                    "uniqueId": user.uniqueId,
                    "visitedRoutes": user.visited_routes,
                    "ekvayuVisitCount": user.ekvayu_visit_count,
                    "os": user.os,
                    "timezone": user.timezone,
                    "visitTimestamp": user.visit_timestamp
                }
            }
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    except Details.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )






@api_view(['POST'])
def create_offer(request, offer_type):
    data = request.data
    data['offer_type'] = offer_type
    
    serializer = BaseOffersSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": f"{offer_type} offer created successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({"error": "offer already exist"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_offer(request, offer_type, pk):
    try:
        offer = BaseOffers.objects.get(pk=pk, offer_type=offer_type)
        serializer = BaseOffersSerializer(offer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except BaseOffers.DoesNotExist:
        return Response({
            "error": "offer not found"
        }, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_all_offers(request, offer_type):
    page = request.GET.get('page', 1)
    page_size = request.GET.get('page_size', 10)
    
    Offers = BaseOffers.objects.filter(offer_type=offer_type)
    paginator = Paginator(Offers, page_size)
    
    try:
        current_page = paginator.page(page)
    except:
        current_page = paginator.page(1)
    
    serializer = BaseOffersSerializer(current_page, many=True)
    return Response({
        "total": paginator.count,
        "total_pages": paginator.num_pages,
        "current_page": int(page),
        "results": serializer.data
    }, status=status.HTTP_200_OK)

@api_view(['PATCH'])
def update_offer(request, offer_type, pk):
    try:
        offer = BaseOffers.objects.get(pk=pk, offer_type=offer_type)
        data = request.data
        data['offer_type'] = offer_type
        
        serializer = BaseOffersSerializer(offer, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": f"{offer_type} offer updated successfully",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except BaseOffers.DoesNotExist:
        return Response({
            {"error": "Offer not found"},
        }, status=status.HTTP_404_NOT_FOUND)

