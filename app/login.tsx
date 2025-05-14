import { login } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { colors } from '@/styles/colors';
import { Feather } from '@expo/vector-icons';
import { Redirect, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');
const HERO_H = height * 0.38;
const RADIUS = 26;
const FIELD_H = 54;
const ACCENT = '#2F7A4E';
const ERR    = '#D04848';

export default function LoginScreen() {
  const dispatch   = useAppDispatch();
  const isLoggedIn = useAppSelector(s => s.auth.isLoggedIn);
  const router     = useRouter();

  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [secure, setSecure]     = useState(true);
  const [focus, setFocus] = useState<'n' | 'p' | null>(null);
  const [error, setError]       = useState<string | null>(null);

  if (isLoggedIn) return <Redirect href="/loading" />;

  const handleLogin = () => {
    setError(null);                                               

    if (!name.trim() || !pass) {                                  // empty check
      setError('Email and password are required');
      return;
    }

    if (name !== 'Demo Rommel' || pass !== 'demo123') {       // fake auth
      setError('Invalid email or password');
      return;
    }

    name.trim() && pass.trim() && dispatch(login(name.trim()));
    router.replace('/loading');   // 4-s “Preparing Pets” screen
  };

  return (
    <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>    
            <ScrollView
              contentContainerStyle={styles.scroll}
              keyboardShouldPersistTaps="handled"
            >
              {/* Hero */}
              <ImageBackground
                source={require('@/assets/images/paws-tile.png')}
                resizeMode="repeat"
                style={[styles.hero, { height: HERO_H }]}
              />

              {/* Card */}
              <View style={styles.card}>
                <Text style={styles.title}>Welcome To PetSpeaks!</Text>
                {error && (                                                     /* banner */
                    <View style={styles.errBox}>
                      <Feather name="alert-circle" size={16} color="#fff" />
                      <Text style={styles.errTxt}>{error}</Text>
                    </View>
                )}
                <View style={[styles.field, focus === 'n' && styles.focus]}>
                  <Feather name="user" size={18} color={colors.leafDark} />
                  <TextInput
                    placeholder="Full Name"
                    placeholderTextColor="#7A7A7A"
                    style={[styles.input, error && !name && styles.inputErr]}
                    value={name}
                    onChangeText={setName}
                    onFocus={() => setFocus('n')}
                    onBlur={() => setFocus(null)}
                  />
                </View>

                <View style={[styles.field, focus === 'p' && styles.focus]}>
                  <Feather name="lock" size={18} color={colors.leafDark} />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#7A7A7A"
                    secureTextEntry={secure}
                    style={[styles.input, { flex:1 }, error && !pass && styles.inputErr]}
                    value={pass}
                    onChangeText={setPass}
                    onFocus={() => setFocus('p')}
                    onBlur={() => setFocus(null)}
                  />
                  <TouchableOpacity onPress={() => setSecure(!secure)}>
                    <Feather name={secure ? 'eye' : 'eye-off'} size={18} color="#888" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                  <Text style={styles.btnTxt}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.footer}>
                  Don’t have an account?{' '}
                  <Text style={styles.link} onPress={() => router.push('/register')}>
                    Sign up
                  </Text>
                </Text>
                <Text style={[styles.footer, {color: "red"}]}>
                    **NOTE:**
                </Text>
                <Text style={[styles.footer, {color: "red"}]}>
                    **This is a prototype of Rommel Gallofin for interview purposes**
                </Text>
              </View>
            
            </ScrollView>
          
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll:    { flexGrow: 1 },

  hero:      { width: '100%' },

  card: {
    flex: 1,                                 // fills all remaining space
    marginTop: -40,                          // overlap hero 20 px
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
    backgroundColor: 'rgba(255,255,255,0.96)',
    paddingHorizontal: 26,
    paddingTop: 34,
    gap: 22,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -3 },
    elevation: 6,
  },
  errBox:{
    flexDirection:'row', alignItems:'center', gap:6,
    backgroundColor:ERR, padding:10, borderRadius:12, marginBottom:20,
  },
  errTxt:{ color:'#fff', fontSize:13, flex:1 },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.leafDark,
    textAlign: 'center',
  },

  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.leafMint,
    borderRadius: 18,
    paddingHorizontal: 16,
    height: FIELD_H,
    gap: 10,
  },
  focus: { borderWidth: 1.5, borderColor: colors.leafGreen },

  input: { flex: 1, fontSize: 16, color: colors.textDark },
  inputErr:{ borderColor:ERR }, 
  btn: {
    height: FIELD_H,
    backgroundColor: colors.leafGreen,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.leafGreen,
    shadowOpacity: 0.28,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  btnTxt: { color: '#fff', fontSize: 17, fontWeight: '600' },

  footer: { fontSize: 14, textAlign: 'center' },
  link:   { color: colors.leafGreen, fontWeight: '600' },
});