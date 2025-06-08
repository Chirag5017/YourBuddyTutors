import { configureStore } from "@reduxjs/toolkit";
import rootRedcuer from "./rootReducer";
import { authApi } from "./api/authApi";

const store = configureStore({
    reducer: rootRedcuer,
    middleware:(defaultMiddleware) => 
        defaultMiddleware().concat(authApi.middleware)

})

export default store;