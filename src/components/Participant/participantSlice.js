import { createSlice, nanoid } from '@reduxjs/toolkit'

export const participantSlice = createSlice({
  name: 'participants',
  initialState: [] ,
  reducers: {
      addParticipant : {
        reducer: (state, action) => {
          state.push(action.payload)
        },
        prepare: (name, avatar, uid) => {
          const id = nanoid();
          return { payload: { id, name, avatar, uid}}
        }
      },
      reset : {
        reducer : (state) => {
          state = [];
        }
      }
  },
});

export const { addParticipant, reset } = participantSlice.actions;

export const selectParticipants = state => state.participants;

export default participantSlice.reducer;

