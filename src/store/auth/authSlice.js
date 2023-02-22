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
        login: (state, action)=>{

        },
        loggout: (state, action)=>{
            
        },
        checkingCredentials:(state, action)=>{
            state.status = 'checking'
        }
    }
})

export const { login, loggout, checkingCredentials } = authSlice.actions;

export const authReducer = authSlice.reducer;