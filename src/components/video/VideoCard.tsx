"use client";

import React from "react";
import Link from "next/link";
import { formatViews, formatRelativeTime } from "@/utils/formatters";

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
        channelId?: string;
    };
    statistics?: {
        viewCount?: string;
    };
}

interface VideoCardProps {
    video: Video;
    layout?: "grid" | "list";
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, layout = "grid" }) => {
    const videoId = typeof video.id === "string" ? video.id : video.id.videoId;
    const thumbnail =
        video.snippet.thumbnails.medium?.url ||
        video.snippet.thumbnails.high?.url ||
        video.snippet.thumbnails.default?.url;

    if (layout === "list") {
        return (
            <Link
                href={`/video/${videoId}`}
                className="flex gap-4 group hover:bg-white/5 rounded-xl p-3 transition-all duration-300"
            >
                {/* Thumbnail */}
                <div className="relative flex-shrink-0 w-60 aspect-video rounded-xl overflow-hidden bg-gray-800">
                    {thumbnail ? (
                        <img
                            src={thumbnail}
                            alt={video.snippet.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                    ) : (
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                            <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white line-clamp-2 group-hover:text-purple-400 transition-colors mb-2">
                        {video.snippet.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-1">{video.snippet.channelTitle}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        {video.statistics?.viewCount && (
                            <>
                                <span>{formatViews(video.statistics.viewCount)} views</span>
                                <span>•</span>
                            </>
                        )}
                        <span>{formatRelativeTime(video.snippet.publishedAt)}</span>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link
            href={`/video/${videoId}`}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
        >
            {/* Thumbnail */}
            <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-lg mb-3 bg-gray-800">
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={video.snippet.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                        <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Info */}
            <div className="px-1">
                <h3 className="font-semibold text-white line-clamp-2 group-hover:text-purple-400 transition-colors mb-2">
                    {video.snippet.title}
                </h3>
                <p className="text-gray-400 text-sm mb-1 line-clamp-1">
                    {video.snippet.channelTitle}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    {video.statistics?.viewCount && (
                        <>
                            <span>{formatViews(video.statistics.viewCount)} views</span>
                            <span>•</span>
                        </>
                    )}
                    <span>{formatRelativeTime(video.snippet.publishedAt)}</span>
                </div>
            </div>
        </Link>
    );
};
