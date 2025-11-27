import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore } from '@reduxjs/toolkit';
import { ReactElement, ReactNode } from 'react';
import rootReducer from '@/store/rootReducer';

const createTestStore = (initialState: Record<string, unknown> = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState as never,
  });
};

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialState?: Record<string, unknown>;
  store?: ReturnType<typeof createTestStore>;
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    initialState = {},
    store = createTestStore(initialState),
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const queryClient = createTestQueryClient();

  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </Provider>
    );
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

