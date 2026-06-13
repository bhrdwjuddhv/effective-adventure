import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
            state.error = null;
        },

        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },

        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },

        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },

        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    setUser,
    setAccessToken,
    logout,
    clearError,
} = authSlice.actions;

export default authSlice.reducer;