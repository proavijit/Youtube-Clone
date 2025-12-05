import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./videoSlice";
import searchReducer from "./searchSlice";
import singleVideoReducer from "./singleVideoSlice";
import channelReducer from "./channelSlice";
import uiReducer from "./uiSlice";
import historyReducer from "./historySlice";

export const store = configureStore({
    reducer: {
        video: videoReducer,
        search: searchReducer,
        singleVideo: singleVideoReducer,
        channel: channelReducer,
        ui: uiReducer,
        history: historyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
