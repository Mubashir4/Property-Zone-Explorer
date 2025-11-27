// @ts-expect-error - Turf.js types may need configuration
import * as turf from '@turf/turf';

/**
 * Calculate distance between two coordinates in meters
 */
export const calculateDistance = (
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
): number => {
  const point1 = turf.point([from.lng, from.lat]);
  const point2 = turf.point([to.lng, to.lat]);
  return turf.distance(point1, point2, { units: 'meters' });
};

/**
 * Simplify a polygon while preserving its shape
 */
export const simplifyPolygon = (
  polygon: GeoJSON.Polygon,
  tolerance = 0.001
): GeoJSON.Polygon => {
  const simplified = turf.simplify(polygon, { tolerance, highQuality: true });
  return simplified.geometry as GeoJSON.Polygon;
};

/**
 * Check if a point is within a polygon
 */
export const isPointInPolygon = (
  point: { lat: number; lng: number },
  polygon: GeoJSON.Polygon
): boolean => {
  const pt = turf.point([point.lng, point.lat]);
  return turf.booleanPointInPolygon(pt, polygon);
};

/**
 * Create a circle polygon from center and radius
 */
export const createCircle = (
  center: { lat: number; lng: number },
  radius: number
): GeoJSON.Polygon => {
  const circle = turf.circle([center.lng, center.lat], radius, {
    units: 'meters',
    steps: 64,
  });
  return circle.geometry as GeoJSON.Polygon;
};

/**
 * Calculate area of a polygon in square meters
 */
export const calculateArea = (polygon: GeoJSON.Polygon): number => {
  return turf.area(polygon);
};

/**
 * Get center point of a polygon
 */
export const getPolygonCenter = (polygon: GeoJSON.Polygon): { lat: number; lng: number } => {
  const center = turf.center(polygon);
  return {
    lat: center.geometry.coordinates[1],
    lng: center.geometry.coordinates[0],
  };
};

