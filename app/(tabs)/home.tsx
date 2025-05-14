import { logout } from '@/features/auth/authSlice';
import { selectLogs } from '@/features/logs/logsSlice';
import { selectPet } from '@/features/pet/petSlice';
import { useScreenLoader } from '@/hooks/useScreenLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { colors as base } from '@/styles/colors';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

/* ─── palette ─── */
const c = {
  ...base,
  navy: '#1D203E',
  mint: '#F4F9F4',
  gray: '#707070',
  card: '#FFFFFF',
  accent: base.leafGreen,
};

/* ---------- helpers ---------- */
const timeAgo = (ts: number) => {
  const diffM = Math.floor((Date.now() - ts) / 60000);
  if (diffM < 1) return 'now';
  if (diffM === 1) return '1 min';
  if (diffM < 60) return `${diffM} min`;
  const hrs = Math.floor(diffM / 60);
  return hrs === 1 ? '1 hr' : `${hrs} hrs`;
};

const midnight = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  /* ---------- Redux data ---------- */
  const username = useAppSelector(s => s.auth.username) ?? 'friend';
  const pet = useAppSelector(selectPet);
  const logs = useAppSelector(selectLogs);

  /* ---------- Stats ---------- */
  const totalPresses = logs.length;
  const todayPresses = logs.filter(l => l.ts >= midnight()).length;

  /* favourite button */
  const freq: Record<string, number> = {};
  logs.forEach(l => (freq[l.label] = (freq[l.label] || 0) + 1));
  const favLabel = Object.keys(freq).sort((a, b) => freq[b] - freq[a])[0] ?? '—';

  /* recent 3 */
  const recent = logs.slice(0, 3);

  /* ---------- Handlers ---------- */
  const onLogout = () => {
    dispatch(logout());
    router.replace('/');
  };

  /* ---------- Render sub-components ---------- */
  const Stat = (icon: keyof typeof Feather.glyphMap, label: string, val: string | number) => (
    <View style={styles.statBox}>
      <Feather name={icon} size={16} color={c.accent} />
      <Text style={styles.statVal}>{val}</Text>
      <Text style={styles.statLbl}>{label}</Text>
    </View>
  );

  const RecentRow = ({ l, t }: { l: string; t: number }) => (
    <View style={styles.recRow}>
      <Feather name="message-circle" size={16} color={c.accent} />
      <Text style={styles.recTxt}>{l}</Text>
      <Text style={styles.recAgo}>{timeAgo(t)}</Text>
    </View>
  );
  useScreenLoader();
  /* ---------- UI ---------- */
  return (
    <ImageBackground
      source={require('@/assets/images/petspeak-bg.png')}
      resizeMode="repeat"
      style={styles.bg}
    >
      <SafeAreaView style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.sheet}
          showsVerticalScrollIndicator={false}
        >
          {/* header */}
          <View style={styles.topRow}>
            <View>
              <Text style={styles.greet}>Welcome</Text>
              <Text style={styles.name}>{username}</Text>
            </View>
            <TouchableOpacity onPress={onLogout}>
              <Feather name="log-out" size={20} color={c.accent} />
            </TouchableOpacity>
          </View>

          {/* avatar */}
          <View style={styles.avatarRow}>
            <Image
              source={
                pet.avatarUri
                  ? { uri: pet.avatarUri }
                  : require('@/assets/images/sample-dog.png')
              }
              style={styles.avatarImg}
            />
            <View>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petAge}>{pet.ageYears} yrs</Text>
            </View>
          </View>

          {/* stats */}
          <View style={styles.statsRow}>
            {Stat('activity', 'Presses', totalPresses)}
            {Stat('clock', 'Today', todayPresses)}
            {Stat('star', 'Fav Btn', favLabel)}
          </View>

          {/* recent activity */}
          <View style={styles.recCard}>
            <Text style={styles.recTitle}>Recent activity</Text>
            {recent.length === 0 ? (
              <Text style={{ color: c.gray }}>No activity yet.</Text>
            ) : (
              recent.map(r => <RecentRow key={r.id} l={r.label} t={r.ts} />)
            )}
          </View>

          {/* CTA */}
          <TouchableOpacity style={styles.cta} onPress={() => router.push('/buttons')}>
            <Feather name="grid" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.ctaTxt}>View Buttons</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cta} onPress={() => router.push('/history')}>
            <Feather name="clock" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.ctaTxt}>View History</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

/* ---------- styles ---------- */
const SHEET_RADIUS = 28;

const styles = StyleSheet.create({
  bg: { flex: 1 },
  flex: { flex: 1 },

  sheet: {
    backgroundColor: c.card,
    borderTopLeftRadius: SHEET_RADIUS,
    borderTopRightRadius: SHEET_RADIUS,
    marginTop: 75,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
    gap: 24,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -3 },
    elevation: 6,
  },

  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greet: { fontSize: 14, color: c.gray },
  name: { fontSize: 22, fontWeight: '700', color: c.navy },

  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatarImg: { width: 60, height: 60, borderRadius: 30 },
  petName: { fontSize: 17, fontWeight: '700', color: c.navy },
  petAge: { fontSize: 13, color: c.gray },

  statsRow: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  statBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: c.mint,
    borderRadius: 18,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  statVal: { fontSize: 18, fontWeight: '600', color: c.navy, marginTop: 6 },
  statLbl: { fontSize: 12, color: c.gray },

  recCard: {
    backgroundColor: c.mint,
    borderRadius: 18,
    padding: 18,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  recTitle: { fontSize: 15, fontWeight: '600', color: c.navy },
  recRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  recTxt: { flex: 1, fontSize: 14, color: c.navy },
  recAgo: { fontSize: 12, color: c.gray },

  cta: {
    flexDirection: 'row',
    backgroundColor: c.accent,
    borderRadius: 28,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: c.accent,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  ctaTxt: { color: '#fff', fontSize: 16, fontWeight: '700' },
});