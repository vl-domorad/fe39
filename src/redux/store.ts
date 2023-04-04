import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

import themeReducer from "./reducers/themeSlice";
import authReducer from "./reducers/authSlice";
import postReduces, { postName } from "./reducers/postSlice";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  theme: themeReducer,
  [postName]: postReduces,
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export let persistor = persistStore(store)

export default store;
