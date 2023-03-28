import { CardListType } from "src/utils/@globalTypes";

export type AllPostsResponse = {
  count: number;
  next: string;
  previous: string;
  results: CardListType;
};

export type SignUpUserResponse = {
  username: string;
  email: string;
  id: number;
};

export type SignInResponse = {
  access: string;
  refresh: string;
};

export type UserInfoResponse = {
  "username": string,
  "id": number,
  "email": string
};