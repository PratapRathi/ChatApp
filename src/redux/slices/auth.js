import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false,
    email: "",
    error: false
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateIsLoading(state, action) {
            state.error = action.payload.error;
            state.isLoading = action.payload.isLoading
        },
        login(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        signOut(state, action) {
            state.isLoggedIn = false;
            state.token = "";
            state.email = "";
        },
        updateRegisterEmail(state, action) {
            state.email = action.payload.email;
        }
    }
})

// Reducer
export default slice.reducer;

//
export function LoginUser(formValues) {
    // formValues => {email,password}
    return async (dispatch, getState) => {
        await axios.post("/auth/login", {...formValues}, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(response){
            dispatch(slice.actions.login({isLoggedIn:true, token:response.data.token}));
            console.log(response);
        }).catch(function(error){
            console.log(error);
        })
    }
}

export function LogoutUser(){
    return async (dispatch, getState) => {
        dispatch(slice.actions.signOut());
    }
}

export function ForgotPassword(formValues){
    return async (dispatch, getState) => {
        await axios.post("/auth/forgot-password",{...formValues}, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
    }
}


export function NewPassword(formValues){
    return async (dispatch, getState) => {
        await axios.post("/auth/reset-password",{...formValues},{
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response)=>{
            dispatch(slice.actions.login({isLoggedIn:true, token:response.data.token}));
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
    }
}

export function RegisterUser(formValues){
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateIsLoading({isLoading: true, error: false}));
        await axios.post("/auth/register",{...formValues},{
            headers:{
                "Content-Type": "application/json"
            }
        }).then((response)=>{
            console.log(response);
            dispatch(slice.actions.updateRegisterEmail({email:formValues.email}));
            dispatch(slice.actions.updateIsLoading({isLoading: false, error: false}));
        }).catch((error)=>{
            console.log(error)
            dispatch(slice.actions.updateIsLoading({isLoading: false, error: true}));
        }).finally(()=>{
            if(!getState().auth.error){
                window.location.href = "/auth/verify-otp"
            }
        })
    }
}


export function VerifyEmail(formValues){
    return async (dispatch,getState) => {
        await axios.post("/auth/verify-otp",{...formValues},{
            headers:{
                "Content-Type": "application/json"
            }
        }).then((response)=>{
            dispatch(slice.actions.login({isLoggedIn:true, token:response.data.token}));
            console.log(response);
        }).catch((error)=>{
            console.log(error)
        })
    }
}