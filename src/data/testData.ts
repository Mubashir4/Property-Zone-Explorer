import { Property } from '@/types/property.types';
import propertiesData from '../../candidate-coding-test-01/sample-data/properties.json';

// Transform test data to match our Property interface
export const testProperties: Property[] = propertiesData.properties.map((prop: any) => ({
  id: prop.id,
  address: prop.address,
  suburb: prop.suburb,
  postcode: '2000', // Default for Sydney
  state: 'NSW',
  coordinates: {
    lat: prop.latitude,
    lng: prop.longitude,
  },
  price: prop.price,
  bedrooms: prop.bedrooms,
  bathrooms: prop.bathrooms,
  parking: prop.bedrooms > 2 ? 2 : 1, // Estimate parking based on bedrooms
  propertyType: prop.propertyType.toLowerCase() as 'house' | 'apartment' | 'townhouse' | 'land',
  landSize: prop.propertyType === 'House' ? 450 : undefined,
  images: [
    // Use placeholder images based on property type
    prop.propertyType === 'House'
      ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
      : prop.propertyType === 'Apartment' || prop.propertyType === 'Studio'
      ? 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
      : 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
  ],
  description: `${prop.propertyType} located in ${prop.suburb}. This ${prop.bedrooms} bedroom, ${prop.bathrooms} bathroom property offers excellent value and lifestyle.`,
  agent: {
    name: 'Banner17 Agent',
    phone: '0400 000 000',
    email: 'agent@banner17.com.au',
  },
  listingDate: '2024-11-01',
  features: [
    prop.propertyType === 'House' ? 'Backyard' : 'Balcony',
    'Modern Kitchen',
    'Air Conditioning',
    ...(prop.bedrooms > 2 ? ['Study Room'] : []),
    ...(prop.bathrooms > 1 ? ['Ensuite'] : []),
  ],
}));

