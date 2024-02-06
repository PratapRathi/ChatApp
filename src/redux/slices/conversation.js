import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

const user_id = window.localStorage.getItem("user_id");


const initialState = {
    direct_chat: {
        conversation: [],
        current_conversation: null,
        current_messages: [],
    }
}


const slice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        updateCurrentConversation(state, action) {
            console.log(action.payload.selected_conversation);
            state.direct_chat.current_conversation = action.payload.selected_conversation;
        },
        updateCurrentMessages(state, action) {
            state.direct_chat.current_messages = action.payload.selected_messages;
        },
        fetchDirectConversation(state, action) {
            const list = action.payload.conversations.map((el) => {
                const this_user = el.participants.find((elm) => elm._id.toString() !== user_id);
                return {
                    id: el._id,
                    user_id: this_user._id,
                    name: `${this_user.firstName} ${this_user.lastName}`,
                    online: this_user.status === "online",
                    img: faker.image.avatar(),
                    msg: faker.music.songName(),
                    time: "9:36",
                    unread: 0,
                    pinned: false,
                }
            })
            state.direct_chat.conversation = list;
        },

        updateDirectConversation(state, action) {
            const this_conversation = action.payload.conversation;
            state.direct_chat.conversation = state.direct_chat.conversation.map((el) => {
                if (el._id !== this_conversation._id) {
                    return el;
                }
                else {
                    const this_user = this_conversation.participants.find((elm) => elm._id.toString() !== user_id);
                    return {
                        id: this_conversation._id,
                        user_id: this_user._id,
                        name: `${this_user.firstName} ${this_user.lastName}`,
                        online: this_user.status === "online",
                        img: faker.image.avatar(),
                        msg: faker.music.songName(),
                        time: "9:36",
                        unread: 0,
                        pinned: false,
                    }
                }
            })
        },

        addDirectConversation(state, action) {
            const this_conversation = action.payload.conversation;
            const this_user = this_conversation.participants.find((elm) => elm._id.toString() !== user_id);
            state.direct_chat.conversation.push({
                id: this_conversation._id,
                user_id: this_user._id,
                name: `${this_user.firstName} ${this_user.lastName}`,
                online: this_user.status === "online",
                img: faker.image.avatar(),
                msg: faker.music.songName(),
                time: "9:36",
                unread: 0,
                pinned: false,
            })
        },

        addNewTextMessage(state, action) {
            const {from, text} = action.payload.message;
            const conversation_id = action.payload.conversation_id;
            const newMsg = {
                type: "msg",
                message: text,
                incoming: user_id !== from,
                outgoing: user_id === from,
              }
            if(state.direct_chat.current_conversation.id === conversation_id){
                state.direct_chat.current_messages = [...state.direct_chat.current_messages, newMsg];
            }
        }
    }
})


export default slice.reducer;


export const UpdateCurrentConversation = ({ selected_conversation }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateCurrentConversation({ selected_conversation }));
    }
}

export const UpdateCurrentMessages = ({ selected_messages }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateCurrentMessages({ selected_messages }));
    }
}

export const FetchDirectConversation = ({ conversations }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchDirectConversation({ conversations }));
    }
}

export const AddDirectConversation = ({ conversation }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addDirectConversation({ conversation }));
    }
}

export const UpdateDirectConversation = ({ conversation }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateDirectConversation({ conversation }));
    }
}

export const AddNewTextMessage = ({conversation_id, message}) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addNewTextMessage({conversation_id, message}));
    }
}