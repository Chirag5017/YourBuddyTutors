import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import { authApi } from "./api/authApi";
import { courseApi } from "./api/courseApi.js";
import { purchaseApi } from "./api/purchaseApi.js";
import { courseProgressApi } from "./api/courseProgress.js";

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    auth:authReducer
})

export default rootReducer
