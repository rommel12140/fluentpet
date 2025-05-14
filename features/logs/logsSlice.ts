import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export interface LogItem {
  id: string;
  label: string;
  ts: number;           // unix ms
}

interface LogsState {
  items: LogItem[];
}

const initialState: LogsState = { items: [] };

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    addLog: {
      prepare: (data: Omit<LogItem, 'id'>) => ({ payload: { ...data, id: nanoid() } }),
      reducer: (state, action: PayloadAction<LogItem>) => {
        state.items.unshift(action.payload);     // newest first
      },
    },
    clearLogs: (state) => { state.items = []; },
  },
});

export const { addLog, clearLogs } = logsSlice.actions;
export default logsSlice.reducer;

/* selectors */
export const selectLogs   = (s: { logs: LogsState }) => s.logs.items;
export const selectLatest = (n = 3) =>
  (s: { logs: LogsState }) => s.logs.items.slice(0, n);