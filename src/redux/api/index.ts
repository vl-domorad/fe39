import { create } from "apisauce";
import {
  ActivateUserData,
  NewPasswordData,
  ResetPasswordData,
  SignInUserData,
  UserPayloadData,
} from "src/redux/reducers/@types";
import { PER_PAGE } from "src/utils/constants";

const API = create({
  baseURL: "https://studapi.teachmeskills.by",
});

const getPosts = (offset: number, search?: string) => {
  return API.get("/blog/posts/", { limit: PER_PAGE, search, offset });
};

const getSinglePost = (id: string) => {
  return API.get(`/blog/posts/${id}/`);
};

const signUpUser = (data: UserPayloadData) => {
  return API.post("/auth/users/", data);
};

const activateUser = (data: ActivateUserData) => {
  return API.post("/auth/users/activation/", data);
};

const signInUser = (data: SignInUserData) => {
  return API.post("/auth/jwt/create/", data);
};

const getUserInfo = (token: string) => {
  return API.get(
    "/auth/users/me/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const verifyToken = (token: string) => {
  return API.post("/auth/jwt/verify/", { token });
};

const refreshToken = (refresh: string) => {
  return API.post("/auth/jwt/refresh/", { refresh });
};

const addPost = (token: string, data: any) => {
  return API.post("/blog/posts/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

const resetPassword = (data: ResetPasswordData) => {
  return API.post("/auth/users/reset_password/", data);
};

const newPassword = (data: NewPasswordData) => {
  return API.post("/auth/users/reset_password_confirm/", data);
};

export default {
  getPosts,
  getSinglePost,
  signUpUser,
  activateUser,
  signInUser,
  getUserInfo,
  verifyToken,
  refreshToken,
  addPost,
  resetPassword,
  newPassword
};
