/* features/ui/loadingSlice.ts */
import { createSlice } from '@reduxjs/toolkit';

interface LoadingState { count: number }
const initialState: LoadingState = { count: 0 };

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading:  (s) => { s.count += 1; },
    stopLoading:   (s) => { s.count = Math.max(0, s.count - 1); },
    resetLoading:  (s) => { s.count = 0; },          // optional helper
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
export const selectLoading = (s: { loading: LoadingState }) => s.loading.count > 0;