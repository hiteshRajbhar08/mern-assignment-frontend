import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: userInfoFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    login: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    register: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    logout: (state, action) => {
      state.userInfo = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const userReducer = userSlice.reducer;
const userActions = userSlice.actions;

export { userReducer, userActions };
