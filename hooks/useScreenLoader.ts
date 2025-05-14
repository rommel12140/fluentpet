import { startLoading, stopLoading } from '@/features/ui/loadingSlice';
import { useAppDispatch } from '@/store/hooks';
import { useFocusEffect } from 'expo-router'; // same as react-navigation's useFocusEffect
import { useCallback } from 'react';

/** Shows the global paw overlay for `ms` ms every time the screen gains focus */
export const useScreenLoader = (ms = 800) => {
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(startLoading());
      const id = setTimeout(() => dispatch(stopLoading()), ms);
      return () => clearTimeout(id);
    }, [dispatch, ms])
  );
};