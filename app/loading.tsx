/* -------- app/loading.tsx  -------- */
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PreparingPets() {
  /* fixed 4-second timer */
  useEffect(() => {
    const id = setTimeout(() => router.replace('/(tabs)'), 4000);
    return () => clearTimeout(id);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('@/assets/lottie/dog-run.json')} // running-dog JSON
        autoPlay
        loop
        style={{ width: 220, height: 220 }}
      />
      <Text style={styles.text}>Preparing Pets…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: '600',
    color: '#3E3E3E',
  },
});