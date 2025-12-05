import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { youtube } from "@/utils/api";

interface Channel {
    id: string;
    snippet: {
        title: string;
        description: string;
        customUrl?: string;
        thumbnails: {
            default?: { url: string };
            medium?: { url: string };
            high?: { url: string };
        };
    };
    statistics: {
        subscriberCount: string;
        videoCount: string;
        viewCount: string;
    };
    brandingSettings?: {
        image?: {
            bannerExternalUrl?: string;
        };
    };
}

interface ChannelState {
    current: Channel | null;
    videos: any[];
    loading: boolean;
    error: string | null;
}

const initialState: ChannelState = {
    current: null,
    videos: [],
    loading: false,
    error: null,
};

export const fetchChannelById = createAsyncThunk(
    "channel/fetchById",
    async (channelId: string) => {
        // Fetch channel details
        const channelRes = await youtube.get("/channels", {
            params: {
                part: "snippet,statistics,brandingSettings",
                id: channelId,
            },
        });

        // Fetch channel videos
        const videosRes = await youtube.get("/search", {
            params: {
                part: "snippet",
                channelId: channelId,
                order: "date",
                type: "video",
                maxResults: 24,
            },
        });

        return {
            channel: channelRes.data.items[0],
            videos: videosRes.data.items,
        };
    }
);

const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        clearChannel: (state) => {
            state.current = null;
            state.videos = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannelById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChannelById.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload.channel;
                state.videos = action.payload.videos;
            })
            .addCase(fetchChannelById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch channel";
            });
    },
});

export const { clearChannel } = channelSlice.actions;
export default channelSlice.reducer;
