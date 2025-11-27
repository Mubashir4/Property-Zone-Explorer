import { RiskDataResponse } from '@/types/risk.types';

// Mock flood risk data (around Neutral Bay area)
export const mockFloodData: RiskDataResponse = {
  type: 'flood',
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          risk_level: 'medium',
          description: 'Medium flood risk zone',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [151.2180, -33.8320],
              [151.2220, -33.8320],
              [151.2220, -33.8360],
              [151.2180, -33.8360],
              [151.2180, -33.8320],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          risk_level: 'low',
          description: 'Low flood risk zone',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [151.2250, -33.8280],
              [151.2300, -33.8280],
              [151.2300, -33.8320],
              [151.2250, -33.8320],
              [151.2250, -33.8280],
            ],
          ],
        },
      },
    ],
  },
};

// Mock bushfire risk data (hillside areas)
export const mockBushfireData: RiskDataResponse = {
  type: 'bushfire',
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          risk_level: 'high',
          bal_rating: 'BAL-29',
          description: 'High bushfire risk - BAL-29',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [151.2420, -33.8250],
              [151.2480, -33.8250],
              [151.2480, -33.8290],
              [151.2420, -33.8290],
              [151.2420, -33.8250],
            ],
          ],
        },
      },
    ],
  },
};

// Mock heritage zones
export const mockHeritageData: RiskDataResponse = {
  type: 'heritage',
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          zone_name: 'Mosman Heritage Conservation Area',
          description: 'Heritage listed area with building restrictions',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [151.2380, -33.8280],
              [151.2450, -33.8280],
              [151.2450, -33.8330],
              [151.2380, -33.8330],
              [151.2380, -33.8280],
            ],
          ],
        },
      },
    ],
  },
};

// Mock zoning data
export const mockZoningData: RiskDataResponse = {
  type: 'zoning',
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          zone_code: 'R2',
          zone_name: 'Low Density Residential',
          description: 'Low density residential with minimum lot sizes',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [151.2350, -33.8260],
              [151.2420, -33.8260],
              [151.2420, -33.8310],
              [151.2350, -33.8310],
              [151.2350, -33.8260],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          zone_code: 'R3',
          zone_name: 'Medium Density Residential',
          description: 'Medium density residential - apartments allowed',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [151.2050, -33.8350],
              [151.2120, -33.8350],
              [151.2120, -33.8400],
              [151.2050, -33.8400],
              [151.2050, -33.8350],
            ],
          ],
        },
      },
    ],
  },
};


