import { selectPet, updatePet } from '@/features/pet/petSlice';
import { useScreenLoader } from '@/hooks/useScreenLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { colors as base } from '@/styles/colors';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const c = { ...base, navy:'#1D203E', card:'#FFFFFF', accent:base.leafGreen };

export default function PetProfile() {
  const dispatch = useAppDispatch();
  const pet      = useAppSelector(selectPet);

  const [name, setName]   = useState(pet.name);
  const [age,  setAge]    = useState(String(pet.ageYears));
  const [avatarUri, setAvatarUri] = useState<string | null>(pet.avatarUri);

  const pickImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
        Alert.alert('Permission needed', 'Camera roll permission is required.');
        return;
      }
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });
      if (!res.canceled) {
        setAvatarUri(res.assets[0].uri);
      }
    };

  const onSave = () => {
    const num = parseFloat(age);
    if (!name.trim() || isNaN(num)) return;
    dispatch(updatePet({ name: name.trim(), ageYears: num, avatarUri }));
    router.back();
  };
  useScreenLoader();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Pet Profile</Text>
      <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.photoPreview} />
        ) : (
          <Feather name="camera" size={24} color={c.accent} />
        )}
        <Text style={styles.photoTxt}>{avatarUri ? 'Change photo' : 'Add photo'}</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Age (years)</Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
        <Feather name="save" size={18} color="#fff" style={{ marginRight:6 }} />
        <Text style={styles.saveTxt}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:c.cream, paddingHorizontal:24, paddingTop:50 },
  title:{ fontSize:22, fontWeight:'700', color:c.navy, marginBottom:22 },
  label:{ fontSize:14, color:'#727272', marginBottom:6 },
  input:{
    backgroundColor:c.card, borderRadius:16, padding:14, fontSize:16, color:c.navy,
    shadowColor:'#000', shadowOpacity:0.05, shadowRadius:5, shadowOffset:{width:0,height:2},
    marginBottom:20,
  },
  saveBtn:{
    flexDirection:'row', backgroundColor:c.accent, borderRadius:28, height:56,
    alignItems:'center', justifyContent:'center',
    shadowColor:c.accent, shadowOpacity:0.25, shadowRadius:6, shadowOffset:{width:0,height:4},
    elevation:5,
  },
  saveTxt:{ color:'#fff', fontSize:16, fontWeight:'700' },
  photoBtn:{ alignItems:'center', marginBottom:24 },
  photoPreview:{ width:80, height:80, borderRadius:40, marginBottom:8 },
  photoTxt:{ fontSize:14, color:c.accent },
});