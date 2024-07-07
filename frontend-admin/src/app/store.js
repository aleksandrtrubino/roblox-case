import { configureStore } from "@reduxjs/toolkit";


import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {baseApi} from "./baseApi";
import authSlice from "../model/authSlice";

const authReducer = persistReducer({key: 'auth', storage}, authSlice.reducer)


export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(authSlice.middleware),
});

export const persistor = persistStore(store)