import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CardListType, CardType } from "src/utils/@globalTypes";
import {
  GetAllPostsPayload,
  SetAllPostsPayload,
  AddPostPayload,
  GetSearchPostsPayload,
  SetSearchedPostsPayload,
} from "src/redux/reducers/@types";

export enum LikeStatus {
  Like = "like",
  Dislike = "dislike",
}

type PostState = {
  selectedPost: CardType | null;
  isModalPostOpened: boolean;
  likedPosts: CardListType;
  dislikedPosts: CardListType;
  postsList: CardListType;
  searchedPosts: CardListType;
  searchValue: string;
  postsCount: number;
  searchedPostsCount: number;
  isAllPostsLoading: boolean;
};

const initialState: PostState = {
  selectedPost: null,
  isModalPostOpened: false,
  likedPosts: [],
  dislikedPosts: [],
  postsList: [],
  searchedPosts: [],
  searchValue: "",
  postsCount: 0,
  searchedPostsCount: 0,
  isAllPostsLoading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getAllPosts: (_, __: PayloadAction<GetAllPostsPayload>) => {},
    setAllPosts: (
      state,
      { payload: { postsCount, cardList } }: PayloadAction<SetAllPostsPayload>
    ) => {
      state.postsList = cardList;
      state.postsCount = postsCount;
    },
    setAllPostsLoading: (state, action: PayloadAction<boolean>) => {
      state.isAllPostsLoading = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<CardType | null>) => {
      state.selectedPost = action.payload;
    },
    setStatus(
      state,
      action: PayloadAction<{ status: LikeStatus; card: CardType }>
    ) {
      const { status, card } = action.payload;

      const likedIndex = state.likedPosts.findIndex(
        (post) => post.id === card.id
      );
      const dislikedIndex = state.dislikedPosts.findIndex(
        (post) => post.id === card.id
      );

      const isLike = status === LikeStatus.Like;

      const mainKey = isLike ? "likedPosts" : "dislikedPosts";
      const secondaryKey = isLike ? "dislikedPosts" : "likedPosts";
      const mainIndex = isLike ? likedIndex : dislikedIndex;
      const secondaryIndex = isLike ? dislikedIndex : likedIndex;

      if (mainIndex === -1) {
        state[mainKey].push(card);
      } else {
        state[mainKey].splice(mainIndex, 1);
      }

      if (secondaryIndex > -1) {
        state[secondaryKey].splice(secondaryIndex, 1);
      }
    },
    getSearchedPosts: (state, action: PayloadAction<GetSearchPostsPayload>) => {
      state.searchValue = action.payload.searchValue;
    },
    setSearchedPosts: (
      state,
      action: PayloadAction<SetSearchedPostsPayload>
    ) => {
      const { isOverwrite, cardList, postsCount } = action.payload;
      state.searchedPostsCount = postsCount;
      if (isOverwrite) {
        state.searchedPosts = cardList;
      } else {
        state.searchedPosts.push(...cardList);
      }
    },
    addNewPost: (_, __: PayloadAction<AddPostPayload>) => {},
  },
});

export const {
  setStatus,
  getAllPosts,
  setAllPosts,
  getSearchedPosts,
  setSearchedPosts,
  addNewPost,
  setAllPostsLoading,
} = postSlice.actions;
export const postName = postSlice.name;
export default postSlice.reducer;

export const PostSelectors = {
  getLikedPosts: (state: RootState) => state.post.likedPosts,
  getDislikedPosts: (state: RootState) => state.post.dislikedPosts,
  getAllPosts: (state: RootState) => state.post.postsList,
  getSearchedPosts: (state: RootState) => state.post.searchedPosts,
  getSearchValue: (state: RootState) => state.post.searchValue,
  getAllPostsCount: (state: RootState) => state.post.postsCount,
  getAllPostsLoading: (state: RootState) => state.post.isAllPostsLoading,
  getSearchedPostsCount: (state: RootState) => state.post.searchedPostsCount,
};
