import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  getAllPosts,
  getSearchedPosts,
  setAllPosts,
  setSearchedPosts,
} from "../reducers/postSlice";
import API from "../api";
import { AllPostsResponse } from "./@types";
import { GetAllPostsPayload } from "src/redux/reducers/@types";

function* getAllPostsWorker(action: PayloadAction<GetAllPostsPayload>) {
  const { offset } = action.payload;
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
    API.getPosts,
    offset
  );
  if (ok && data) {
    yield put(setAllPosts({ cardList: data.results, postsCount: data.count }));
  } else {
    console.warn("Error getting all posts", problem);
  }
}

function* getSearchedPostsWorker(action: PayloadAction<string>) {
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
    API.getPosts,
    0,
    action.payload
  );
  if (ok && data) {
    yield put(setSearchedPosts(data.results));
  } else {
    console.warn("Error getting all posts", problem);
  }
}

export default function* postsSaga() {
  yield all([
    takeLatest(getAllPosts, getAllPostsWorker),
    takeLatest(getSearchedPosts, getSearchedPostsWorker),
  ]);
}
