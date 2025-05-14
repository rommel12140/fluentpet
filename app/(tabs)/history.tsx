import { clearLogs, selectLogs } from '@/features/logs/logsSlice';
import { useScreenLoader } from '@/hooks/useScreenLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { colors as base } from '@/styles/colors';
import { Feather } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const c = { ...base, navy:'#1D203E', mint:'#F4F9F4', card:'#FFFFFF', accent:base.leafGreen };

export default function HistoryScreen() {
  const logs     = useAppSelector(selectLogs);
  const dispatch = useAppDispatch();

  const Row = ({ item }: { item: typeof logs[0] }) => (
    <View style={styles.row}>
      <Feather name="message-circle" size={16} color={c.accent} />
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.time}>{timeAgo(item.ts)}</Text>
    </View>
  );
  useScreenLoader();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>

      <FlatList
        data={logs}
        keyExtractor={i => i.id}
        renderItem={Row}
        contentContainerStyle={logs.length ? undefined : styles.emptySpace}
        ListEmptyComponent={<Text style={styles.empty}>No activity yet.</Text>}
      />

      {logs.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={() => dispatch(clearLogs())}>
          <Feather name="trash-2" size={16} color="#fff" style={{ marginRight:6 }} />
          <Text style={styles.clearTxt}>Clear History</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/* helper */
const timeAgo = (ts: number) => {
  const diff = Math.floor((Date.now() - ts) / 60000);     // minutes
  if (diff < 1)  return 'now';
  if (diff === 1) return '1 min';
  if (diff < 60) return `${diff} min`;
  const hrs = Math.floor(diff / 60);
  return hrs === 1 ? '1 hr' : `${hrs} hrs`;
};

/* styles */
const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:c.cream, padding:24, paddingTop: 50 },
  title:{ fontSize:22, fontWeight:'700', color:c.navy, marginBottom:18 },

  row:{
    flexDirection:'row', alignItems:'center', gap:10,
    backgroundColor:c.card, borderRadius:18, padding:16, marginBottom:14,
    shadowColor:'#000', shadowOpacity:0.05, shadowRadius:6, shadowOffset:{width:0,height:2},
  },
  label:{ flex:1, fontSize:16, fontWeight:'600', color:c.navy },
  time:{ fontSize:12, color:c.grayText },

  emptySpace:{ flex:1, justifyContent:'center', alignItems:'center' },
  empty:{ color:c.grayText, fontSize:15 },

  clearBtn:{
    flexDirection:'row', alignSelf:'center', marginTop:12,
    backgroundColor:'#E85959', borderRadius:24, paddingHorizontal:24, paddingVertical:12,
  },
  clearTxt:{ color:'#fff', fontSize:14, fontWeight:'600' },
});