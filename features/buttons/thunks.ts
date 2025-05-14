/* features/buttons/thunks.ts */
import { startLoading, stopLoading } from '@/features/ui/loadingSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addButton, ButtonItem } from './buttonSlice';

export const addButtonAsync = createAsyncThunk(
  'buttons/addRemote',
  async (data: Omit<ButtonItem, 'id'>, { dispatch }) => {
    dispatch(startLoading());          // show overlay
    try {
      /* call your REST / GraphQL backend here */
      await new Promise(r => setTimeout(r, 2200));  // simulate latency
      dispatch(addButton(data));        // local Redux update
    } finally {
      dispatch(stopLoading());          // hide overlay
    }
  }
);