/**
 * CENTRALIZED API CONFIGURATION
 * Update these values when client provides actual endpoints
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  // Properties
  PROPERTIES: {
    SEARCH: '/properties/search',
    BY_ID: (id: string) => `/properties/${id}`,
    BY_BOUNDS: '/properties/bounds',
    BY_POLYGON: '/properties/polygon',
    NEARBY: (id: string) => `/properties/${id}/nearby`,
  },

  // Schools
  SCHOOLS: {
    SEARCH: '/schools/search',
    BY_ID: (id: string) => `/schools/${id}`,
    CATCHMENT: (id: string) => `/schools/${id}/catchment`,
    BY_TYPE: '/schools/type',
    NEARBY_PROPERTIES: (id: string) => `/schools/${id}/properties`,
  },

  // Amenities
  AMENITIES: {
    SEARCH: '/amenities/search',
    BY_CATEGORY: '/amenities/category',
    BY_LOCATION: '/amenities/nearby',
    CATEGORIES: '/amenities/categories',
  },

  // Risk Data
  RISK: {
    FLOOD: '/risk/flood',
    BUSHFIRE: '/risk/bushfire',
    HERITAGE: '/risk/heritage',
    ZONING: '/risk/zoning',
    BY_PROPERTY: (id: string) => `/risk/property/${id}`,
  },

  // Spatial
  SPATIAL: {
    GEOCODE: '/spatial/geocode',
    REVERSE_GEOCODE: '/spatial/reverse',
    DISTANCE: '/spatial/distance',
  },
} as const;

export type APIEndpoints = typeof API_ENDPOINTS;

