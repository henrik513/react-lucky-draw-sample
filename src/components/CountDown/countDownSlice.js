import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'countDown',
  initialState: {
    value: 0,
    progress: false
  },
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    }
  },
});

export const { setValue, setProgress } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.countDown.value;
export const selectProgress = state => state.countDown.progress;

export default slice.reducer;
