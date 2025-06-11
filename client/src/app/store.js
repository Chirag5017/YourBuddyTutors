import { configureStore } from "@reduxjs/toolkit";
import rootRedcuer from "./rootReducer";
import { authApi } from "./api/authApi";
import { courseApi } from "./api/courseApi";
import { purchaseApi } from "./api/purchaseApi";
import { courseProgressApi } from "./api/courseProgress";

export const appStore = configureStore({
    reducer: rootRedcuer,
    middleware:(defaultMiddleware) => 
        defaultMiddleware().concat(
            authApi.middleware,
            courseApi.middleware,
            purchaseApi.middleware,
            courseProgressApi.middleware
        )

})

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();
