import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'participants',
  initialState: [],
  reducers: (state, action) => {
      setParticipant : (state, action) => {
          state = action.payload;
      }
  },
});

export const { setParticipant } = slice.actions;

export const selectParticipants = state => state.participants;

export default slice.reducer;
