import { Audio } from 'expo-av';

export const playBeep = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/audio/beep.mp3'),   // put a short .mp3 here
      { shouldPlay: true }
    );
    // Unload when done to free memory
    sound.setOnPlaybackStatusUpdate((s) => {
      if (!s.isLoaded || s.didJustFinish) sound.unloadAsync();
    });
  } catch (e) {
    console.warn('Sound error', e);
  }
};