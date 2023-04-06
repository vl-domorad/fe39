import { takeLatest, all, call, put, takeLeading } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  addNewPost,
  getAllPosts,
  getSearchedPosts,
  setAllPosts,
  setAllPostsLoading,
  setSearchedPosts,
} from "../reducers/postSlice";
import API from "../api";
import { AllPostsResponse } from "./@types";
import {
  AddPostPayload,
  GetAllPostsPayload,
  GetSearchPostsPayload,
} from "src/redux/reducers/@types";
import callCheckingAuth from "src/redux/sagas/callCheckingAuth";

function* getAllPostsWorker(action: PayloadAction<GetAllPostsPayload>) {
  yield put(setAllPostsLoading(true));
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
  yield put(setAllPostsLoading(false));
}

function* getSearchedPostsWorker(action: PayloadAction<GetSearchPostsPayload>) {
  const { searchValue, isOverwrite, offset } = action.payload;
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
    API.getPosts,
    offset,
    searchValue
  );
  if (ok && data) {
    yield put(
      setSearchedPosts({
        cardList: data.results,
        postsCount: data.count,
        isOverwrite,
      })
    );
  } else {
    console.warn("Error getting all posts", problem);
  }
}

function* addNewPostWorker(action: PayloadAction<AddPostPayload>) {
  const { data, callback } = action.payload;
  const { ok, problem }: ApiResponse<undefined> = yield callCheckingAuth(
    API.addPost,
    data
  );
  if (ok) {
    callback();
  } else {
    console.warn("Error adding post", problem);
  }
}

export default function* postsSaga() {
  yield all([
    takeLatest(getAllPosts, getAllPostsWorker),
    takeLeading(getSearchedPosts, getSearchedPostsWorker),
    takeLatest(addNewPost, addNewPostWorker),
  ]);
}
