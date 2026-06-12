import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    accessToken: null,
    loading: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}
})





















