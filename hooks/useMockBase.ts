import { startLoading, stopLoading } from '@/features/ui/loadingSlice';
import { useAppDispatch } from '@/store/hooks';
import Toast from 'react-native-root-toast';

/** Simulate connecting button-ID to base in 2 steps */
export const useMockBase = () => {
  const dispatch = useAppDispatch();

  const linkButton = async (buttonId: string) => {
    dispatch(startLoading());          // show paw spinner
    await new Promise(r => setTimeout(r, 1200));  // fake radio pairing
    await new Promise(r => setTimeout(r, 600));   // fake cloud confirm
    dispatch(stopLoading());
    Toast.show(`Base linked to "${buttonId}"`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
    });
  };

  return { linkButton };
};