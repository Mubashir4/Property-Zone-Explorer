/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_MAP_DEFAULT_LAT: string;
  readonly VITE_MAP_DEFAULT_LNG: string;
  readonly VITE_MAP_DEFAULT_ZOOM: string;
  readonly VITE_ENABLE_SCHOOLS: string;
  readonly VITE_ENABLE_AMENITIES: string;
  readonly VITE_ENABLE_RISK_OVERLAYS: string;
  readonly VITE_ENABLE_DRAWING_TOOLS: string;
  readonly VITE_USE_MOCK_DATA: string;
  readonly VITE_ENABLE_DEV_TOOLS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

