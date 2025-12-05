"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoById } from "@/redux/singleVideoSlice";
import RelatedVideos from "@/components/RelatedVideos";
import { CustomVideoPlayer } from "@/components/video/CustomVideoPlayer";

export default function SingleVideoPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { current, loading, error, related } = useSelector(
        (state) => state.singleVideo
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchVideoById(id));
        }
    }, [id, dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400 text-lg">Loading video...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md">
                    <p className="text-red-400 text-center text-lg">{error}</p>
                </div>
            </div>
        );
    }

    if (!current) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-400 text-lg">No video found</p>
            </div>
        );
    }

    // Format view count
    const formatViews = (count: string | number) => {
        if (!count) return "0";
        const num = parseInt(count.toString());
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Video Player with Custom Styling */}
                        {/* Video Player with Custom Styling */}
                        <CustomVideoPlayer
                            videoId={id as string}
                            title={current.snippet.title}
                        />

                        {/* Video Info Card */}
                        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
                            {/* Title */}
                            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                                {current.snippet.title}
                            </h1>

                            {/* Stats Row */}
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                {/* Views */}
                                {current.statistics?.viewCount && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">
                                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span className="text-purple-300 font-semibold">
                                            {formatViews(current.statistics.viewCount)} views
                                        </span>
                                    </div>
                                )}

                                {/* Likes */}
                                {current.statistics?.likeCount && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-pink-500/20 rounded-full border border-pink-500/30">
                                        <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                        <span className="text-pink-300 font-semibold">
                                            {formatViews(current.statistics.likeCount)}
                                        </span>
                                    </div>
                                )}

                                {/* Date */}
                                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-blue-300 font-semibold">
                                        {formatDate(current.snippet.publishedAt)}
                                    </span>
                                </div>
                            </div>

                            {/* Channel Info */}
                            <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                                    {current.snippet.channelTitle.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        {current.snippet.channelTitle}
                                    </h3>
                                    <p className="text-sm text-gray-400">Creator</p>
                                </div>
                            </div>

                            {/* Description */}
                            <details className="mt-6 group/details">
                                <summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                                    <span className="font-semibold text-white flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Description
                                    </span>
                                    <svg className="w-5 h-5 text-gray-400 group-open/details:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <div className="mt-4 p-4 bg-black/20 rounded-xl">
                                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                                        {current.snippet.description || "No description available"}
                                    </p>
                                </div>
                            </details>
                        </div>
                    </div>

                    {/* Sidebar - Related Videos */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <RelatedVideos videos={related} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
