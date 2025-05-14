import { createSlice } from '@reduxjs/toolkit';
const settingsSlice = createSlice({
  name:'settings',
  initialState:{ sound:true },
  reducers:{ toggleSound:s => { s.sound = !s.sound; } },
});
export const { toggleSound } = settingsSlice.actions;
export default settingsSlice.reducer;
export const selectSoundOn = (s:{settings:{sound:boolean}})=>s.settings.sound;