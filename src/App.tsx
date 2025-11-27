import { useMemo, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { store } from '@/store';
import { createAppTheme } from '@/theme';
import { useColorMode } from '@/hooks/useColorMode';
import { AppRoutes } from '@/routes';
import ErrorBoundary from '@/components/common/ErrorBoundary/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const { effectiveMode } = useColorMode();
  const theme = useMemo(() => createAppTheme(effectiveMode), [effectiveMode]);

  // Register (or explicitly unregister) the service worker based on env to avoid stale caches/blank screens
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const enablePwa = import.meta.env.VITE_ENABLE_PWA === 'true';

    if (!enablePwa) {
      // Clean up any previously registered service workers/caches to prevent stale bundles causing white screens
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
      if ('caches' in window) {
        caches.keys().then((keys) => {
          keys
            .filter((key) => key.startsWith('workbox-') || key.includes('precache') || key.includes('banner17'))
            .forEach((key) => caches.delete(key));
        });
      }
      return;
    }

    if (import.meta.env.PROD) {
      // Delay registration to ensure React is fully loaded
      setTimeout(() => {
        navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      }, 100);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              borderRadius: '12px',
              padding: '16px',
            },
          }}
        />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
        {import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
