import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'not-authenticated', // checking, not-authenticated, auththenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload })=>{
            state.status = 'auththenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        loggout: (state, { payload })=>{
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload.errorMessage;
        },
        checkingCredentials:(state, action)=>{
            state.status = 'checking'
        }
    }
})

export const { login, loggout, checkingCredentials } = authSlice.actions;

export const authReducer = authSlice.reducer;