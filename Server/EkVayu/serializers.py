from rest_framework import serializers
from .models import Details, TotalVisits, BaseOffers

class DetailsSerializer(serializers.ModelSerializer):
    user_tracking_info = serializers.DictField(write_only=True, required=True)

    class Meta:
        model = Details
        fields = [
            'username', 
            'email', 
            'phone', 
            'uniqueId', 
            'visited_routes',
            'ekvayu_visit_count',
            'os',
            'timezone',
            'visit_timestamp',
            'user_tracking_info'
        ]

    def create(self, validated_data):
        tracking_info = validated_data.pop('user_tracking_info')
        
        # Check if user with uniqueId exists
        unique_id = tracking_info.get('uniqueId')
        existing_user = Details.objects.filter(uniqueId=unique_id).first()
        
        if existing_user:
            # Update existing user
            existing_user.visited_routes = tracking_info.get('visitedRoutes', [])
            existing_user.ekvayu_visit_count = tracking_info.get('ekvayuVisitCount', 1)
            existing_user.os = tracking_info.get('os', '')
            existing_user.timezone = tracking_info.get('timezone', '')
            existing_user.visit_timestamp = tracking_info.get('visitTimestamp')
            existing_user.save()
            return existing_user
        
        # Create new user
        return Details.objects.create(
            username=tracking_info.get('username', ''),
            email=tracking_info.get('email', ''),
            phone=tracking_info.get('phone', ''),
            uniqueId=unique_id,
            visited_routes=tracking_info.get('visitedRoutes', []),
            ekvayu_visit_count=tracking_info.get('ekvayuVisitCount', 1),
            os=tracking_info.get('os', ''),
            timezone=tracking_info.get('timezone', ''),
            visit_timestamp=tracking_info.get('visitTimestamp')
        )
    

    def update(self, instance, validated_data):
        tracking_info = validated_data.get('user_tracking_info', {})
        
        # Update fields if they exist in the request
        instance.username = tracking_info.get('username', instance.username)
        instance.email = tracking_info.get('email', instance.email)
        instance.phone = tracking_info.get('phone', instance.phone)
        instance.visited_routes = tracking_info.get('visitedRoutes', instance.visited_routes)
        instance.ekvayu_visit_count = tracking_info.get('ekvayuVisitCount', instance.ekvayu_visit_count)
        instance.os = tracking_info.get('os', instance.os)
        instance.timezone = tracking_info.get('timezone', instance.timezone)
        instance.visit_timestamp = tracking_info.get('visitTimestamp', instance.visit_timestamp)
        
        instance.save()
        return instance



class BaseOffersSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseOffers
        fields = ['id', 'title', 'description', 'price', 'features', 'created_at', 'updated_at', 'offer_type']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_features(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Features must be a list")
        if not all(isinstance(item, str) for item in value):
            raise serializers.ValidationError("All features must be strings")
        return value

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative")
        return value


