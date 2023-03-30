import { create } from "apisauce";
import {
  ActivateUserData,
  SignInUserData,
  UserPayloadData,
} from "src/redux/reducers/@types";

const API = create({
  baseURL: "https://studapi.teachmeskills.by",
});

const getPosts = (search?: string) => {
  return API.get("/blog/posts/", { limit: 12, search });
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

export default {
  getPosts,
  getSinglePost,
  signUpUser,
  activateUser,
  signInUser,
  getUserInfo,
  verifyToken,
  refreshToken,
};
