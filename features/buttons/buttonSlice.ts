import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

/* ---------- Types ---------- */
export interface ButtonItem {
  id: string;
  label: string;
  color: string;      // hex
  preview: boolean;   // play sound on press?
}

/* ---------- Initial state ---------- */
interface ButtonsState {
  items: ButtonItem[];
}

const initialState: ButtonsState = {
  items: [],
};

/* ---------- Slice ---------- */
const buttonsSlice = createSlice({
  name: 'buttons',
  initialState,
  reducers: {
    addButton: {
      prepare: (data: Omit<ButtonItem, 'id'>) => ({
        payload: { ...data, id: nanoid() },
      }),
      reducer: (state, action: PayloadAction<ButtonItem>) => {
        state.items.push(action.payload);
      },
    },

    deleteButton: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(b => b.id !== action.payload);
    },

    updateButton: (
      state,
      action: PayloadAction<{
        id: string;
        changes: Partial<Omit<ButtonItem, 'id'>>;
      }>
    ) => {
      const btn = state.items.find(b => b.id === action.payload.id);
      if (btn) Object.assign(btn, action.payload.changes);
    },
  },
});

export const { addButton, deleteButton, updateButton } = buttonsSlice.actions;
export default buttonsSlice.reducer;

/* ---------- Selectors ---------- */
export const selectButtons = (state: { buttons: ButtonsState }) => state.buttons.items;
export const selectButtonById = (id: string) => (state: { buttons: ButtonsState }) =>
  state.buttons.items.find(b => b.id === id);