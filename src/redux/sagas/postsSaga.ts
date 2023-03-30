import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import {
  getAllPosts,
  getSearchedPosts,
  setAllPosts,
  setSearchedPosts,
} from "../reducers/postSlice";
import API from "../api";
import { AllPostsResponse } from "./@types";
import { PayloadAction } from "@reduxjs/toolkit";

function* getAllPostsWorker() {
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
    API.getPosts
  );
  if (ok && data) {
    yield put(setAllPosts(data.results));
  } else {
    console.warn("Error getting all posts", problem);
  }
}

function* getSearchedPostsWorker(action: PayloadAction<string>) {
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
    API.getPosts,
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
