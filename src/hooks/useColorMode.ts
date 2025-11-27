import { useEffect, useMemo } from 'react';
import { useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setColorMode } from '@/store/slices/themeSlice';

type ColorMode = 'light' | 'dark' | 'system';

export const useColorMode = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  const effectiveMode = useMemo(() => {
    return mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;
  }, [mode, prefersDark]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', effectiveMode);
  }, [effectiveMode]);

  const setMode = (newMode: ColorMode) => {
    dispatch(setColorMode(newMode));
  };

  return { mode, effectiveMode, setMode };
};

