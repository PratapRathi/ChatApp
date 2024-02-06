import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app"
import authreducer from "./slices/auth";
import conversationReducer from "./slices/conversation";

// slices

const rootPersistConfig = {
    key: "root",
    storage,
    keyPrefix: "redux-",
    // whitelist: [],
    // blacklist: [],
}

const rootReducer = combineReducers({
    app: appReducer,
    auth: authreducer,
    conversation: conversationReducer,
})

export { rootPersistConfig, rootReducer }