// userSlice.js
import {createSlice} from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  email: '', // Initial email state
};

// Create userSlice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmailAdd(state, action) {
      state.email = action.payload;
      localStorage.setItem('email', state.email);
    },
    clearEmail(state) {
      state.email = '';
    },
  },
});

// Export actions
export const {setEmailAdd, clearEmail} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
