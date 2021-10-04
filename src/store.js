import { configureStore } from '@reduxjs/toolkit';
import countDownReducer from './components/CountDown/countDownSlice';

export default configureStore({
  reducer: {
    countDown: countDownReducer,
  },
});