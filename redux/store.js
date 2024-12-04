

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import taskReducer from "./slices/taskSlice";
import searchReducer from "./slices/searchSlice";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";
import persistStore from "redux-persist/es/persistStore";
import sidebarTabReducer from "./slices/sidebarTabSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: localStorage,
};

const rootReducer = combineReducers({
  category: categoryReducer,
  tasks: taskReducer,
  search: searchReducer,
  sidebar: sidebarTabReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store)
export {store, persistor};