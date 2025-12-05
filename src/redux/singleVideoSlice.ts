import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { youtube } from "@/utils/api";

interface VideoSnippet {
    title: string;
    description: string;
    channelTitle: string;
    channelId: string;
    publishedAt: string;
    tags?: string[];
    categoryId?: string;
}

interface VideoStatistics {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
}

interface Video {
    id: string;
    snippet: VideoSnippet;
    statistics?: VideoStatistics;
}

interface SingleVideoState {
    current: Video | null;
    loading: boolean;
    error: string | null | undefined;
    related: any[];
}

export const fetchVideoById = createAsyncThunk(
    "singleVideo/fetch",
    async (id: string) => {
        // Fetch the main video
        const videoRes = await youtube.get("videos", {
            params: {
                part: "snippet,statistics,contentDetails",
                id,
            },
        });

        const currentVideo = videoRes.data.items[0];

        // Fetch related videos using search API
        let relatedVideos = [];
        try {
            const searchQuery = currentVideo.snippet.tags?.[0] || currentVideo.snippet.title;
            const relatedRes = await youtube.get("search", {
                params: {
                    part: "snippet",
                    type: "video",
                    q: searchQuery,
                    maxResults: 10,
                    videoCategoryId: currentVideo.snippet.categoryId,
                },
            });
            relatedVideos = relatedRes.data.items.filter(
                (video: any) => video.id.videoId !== id
            );
        } catch (error) {
            console.error("Failed to fetch related videos:", error);
        }

        return {
            current: currentVideo,
            related: relatedVideos,
        };
    }
);

const initialState: SingleVideoState = {
    current: null,
    loading: false,
    error: null,
    related: [],
};

const slice = createSlice({
    name: "singleVideo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideoById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVideoById.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload.current;
                state.related = action.payload.related;
            })
            .addCase(fetchVideoById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default slice.reducer;
