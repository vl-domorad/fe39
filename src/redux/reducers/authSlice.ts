import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import {
  SignUpUserPayload,
  ActivateUserPayload,
  SignInUserPayload,
  ResetPasswordPayload,
  NewPasswordPayload,
} from "./@types";
import { ACCESS_TOKEN_KEY } from "src/utils/constants";
import { UserInfoResponse } from "src/redux/sagas/@types";

const initialState: any = {
  isLoggedIn: !!localStorage.getItem(ACCESS_TOKEN_KEY),
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},
    activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},
    signInUser: (_, __: PayloadAction<SignInUserPayload>) => {},
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    logoutUser: (_, __: PayloadAction<undefined>) => {},
    getUserInfo: (_, __: PayloadAction<undefined>) => {},
    setUserInfo: (state, action: PayloadAction<UserInfoResponse | null>) => {
      state.userInfo = action.payload;
    },
    resetPassword: (_, __: PayloadAction<ResetPasswordPayload>) => {},
    newPassword: (_, __: PayloadAction<NewPasswordPayload>) => {},
  },
});

export const {
  signUpUser,
  activateUser,
  signInUser,
  setLoggedIn,
  logoutUser,
  setUserInfo,
  getUserInfo,
  resetPassword,
  newPassword,
} = authSlice.actions;
export default authSlice.reducer;

export const AuthSelectors = {
  getLoggedIn: (state: RootState) => state.auth.isLoggedIn,
};
