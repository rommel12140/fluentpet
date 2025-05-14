import { store } from '@/store';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

import { selectLoading } from '@/features/ui/loadingSlice';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppSelector } from '@/store/hooks';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

/* full-screen overlay that appears whenever loading.count > 0 */
function GlobalLoading() {
  const busy = useAppSelector(selectLoading);

  if (!busy) return null;
  return (
    <View style={styles.overlay}>
      <LottieView
        source={require('@/assets/lottie/loading-paw.json')}
        autoPlay
        loop
        style={{ width: 140, height: 140 }}
      />
    </View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [ready, setReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
  useEffect(() => {
    (async () => {
      await Asset.loadAsync(require('@/assets/images/paws-tile.png'));
      setReady(true);
    })();
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  if (!ready) return null;        // keep splash until cached

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown:false }} />
          <Stack.Screen name="loading" options={{ headerShown:false }} />
          <Stack.Screen name="pairing" options={{ headerShown:false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <GlobalLoading /> {/* always on top */}
      </ThemeProvider>
    </Provider>
  );
}


const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,              // stay above modals
  },
});
