import {
  deleteButton,
  selectButtonById,
  updateButton,
} from '@/features/buttons/buttonSlice';
import { startLoading, stopLoading } from '@/features/ui/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { colors as base } from '@/styles/colors';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Switch,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import { useButtonNames } from './add';

const c = { ...base, navy:'#1D203E', mint:'#F4F9F4', card:'#FFFFFF', accent:base.leafGreen };
const colorChoices = ['#FF9A65', '#5AB0A5', '#F9CF58', '#AC9CFF', '#F46B7E'];

export default function EditButtonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch  = useAppDispatch();
  const btn       = useAppSelector(selectButtonById(id || '')); // ‘!’ safe if id valid

  const [label, setLabel]     = useState(btn?.label ?? '');
  const [color, setColor]     = useState(btn?.color ?? colorChoices[0]);
  const [preview, setPreview] = useState(btn?.preview ?? false);
  const names = useButtonNames().filter(n => n !== btn?.label.toLowerCase());

  //if user deleted (or bad id) — navigate out safely
  useEffect(() => {
    if (!btn) router.replace('/buttons');
  }, [btn]);
  if (!btn) return null;  
  
  const onSave = () => {
    dispatch(startLoading());
    setTimeout(()=>dispatch(stopLoading()), 3000);
    if (!label.trim()) { Alert.alert('Label required'); return; }
    if (names.includes(label.trim().toLowerCase())) {
      Alert.alert('Duplicate name', 'Another button already uses this label.');
      return;
    }
    dispatch(updateButton({ id: btn.id, changes:{ label: label.trim(), color, preview }}));
    /* reset local form state so the next visit is blank */
    router.replace('/(tabs)/buttons'); 
  };

  const onDelete = () =>
    Alert.alert('Delete Button?', 'This cannot be undone.', [
      { text:'Cancel', style:'cancel' },
      { text:'Delete', style:'destructive', onPress: () => {
          dispatch(deleteButton(btn.id));
          router.replace('/buttons');          // go back to list
        } },
    ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Button</Text>
      {/* label */}
      <Text style={styles.label}>Label</Text>
      <TextInput value={label} onChangeText={setLabel} style={styles.input} />

      {/* colour */}
      <Text style={styles.label}>Colour</Text>
      <View style={styles.colorRow}>
        {colorChoices.map(hex => (
          <TouchableOpacity key={hex}
            style={[styles.swatch,{ backgroundColor:hex, borderWidth: color===hex?2:0 }]}
            onPress={() => setColor(hex)}
          />
        ))}
      </View>

      {/* preview */}
      <View style={styles.previewRow}>
        <Text style={styles.label}>Preview sound</Text>
        <Switch value={preview} onValueChange={setPreview}
          trackColor={{ false:'#ccc', true:c.accent }} thumbColor="#fff" />
      </View>

      {/* save + delete */}
      <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
        <Feather name="save" size={18} color="#fff" style={{ marginRight:6 }} />
        <Text style={styles.saveTxt}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.delBtn} onPress={onDelete}>
        <Feather name="trash-2" size={16} color="#fff" style={{ marginRight:6 }} />
        <Text style={styles.delTxt}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

/* same style block as Add screen plus delete button colours */
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
  swatch:{ width:42, height:42, borderRadius:21, borderColor:c.navy,
           shadowColor:'#000', shadowOpacity:0.05, shadowRadius:4, shadowOffset:{width:0,height:2} },

  previewRow:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:32 },

  saveBtn:{
    flexDirection:'row', backgroundColor:c.accent, borderRadius:28, height:56,
    alignItems:'center', justifyContent:'center',
    shadowColor:c.accent, shadowOpacity:0.25, shadowRadius:6, shadowOffset:{width:0,height:4},
    elevation:5,
  },
  saveTxt:{ color:'#fff', fontSize:16, fontWeight:'700' },

  delBtn:{
    flexDirection:'row', backgroundColor:'#E85959', borderRadius:28, height:48,
    alignItems:'center', justifyContent:'center', marginTop:16,
  },
  delTxt:{ color:'#fff', fontSize:14, fontWeight:'600' },
});