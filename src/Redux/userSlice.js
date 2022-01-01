
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    userToken: null,
    activeUser: {}
  },

  reducers: {

    LOGIN: (state, action) => {
      state.userToken = action.payload.userToken

    },

    LOGOUT: (state, action) => {
      state.userToken = null
    },

    ACTIVE_USER: (state, action) => {
      state.activeUser = action.payload.activeUser
    },

  }
});



export const { LOGIN, LOGOUT, ACTIVE_USER } = userSlice.actions;

// Selector
export const selectUserToken = (state) => state.user.userToken;
export const selectActiveUser = (state) => state.user.activeUser;

export default userSlice.reducer;