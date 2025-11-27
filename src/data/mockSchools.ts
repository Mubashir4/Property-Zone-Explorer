import { School } from '@/types/school.types';

export const mockSchools: School[] = [
  {
    id: 's1',
    name: 'Mosman Public School',
    type: 'public',
    level: 'primary',
    gender: 'coed',
    coordinates: {
      lat: -33.8285,
      lng: 151.2415,
    },
    address: '14 Belmont Road',
    suburb: 'Mosman',
    postcode: '2088',
    phone: '(02) 9969 1166',
    rating: 4.5,
    studentCount: 520,
  },
  {
    id: 's2',
    name: 'Mosman High School',
    type: 'public',
    level: 'secondary',
    gender: 'coed',
    coordinates: {
      lat: -33.8320,
      lng: 151.2398,
    },
    address: 'Kardella Road',
    suburb: 'Mosman',
    postcode: '2088',
    phone: '(02) 9968 2877',
    rating: 4.3,
    studentCount: 850,
  },
  {
    id: 's3',
    name: 'Neutral Bay Public School',
    type: 'public',
    level: 'primary',
    gender: 'coed',
    coordinates: {
      lat: -33.8315,
      lng: 151.2195,
    },
    address: 'Hayes Street',
    suburb: 'Neutral Bay',
    postcode: '2089',
    phone: '(02) 9953 4076',
    rating: 4.6,
    studentCount: 480,
  },
  {
    id: 's4',
    name: 'Loreto Kirribilli',
    type: 'catholic',
    level: 'secondary',
    gender: 'girls',
    coordinates: {
      lat: -33.8450,
      lng: 151.2125,
    },
    address: '85 Carabella Street',
    suburb: 'Kirribilli',
    postcode: '2061',
    phone: '(02) 9957 4722',
    rating: 4.8,
    studentCount: 650,
  },
  {
    id: 's5',
    name: 'Shore School',
    type: 'private',
    level: 'secondary',
    gender: 'boys',
    coordinates: {
      lat: -33.8380,
      lng: 151.2048,
    },
    address: 'Blue Street',
    suburb: 'North Sydney',
    postcode: '2060',
    phone: '(02) 9900 4200',
    rating: 4.7,
    studentCount: 1200,
  },
  {
    id: 's6',
    name: 'Cremorne Public School',
    type: 'public',
    level: 'primary',
    gender: 'coed',
    coordinates: {
      lat: -33.8275,
      lng: 151.2298,
    },
    address: 'Bardwell Road',
    suburb: 'Cremorne',
    postcode: '2090',
    phone: '(02) 9953 7085',
    rating: 4.4,
    studentCount: 390,
  },
];

// Mock catchment boundary for Mosman Public School
export const mockCatchmentData = {
  schoolId: 's1',
  boundary: {
    type: 'Polygon' as const,
    coordinates: [
      [
        [151.2350, -33.8250],
        [151.2480, -33.8250],
        [151.2480, -33.8350],
        [151.2350, -33.8350],
        [151.2350, -33.8250],
      ],
    ],
  },
  year: 2024,
};


