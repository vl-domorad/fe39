import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import { getAllPosts, setAllPosts } from "../reducers/postSlice";
import API from "../api";
import { AllPostsResponse } from "./@types";

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

export default function* postsSaga() {
  yield all([takeLatest(getAllPosts, getAllPostsWorker)]);
}
