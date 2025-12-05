import axios from "axios";

// Create YouTube API instance
export const youtube = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        key: process.env.NEXT_PUBLIC_YT_KEY,
    },
});
