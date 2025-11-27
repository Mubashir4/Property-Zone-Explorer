import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ColorMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ColorMode;
}

const getInitialMode = (): ColorMode => {
  const saved = localStorage.getItem('color-mode') as ColorMode;
  return saved || 'system';
};

const initialState: ThemeState = {
  mode: getInitialMode(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColorMode: (state, action: PayloadAction<ColorMode>) => {
      state.mode = action.payload;
      localStorage.setItem('color-mode', action.payload);
    },
  },
});

export const { setColorMode } = themeSlice.actions;
export default themeSlice.reducer;

