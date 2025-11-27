import { Property } from '@/types/property.types';
import { testProperties } from './testData';

// Export the test data as mockProperties for backward compatibility
export const mockProperties: Property[] = testProperties;

// Keep the old mock data for reference (can be removed later)
export const oldMockProperties: Property[] = [
  {
    id: '1',
    address: '123 Harbour Street',
    suburb: 'Mosman',
    postcode: '2088',
    state: 'NSW',
    coordinates: {
      lat: -33.8299,
      lng: 151.2431,
    },
    price: 2500000,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    propertyType: 'house',
    landSize: 650,
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'],
    description:
      'Stunning harbour views from this beautifully renovated family home. Features modern kitchen, spacious living areas, and landscaped gardens.',
    agent: {
      name: 'Sarah Johnson',
      phone: '0412345678',
      email: 'sarah.johnson@banner17.com.au',
    },
    listingDate: '2024-11-01',
    features: [
      'Harbour Views',
      'Swimming Pool',
      'Modern Kitchen',
      'Air Conditioning',
      'Study',
      'Built-in Wardrobes',
    ],
  },
  {
    id: '2',
    address: '45 Beach Road',
    suburb: 'Bondi',
    postcode: '2026',
    state: 'NSW',
    coordinates: {
      lat: -33.8915,
      lng: 151.2767,
    },
    price: 1800000,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    propertyType: 'apartment',
    images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'],
    description:
      'Beachside living at its finest. This modern apartment offers stunning ocean views and is just steps from Bondi Beach.',
    agent: {
      name: 'Michael Chen',
      phone: '0423456789',
      email: 'michael.chen@banner17.com.au',
    },
    listingDate: '2024-11-15',
    features: [
      'Ocean Views',
      'Balcony',
      'Security Building',
      'Gym',
      'Pool',
      'Close to Beach',
    ],
  },
  {
    id: '3',
    address: '78 Park Avenue',
    suburb: 'Cremorne',
    postcode: '2090',
    state: 'NSW',
    coordinates: {
      lat: -33.8270,
      lng: 151.2285,
    },
    price: 3200000,
    bedrooms: 5,
    bathrooms: 4,
    parking: 3,
    propertyType: 'house',
    landSize: 850,
    images: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800'],
    description:
      'Luxury family residence with spectacular harbour glimpses. Premium finishes throughout, expansive entertaining areas.',
    agent: {
      name: 'Emma Williams',
      phone: '0434567890',
      email: 'emma.williams@banner17.com.au',
    },
    listingDate: '2024-10-20',
    features: [
      'Harbour Glimpses',
      'Wine Cellar',
      'Home Theatre',
      'Double Garage',
      'Landscaped Gardens',
      'Security System',
    ],
  },
  {
    id: '4',
    address: '156 High Street',
    suburb: 'North Sydney',
    postcode: '2060',
    state: 'NSW',
    coordinates: {
      lat: -33.8368,
      lng: 151.2065,
    },
    price: 950000,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    propertyType: 'apartment',
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'],
    description:
      'Contemporary apartment in the heart of North Sydney. Perfect for professionals seeking convenience and style.',
    agent: {
      name: 'David Lee',
      phone: '0445678901',
      email: 'david.lee@banner17.com.au',
    },
    listingDate: '2024-11-20',
    features: [
      'City Views',
      'Modern Kitchen',
      'Internal Laundry',
      'Balcony',
      'Concierge',
      'Close to Transport',
    ],
  },
  {
    id: '5',
    address: '92 Garden Terrace',
    suburb: 'Neutral Bay',
    postcode: '2089',
    state: 'NSW',
    coordinates: {
      lat: -33.8308,
      lng: 151.2191,
    },
    price: 1650000,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    propertyType: 'townhouse',
    images: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800'],
    description:
      'Spacious townhouse with private courtyard. Ideal for families seeking low-maintenance lifestyle without compromising space.',
    agent: {
      name: 'Jennifer Brown',
      phone: '0456789012',
      email: 'jennifer.brown@banner17.com.au',
    },
    listingDate: '2024-11-10',
    features: [
      'Private Courtyard',
      'Open Plan Living',
      'Gas Cooking',
      'Storage',
      'Pet Friendly',
      'Quiet Street',
    ],
  },
];

