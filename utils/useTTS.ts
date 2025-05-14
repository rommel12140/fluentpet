import * as Speech from 'expo-speech';

export const speakLabel = (text: string) => {
  try {
    Speech.stop();                              // stop any current speech
    Speech.speak(text, {
      rate: 0.9,                                // slightly slower
      pitch: 1.0,
      language: 'en-US',                        // pick a voice; change if desired
      onDone: () => Speech.stop(),              // be sure to release
    });
  } catch (e) {
    console.warn('TTS error', e);
  }
};