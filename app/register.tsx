import { login } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { colors as base } from '@/styles/colors';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

/* palette */
const c = { ...base, navy:'#1D203E', mint:'#F4F9F4', card:'#FFFFFF', accent:base.leafGreen };

export default function RegisterScreen() {
  const dispatch = useAppDispatch();

  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [pass, setPass]     = useState('');
  const [confirm, setConf]  = useState('');
  const [secure, setSecure] = useState(true);

  /* --- validation + sign up --- */
  const onSignup = () => {
    if (!name.trim() || !email.trim() || !pass.trim() || !confirm.trim()) {
      Alert.alert('Please fill in all fields');
      return;
    }
    if (pass !== confirm) {
      Alert.alert('Passwords do not match');
      return;
    }
    // you could call an API here; for now we just log the user in
    dispatch(login(name.trim()));
    router.replace('/loading');
  };

  return (
    <SafeAreaView style={styles.flex}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Create Account</Text>

          {/* Name */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Jane Doe"
            placeholderTextColor="#7A7A7A"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="jane@example.com"
            placeholderTextColor="#7A7A7A"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passRow}>
            <TextInput
              placeholder="••••••"
              placeholderTextColor={c.grayText}
              style={[styles.input, { flex:1, marginBottom:0 }]}
              secureTextEntry={secure}
              value={pass}
              onChangeText={setPass}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Feather name={secure ? 'eye' : 'eye-off'} size={18} color={c.grayText} />
            </TouchableOpacity>
          </View>

          {/* Confirm */}
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            placeholder="••••••"
            placeholderTextColor={c.grayText}
            secureTextEntry={secure}
            style={styles.input}
            value={confirm}
            onChangeText={setConf}
          />

          {/* Sign up button */}
          <TouchableOpacity style={styles.cta} onPress={onSignup}>
            <Feather name="user-plus" size={18} color="#fff" style={{ marginRight:6 }} />
            <Text style={styles.ctaTxt}>Sign Up</Text>
          </TouchableOpacity>

          {/* Back to login link */}
          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <Feather name="arrow-left" size={16} color={c.accent} />
            <Text style={styles.backTxt}>Back to Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* -------------- styles -------------- */
const styles = StyleSheet.create({
  flex:{ flex:1, backgroundColor:c.cream },
  container:{ paddingHorizontal:24, paddingTop:24, gap:18 },
  title:{ fontSize:24, fontWeight:'700', color:c.navy, marginBottom:12 },

  label:{ fontSize:14, color:c.grayText },
  input:{
    backgroundColor:c.card, borderRadius:16, padding:14, fontSize:16, color:c.navy,
    shadowColor:'#000', shadowOpacity:0.05, shadowRadius:5, shadowOffset:{width:0,height:2},
  },
  passRow:{ flexDirection:'row', alignItems:'center', gap:10, marginBottom:18 },

  cta:{
    flexDirection:'row', backgroundColor:c.accent, borderRadius:28, height:56,
    alignItems:'center', justifyContent:'center', marginTop:12,
    shadowColor:c.accent, shadowOpacity:0.25, shadowRadius:6, shadowOffset:{width:0,height:4},
    elevation:5,
  },
  ctaTxt:{ color:'#fff', fontSize:16, fontWeight:'700' },

  back:{ flexDirection:'row', alignSelf:'center', marginTop:24, gap:4 },
  backTxt:{ color:c.accent, fontWeight:'600', fontSize:14 },
});