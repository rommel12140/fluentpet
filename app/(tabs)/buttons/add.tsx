import { addButton, selectButtons } from '@/features/buttons/buttonSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const useButtonNames = () =>
  useAppSelector(selectButtons).map(b => b.label.toLowerCase().trim());

/* palette */
import { useMockBase } from '@/hooks/useMockBase';
import { colors as base } from '@/styles/colors';
import LottieView from 'lottie-react-native';
const c = { ...base, navy:'#1D203E', mint:'#F4F9F4', card:'#FFFFFF', accent:base.leafGreen };

const colorChoices = ['#FF9A65', '#5AB0A5', '#F9CF58', '#AC9CFF', '#F46B7E'];

export default function AddButtonScreen() {
  const dispatch = useAppDispatch();
  const [pairStep, setPairStep] = useState<0 | 1 | 2>(0); // 0 = idle
  const [label, setLabel]     = useState('');
  const [color, setColor]     = useState(colorChoices[0]);
  const [preview, setPreview] = useState(true);
  const names = useButtonNames();
  const { linkButton } = useMockBase();

  /* -------------- PAIRING OVERLAY -------------- */
  const PairingOverlay = () => {
    if (pairStep === 0) return null;
    const msg = pairStep === 1 ? 'Pairing with Base…' : 'Syncing to Cloud…';
    return (
      <View style={styles.overlay}>
        <LottieView
          source={require('@/assets/lottie/loading-paw.json')}
          autoPlay
          loop
          style={{ width: 160, height: 160 }}
        />
        <Text style={styles.ovlTxt}>{msg}</Text>
      </View>
    );
  };
  
  /* -------------- SAVE & MOCK 2-STEP PAIR -------------- */
  const onSave = () => {
    if (!label.trim()) { Alert.alert('Label required'); return; }

    dispatch(addButton({ label:label.trim(), color, preview }));
    //linkButton(label.trim());
    /* ➜ go to the pairing screen, passing label & colour */
    router.replace(
      `/pairing?label=${encodeURIComponent(label.trim())}&color=${encodeURIComponent(color)}`
    )
  };

  /* UI */
  return (
    <View style={styles.container}>
      {/* label input */}
      <Text style={styles.title}>Add Button</Text>
      <Text style={styles.label}>Label</Text>
      <TextInput
        placeholder="e.g., Play"
        value={label}
        onChangeText={setLabel}
        style={styles.input}
      />

      {/* colour row */}
      <Text style={styles.label}>Colour</Text>
      <View style={styles.colorRow}>
        {colorChoices.map(hex => (
          <TouchableOpacity
            key={hex}
            style={[styles.swatch,{ backgroundColor:hex, borderWidth: color===hex?2:0 }]}
            onPress={() => setColor(hex)}
          />
        ))}
      </View>

      {/* preview switch */}
      <View style={styles.previewRow}>
        <Text style={styles.label}>Preview sound</Text>
        <Switch
          value={preview}
          onValueChange={setPreview}
          trackColor={{ false:'#ccc', true:c.accent }}
          thumbColor="#fff"
        />
      </View>

      {/* save CTA */}
      <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
        <Feather name="save" size={18} color="#fff" style={{ marginRight:6 }} />
        <Text style={styles.saveTxt}>Save Button</Text>
      </TouchableOpacity>
      <PairingOverlay />
    </View>
  );
}

/* -------------- styles -------------- */
const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:c.cream, paddingHorizontal:24, paddingTop:24 },
  title:{ fontSize:22, fontWeight:'700', color:c.navy, marginBottom:22 },

  label:{ fontSize:14, color:c.grayText, marginBottom:6 },
  input:{
    backgroundColor:c.card, borderRadius:16, padding:14, fontSize:16, color:c.navy,
    shadowColor:'#000', shadowOpacity:0.05, shadowRadius:5, shadowOffset:{width:0,height:2},
    marginBottom:20,
  },

  colorRow:{ flexDirection:'row', gap:14, marginBottom:24 },
  swatch:{
    width:42, height:42, borderRadius:21, borderColor:c.navy,
    shadowColor:'#000', shadowOpacity:0.05, shadowRadius:4, shadowOffset:{width:0,height:2},
  },

  previewRow:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:32 },

  saveBtn:{
    flexDirection:'row', backgroundColor:c.accent, borderRadius:28, height:56,
    alignItems:'center', justifyContent:'center',
    shadowColor:c.accent, shadowOpacity:0.25, shadowRadius:6, shadowOffset:{width:0,height:4},
    elevation:5,
  },
  saveTxt:{ color:'#fff', fontSize:16, fontWeight:'700' },
  overlay:{
    position:'absolute',
    top:0,left:0,right:0,bottom:0,
    backgroundColor:'rgba(255,255,255,0.7)',
    justifyContent:'center',
    alignItems:'center',
    zIndex:9999,
  },
  ovlTxt:{ marginTop:12, fontSize:16, fontWeight:'600', color:'#3E3E3E' },
});