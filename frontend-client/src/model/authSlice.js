import { createSlice } from "@reduxjs/toolkit";
import {decodeToken} from "react-jwt";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: null,
        userRole: null,
        token: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            const userIdAndRole = decodeToken(state.token).sub.split(",");
            state.userId = userIdAndRole[0];
            state.userRole = userIdAndRole[1];
        },
        logout: (state) => {
            state.token = null;
            state.userId = null;
            state.userRole = null;
        }
    },
});

export const {setToken,setIsLoggedIn, logout } = authSlice.actions;
export const selectUserId = (state) => state.auth.userId;
export const selectUserRole = (state) => state.auth.userRole;
export const selectToken = (state) => state.auth.token;

export default authSlice;