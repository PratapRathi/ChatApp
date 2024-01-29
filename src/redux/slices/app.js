import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", // can be CONTACT, STARRED, SHARED
    },
    snackbar: {
        open: false,
        severity: null,
        message: null,
    }
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // Toggle Sidebar
        toggleSidebar(state, action) {
            state.sidebar.open = !state.sidebar.open;
        },
        updateSidebarType(state, action) {
            state.sidebar.type = action.payload.type;
        },
        // Open Snackbar
        openSnackbar(state, action) {
            state.snackbar.open = true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackbar(state, action) {
            state.snackbar.open = false;
            state.snackbar.severity = null;
            state.snackbar.message = null;
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