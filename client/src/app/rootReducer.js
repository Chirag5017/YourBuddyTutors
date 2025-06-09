import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import { authApi } from "./api/authApi";
import { courseApi } from "./api/courseApi.js";

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    auth:authReducer
})

export default rootReducer
