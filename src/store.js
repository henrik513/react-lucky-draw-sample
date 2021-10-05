import { configureStore } from '@reduxjs/toolkit';
import countDownReducer from './components/CountDown/countDownSlice';
import participantSlice from './components/Participant/participantSlice';

export default configureStore({
  reducer: {
    countDown: countDownReducer,
    participants: participantSlice,
  },
});