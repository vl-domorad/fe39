import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CardListType, CardType } from "../../utils/@globalTypes";

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
};

const initialState: PostState = {
  selectedPost: null,
  isModalPostOpened: false,
  likedPosts: [],
  dislikedPosts: [],
  postsList: [],
  searchedPosts: [],
  searchValue: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getAllPosts: (_, __: PayloadAction<undefined>) => {},
    setAllPosts: (state, action: PayloadAction<CardListType>) => {
      state.postsList = action.payload;
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
    getSearchedPosts: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSearchedPosts: (state, action: PayloadAction<CardListType>) => {
      state.searchedPosts = action.payload;
    },
  },
});

export const {
  setStatus,
  getAllPosts,
  setAllPosts,
  getSearchedPosts,
  setSearchedPosts,
} = postSlice.actions;
export const postName = postSlice.name;
export default postSlice.reducer;

export const PostSelectors = {
  getLikedPosts: (state: RootState) => state.post.likedPosts,
  getDislikedPosts: (state: RootState) => state.post.dislikedPosts,
  getAllPosts: (state: RootState) => state.post.postsList,
  getSearchedPosts: (state: RootState) => state.post.searchedPosts,
  getSearchValue: (state: RootState) => state.post.searchValue,
};
