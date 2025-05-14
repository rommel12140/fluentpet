/* -------- app/pairing.tsx -------- */
import { addLog } from '@/features/logs/logsSlice';
import { useAppDispatch } from '@/store/hooks';
import * as Network from 'expo-network';
import { router, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import {
    Alert, Image, StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Toast from 'react-native-root-toast';

const ACCENT = '#2F7A4E';
const TEXT   = '#1E1E1E';
const PAW    = require('@/assets/lottie/loading-paw.json');
const PAIRPNG = require('@/assets/images/pair.png');

type Stage = 'confirm' | 'connecting' | 'pair' | 'noWifi';

export default function PairingScreen() {
  const { label, color } = useLocalSearchParams<{ label: string; color: string }>();
  const [stage, setStage] = useState<Stage>('confirm');
  const [ssid,  setSsid]  = useState<string>('Wi-Fi');

  const dispatch = useAppDispatch();

  /* ---------- check Wi-Fi on mount ---------- */
  useEffect(() => {
    (async () => {
      try {
        const state = await Network.getNetworkStateAsync();
        if (state.type === Network.NetworkStateType.WIFI && state.isConnected) {
          const found = (state.details as any)?.ssid as string | undefined;
          setSsid(found ?? 'Wi-Fi');
          setStage('confirm');
        } else {
          setStage('noWifi');
        }
      } catch {
        Alert.alert('Error', 'Could not read Wi-Fi info.');
        router.replace('/(tabs)/buttons');
      }
    })();
  }, []);

  /* ---------- progress auto from “connecting” > “pair” ---------- */
  useEffect(() => {
    if (stage === 'connecting') {
      const id = setTimeout(() => setStage('pair'), 1500);
      return () => clearTimeout(id);
    }
  }, [stage]);

  /* ---------- finish pairing ---------- */
  const finish = () => {
    dispatch(addLog({ label: label ?? 'Button', ts: Date.now() }));
    Toast.show('Button paired!', { duration: Toast.durations.SHORT, position: Toast.positions.CENTER });
    router.replace('/(tabs)/buttons');
  };

  /* ---------- UI ---------- */
  return (
    <View style={styles.screen}>
      {/* -------- No Wi-Fi message -------- */}
      {stage === 'noWifi' && (
        <>
          <Text style={styles.title}>Connect to 2.4 GHz Wi-Fi first</Text>
          <TouchableOpacity style={styles.primary} onPress={() => router.back()}>
            <Text style={styles.primaryTxt}>Go Back</Text>
          </TouchableOpacity>
        </>
      )}

      {/* -------- STEP 1: confirm SSID -------- */}
      {stage === 'confirm' && (
        <>
          <Text style={styles.title}>Connect Base to Wi-Fi</Text>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Detected network</Text>
            <Text style={styles.cardSsid}>{ssid}</Text>
            <Text style={styles.cardHint}>Hold the Base button 5 s until the LED starts flashing.</Text>
          </View>

          <TouchableOpacity style={styles.primary} onPress={() => setStage('connecting')}>
            <Text style={styles.primaryTxt}>Next ▸</Text>
          </TouchableOpacity>
        </>
      )}

      {/* -------- STEP 1b: connecting -------- */}
      {stage === 'connecting' && (
        <>
          <LottieView source={PAW} autoPlay loop style={styles.anim} />
          <Text style={styles.msg}>Connecting Base to {ssid}…</Text>
        </>
      )}

      {/* -------- STEP 2: pair button -------- */}
      {stage === 'pair' && (
        <>
            <Image source={PAIRPNG} style={styles.pairImg} />
            <Text style={styles.title}>Pair the New Button</Text>
            <Text style={styles.msgSmall}>Place the button near the Base, then tap below.</Text>

            <TouchableOpacity style={styles.primary} onPress={finish}>
            <Text style={styles.primaryTxt}>Pair&nbsp;Button</Text>
            </TouchableOpacity>
        </>
      )}
    </View>
  );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  screen:{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff', paddingHorizontal:24 },
  title:{ fontSize:22, fontWeight:'700', color:TEXT, marginBottom:16, textAlign:'center' },

  /* card */
  card:{ width:'100%', backgroundColor:'#F4F4F4', borderRadius:16, padding:20, marginBottom:24 },
  cardLabel:{ fontSize:13, color:'#666' },
  cardSsid:{ fontSize:18, fontWeight:'600', color:TEXT, marginVertical:4 },
  cardHint:{ fontSize:13, color:'#666' },

  primary:{
    backgroundColor:ACCENT, paddingHorizontal:36, paddingVertical:14, borderRadius:28,
    shadowColor:ACCENT, shadowOpacity:0.25, shadowRadius:6, shadowOffset:{width:0,height:4},
    elevation:5,
  },
  primaryTxt:{ color:'#fff', fontSize:16, fontWeight:'700' },

  anim:{ width:160, height:160 },
  msg:{ marginTop:18, fontSize:18, fontWeight:'600', color:TEXT, textAlign:'center' },
  msgSmall:{ fontSize:14, color:'#555', marginBottom:30, textAlign:'center' },

  pairWrap:{ alignItems:'center' },
  pairTxt:{ marginTop:10, fontSize:16, fontWeight:'600', color:ACCENT },
  
  pairImg:{ width:300, height:300, marginBottom:20, resizeMode:'contain' },
});