import { ButtonItem, deleteButton } from '@/features/buttons/buttonSlice';
import { addLog } from '@/features/logs/logsSlice';
import { selectSoundOn } from '@/features/settings/settingsSlice';
import { useScreenLoader } from '@/hooks/useScreenLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { colors as base } from '@/styles/colors';
import { speakLabel } from '@/utils/useTTS';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

/* warm palette reused */
const c = {
  ...base,
  navy:   '#1D203E',
  mint:   '#F4F9F4',
  card:   '#FFFFFF',
  gray:   '#707070',
  accent: base.leafGreen,
};

/* choose white or navy text depending on card colour */
const textColorFor = (hex: string) => {
  /* simple luminance check */
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? '#1D203E' : '#FFFFFF';
};

/* selector — replace with real slice later */
const useButtons = () =>
  useAppSelector(s => (s as any).buttons?.items ?? [
    
  ]);

export default function ButtonsListScreen() {
  const buttons = useButtons();
  const dispatch  = useAppDispatch();
  const soundOn = useAppSelector(selectSoundOn); 
  type RowProps = { item: ButtonItem };
  /* render one row */
  const RenderRow = ({ item }: RowProps) => {
    const txtColor = textColorFor(item.color);

    return (
      <TouchableOpacity
        style={[styles.row, { backgroundColor: item.color }]}
        onPress={() => {
          router.push(`/buttons/${item.id}`)
        }}
        onLongPress={() =>
        Alert.alert('Delete?', `Remove "${item.label}"?`, [
          { text:'Cancel', style:'cancel' },
          { text:'Delete', style:'destructive',
            onPress: () => dispatch(deleteButton(item.id)) },
        ])
        }
      >
        <TouchableOpacity 
          style={styles.circle}
          onPress={() => {
            if (soundOn && item.preview) speakLabel(item.label);
            dispatch(addLog({ label: item.label, ts: Date.now() }));   // 🐾 log it
          }}
        >
          <Feather name="volume-2" size={18} color={txtColor} />
        </TouchableOpacity>
        <Text style={styles.label}>{item.label}</Text>
        <Feather name="chevron-right" size={20} color={txtColor} />
      </TouchableOpacity>
    )};
  useScreenLoader();
  return (
    <View style={styles.container}>
        <FlatList
            data={buttons}
            keyExtractor={b => b.id}
            renderItem={RenderRow}
            contentContainerStyle={buttons.length ? undefined : styles.emptySpace}
            ListEmptyComponent={
            <Text style={styles.emptyTxt}>No buttons yet. Add your first!</Text>
            }
        />
        {/* ➕ Floating Add button */}
        <TouchableOpacity
            style={styles.fab}
            onPress={() => router.push('/buttons/add')}
            >
            <Feather name="plus" size={24} color="#fff" />
        </TouchableOpacity>
    </View>
  );
}

/* ---------------- styles ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: c.cream, paddingTop: 50 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: c.card,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 18,
    borderRadius: 20,
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  circle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: c.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { flex: 1, fontSize: 16, fontWeight: '600' },

  /* empty-state */
  emptySpace: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyTxt:   { color: c.gray, fontSize: 15 },

  /* add button */
  addBtn: {
    flexDirection: 'row',
    backgroundColor: c.accent,
    borderRadius: 28,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginVertical: 26,
    shadowColor: c.accent,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
    addTxt: { color: '#fff', fontSize: 16, fontWeight: '700' },
    fab: {
    position: 'absolute',
    right: 24,
    bottom: 100,          // stays above tab bar
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: c.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: c.accent,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    },
});