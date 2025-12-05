"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelById } from "@/redux/channelSlice";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { VideoGrid } from "@/components/video/VideoGrid";
import { VideoCardSkeleton } from "@/components/ui/Skeleton";
import { formatViews } from "@/utils/formatters";
import type { RootState } from "@/redux/store";
import { useState } from "react";

export default function ChannelPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { current, videos, loading, error } = useSelector(
        (state: RootState) => state.channel
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"videos" | "about">("videos");

    useEffect(() => {
        if (id) {
            dispatch(fetchChannelById(id as string) as any);
        }
    }, [id, dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
                <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <div className="flex">
                    <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                    <main className="flex-1 p-6 lg:p-8">
                        <div className="animate-pulse space-y-6">
                            <div className="h-48 bg-white/10 rounded-2xl" />
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-white/10 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-6 bg-white/10 rounded w-1/3" />
                                    <div className="h-4 bg-white/10 rounded w-1/4" />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-6">
                                <VideoCardSkeleton count={8} />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    if (error || !current) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
                <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <div className="flex">
                    <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                    <main className="flex-1 p-6 lg:p-8">
                        <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-8 text-center">
                            <p className="text-red-400 text-lg">{error || "Channel not found"}</p>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    const banner = current.brandingSettings?.image?.bannerExternalUrl;
    const avatar = current.snippet.thumbnails.high?.url || current.snippet.thumbnails.medium?.url;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                <main className="flex-1">
                    {/* Channel Banner */}
                    {banner && (
                        <div className="w-full h-48 lg:h-64 overflow-hidden">
                            <img
                                src={banner}
                                alt="Channel banner"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Channel Info */}
                    <div className="px-6 lg:px-8 py-6 border-b border-white/10">
                        <div className="flex items-start gap-6">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                {avatar ? (
                                    <img
                                        src={avatar}
                                        alt={current.snippet.title}
                                        className="w-20 h-20 lg:w-32 lg:h-32 rounded-full border-4 border-white/10"
                                    />
                                ) : (
                                    <div className="w-20 h-20 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-4xl font-bold">
                                        {current.snippet.title.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h1 className="text-2xl lg:text-4xl font-bold text-white mb-2">
                                    {current.snippet.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-4">
                                    <span>{current.snippet.customUrl || `@${current.snippet.title.replace(/\s+/g, "")}`}</span>
                                    <span>•</span>
                                    <span>{formatViews(current.statistics.subscriberCount)} subscribers</span>
                                    <span>•</span>
                                    <span>{formatViews(current.statistics.videoCount)} videos</span>
                                </div>
                                <button className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="px-6 lg:px-8 border-b border-white/10">
                        <div className="flex gap-8">
                            <button
                                onClick={() => setActiveTab("videos")}
                                className={`py-4 px-2 font-medium transition-colors relative ${activeTab === "videos"
                                        ? "text-white"
                                        : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                Videos
                                {activeTab === "videos" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-600" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab("about")}
                                className={`py-4 px-2 font-medium transition-colors relative ${activeTab === "about"
                                        ? "text-white"
                                        : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                About
                                {activeTab === "about" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 lg:px-8 py-8">
                        {activeTab === "videos" ? (
                            <VideoGrid videos={videos} loading={false} />
                        ) : (
                            <div className="max-w-4xl">
                                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                                    <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
                                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                                        {current.snippet.description || "No description available"}
                                    </p>

                                    <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-400 text-sm mb-1">Total Views</p>
                                            <p className="text-white text-lg font-semibold">
                                                {formatViews(current.statistics.viewCount)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm mb-1">Total Videos</p>
                                            <p className="text-white text-lg font-semibold">
                                                {formatViews(current.statistics.videoCount)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
