import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authStatus: false,
  alert: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.authStatus = true;
    },
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
});

export const { login, setAuthStatus, setAlert } = userSlice.actions;
export default userSlice.reducer;
