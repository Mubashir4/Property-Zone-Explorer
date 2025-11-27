import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loading } from '@/components/common/Loading/Loading';

// Lazy load route components
const SearchPage = lazy(() => import('@/features/search/SearchPage'));
const PropertyDetailPage = lazy(() => import('@/features/propertyDetail/PropertyDetailPage'));

const PageLoader = () => <Loading fullScreen message="Loading..." />;

export const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/property/:id" element={<PropertyDetailPage />} />
    </Routes>
  </Suspense>
);

