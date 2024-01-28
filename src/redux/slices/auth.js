import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        signOut(state, action) {
            state.isLoggedIn = false;
            state.token = "";
        }
    }
})

// Reducer
export default slice.reducer;

//
export function LoginUser(formValues) {
    // formValues => {email,password}
    return async (dispatch, getState) => {
        await axios.post("/auth/login", {
            ...formValues
        }, {
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