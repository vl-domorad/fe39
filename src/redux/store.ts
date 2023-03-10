import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./reducers/themeSlice";
import postReduces, { postName } from "./reducers/postSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    [postName]: postReduces,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
