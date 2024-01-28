import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app"
import authreducer from "./slices/auth";

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
})

export { rootPersistConfig, rootReducer }