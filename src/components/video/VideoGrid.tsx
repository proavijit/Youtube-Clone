"use client";

import React from "react";
import { VideoCard } from "./VideoCard";
import { VideoCardSkeleton } from "../ui/Skeleton";

interface Video {
    id: {
        videoId?: string;
    } | string;
    snippet: {
        title: string;
        channelTitle: string;
        publishedAt: string;
        thumbnails: {
            medium?: { url: string };
            high?: { url: string };
            default?: { url: string };
        };
    };
    statistics?: {
        viewCount?: string;
    };
}

interface VideoGridProps {
    videos: Video[];
    loading?: boolean;
    layout?: "grid" | "list";
    skeletonCount?: number;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
    videos,
    loading = false,
    layout = "grid",
    skeletonCount = 12,
}) => {
    if (loading) {
        return (
            <div
                className={
                    layout === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        : "space-y-4"
                }
            >
                <VideoCardSkeleton count={skeletonCount} />
            </div>
        );
    }

    if (!videos || videos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <svg
                    className="w-24 h-24 text-gray-600 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                </svg>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No videos found</h3>
                <p className="text-gray-500">Try a different search term or browse trending videos</p>
            </div>
        );
    }

    return (
        <div
            className={
                layout === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    : "space-y-4"
            }
        >
            {videos.map((video) => {
                const videoId = typeof video.id === "string" ? video.id : video.id.videoId;
                return <VideoCard key={videoId} video={video} layout={layout} />;
            })}
        </div>
    );
};
