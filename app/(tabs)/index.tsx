import { useAppSelector } from '@/store/hooks';
import { Redirect } from 'expo-router';

export default function Index() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return <Redirect href={isLoggedIn ? '/home': '/login'} />
}