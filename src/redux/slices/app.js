import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { UpdateCurrentConversation } from "./conversation";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", // can be CONTACT, STARRED, SHARED
    },
    snackbar: {
        open: false,
        severity: null,
        message: null,
    },
    users: [],
    friends: [],
    friendRequests: [],
    chat_type: null,
    room_id: null,
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // Toggle & Update Sidebar Reducers
        toggleSidebar(state, action) {
            state.sidebar.open = !state.sidebar.open;
        },
        updateSidebarType(state, action) {
            state.sidebar.type = action.payload.type;
        },
        // Open & Close Alert-Snackbar Reducers
        openSnackbar(state, action) {
            state.snackbar.open = true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackbar(state, action) {
            state.snackbar.open = false;
            state.snackbar.severity = null;
            state.snackbar.message = null;
        },
        // 
        updateUsers(state,action) {
            state.users = action.payload.users;
        },
        updateFriends(state,action) {
            state.friends = action.payload.friends;
        },
        updateFriendRequests(state,action) {
            state.friendRequests = action.payload.request;
        },
        selectConversation(state,action){
            state.chat_type= "individual";
            state.room_id= action.payload.room_id;
        }
    }
})

// Reducer
export default slice.reducer;


// Toggle sidebar visible=invisible
export function ToggleSidebar() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.toggleSidebar())
    }
}

// Update Sidebar type
export function UpdateSidebarType(type) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateSidebarType({ type }))
    }
}

// Open Snackbar Alert
export function openSnackbar(severity, message) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.openSnackbar({severity, message}));
        setTimeout(()=>{
            dispatch(slice.actions.closeSnackbar());
        },4000)
    }
}

// Close Snackbar Alert
export function closeSnackbar() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.closeSnackbar());
    }
}

// Fetch all users in app
export function fetchUsers(){
    return async (dispatch, getState) => {
        await axios.get("user/get-users", {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${getState().auth.token}`
            }
        }).then((response)=>{
            console.log(response);
            dispatch(slice.actions.updateUsers({users: response.data.data}))
        }).catch((error)=>{
            console.log(error)
        })
    }
}

// Fetch Friends
export function fetchFriends(){
    return async (dispatch, getState) => {
        await axios.get("user/get-friends", {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${getState().auth.token}`
            }
        }).then((response)=>{
            console.log(response);
            dispatch(slice.actions.updateFriends({friends: response.data.data}))
        }).catch((error)=>{
            console.log(error)
        })
    }
}

// Fetch Friend-Requests
export function fetchRequests(){
    return async (dispatch, getState) => {
        await axios.get("user/get-friends-request", {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${getState().auth.token}`
            }
        }).then((response)=>{
            console.log(response);
            dispatch(slice.actions.updateFriendRequests({request: response.data.data}))
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const SelectConversation = ({room_id}) => {
    return async(dispatch, getState) => {
        dispatch(slice.actions.selectConversation({room_id}));
        const selected_conversation = getState().conversation.direct_chat.conversation.filter((el)=> el.id===room_id)[0];
        dispatch(UpdateCurrentConversation({selected_conversation}));
    }
}