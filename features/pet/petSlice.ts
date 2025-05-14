import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PetProfile {
  name: string;
  ageYears: number;
  avatarUri: string | null;
}

const initialState: PetProfile = {
  name: 'Pet',
  ageYears: 0,
  avatarUri: null,
};

const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    updatePet: (state, action: PayloadAction<Partial<PetProfile>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { updatePet } = petSlice.actions;
export default petSlice.reducer;

/* selectors */
export const selectPet = (s: { pet: PetProfile }) => s.pet;