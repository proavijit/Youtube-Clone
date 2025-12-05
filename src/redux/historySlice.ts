import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

interface HistoryVideo {
    id: string;
    title: string;
    channelTitle: string;
    thumbnail: string;
    watchedAt: string;
}

interface HistoryState {
    watchHistory: HistoryVideo[];
    likedVideos: string[];
    watchLater: string[];
}

const initialState: HistoryState = {
    watchHistory: getLocalStorage("watchHistory", []),
    likedVideos: getLocalStorage("likedVideos", []),
    watchLater: getLocalStorage("watchLater", []),
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        addToHistory: (state, action: PayloadAction<HistoryVideo>) => {
            // Remove if already exists
            state.watchHistory = state.watchHistory.filter(
                (v) => v.id !== action.payload.id
            );
            // Add to beginning
            state.watchHistory.unshift(action.payload);
            // Keep only last 100
            if (state.watchHistory.length > 100) {
                state.watchHistory = state.watchHistory.slice(0, 100);
            }
            setLocalStorage("watchHistory", state.watchHistory);
        },
        clearHistory: (state) => {
            state.watchHistory = [];
            setLocalStorage("watchHistory", []);
        },
        toggleLikedVideo: (state, action: PayloadAction<string>) => {
            const index = state.likedVideos.indexOf(action.payload);
            if (index > -1) {
                state.likedVideos.splice(index, 1);
            } else {
                state.likedVideos.push(action.payload);
            }
            setLocalStorage("likedVideos", state.likedVideos);
        },
        toggleWatchLater: (state, action: PayloadAction<string>) => {
            const index = state.watchLater.indexOf(action.payload);
            if (index > -1) {
                state.watchLater.splice(index, 1);
            } else {
                state.watchLater.push(action.payload);
            }
            setLocalStorage("watchLater", state.watchLater);
        },
    },
});

export const {
    addToHistory,
    clearHistory,
    toggleLikedVideo,
    toggleWatchLater,
} = historySlice.actions;
export default historySlice.reducer;
