import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  loginStatus: false,
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      state.loginStatus = !!action.payload;
    },
    logoutUser: (state) => {
      state.userData = null;
      state.loginStatus = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;