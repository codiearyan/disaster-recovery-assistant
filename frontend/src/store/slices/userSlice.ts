import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDetails {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  username: string | null;
  imageUrl: string;
}

interface UserState {
  authStatus: boolean;
  alert: boolean;
  userDetails: UserDetails | null;
}

const initialState: UserState = {
  authStatus: false,
  alert: false,
  userDetails: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.authStatus = action.payload;
    },
    setAlert: (state, action: PayloadAction<boolean>) => {
      state.alert = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
    },
  },
});

export const { setAuthStatus, setAlert, setUserDetails, clearUserDetails } =
  userSlice.actions;
export default userSlice.reducer;
