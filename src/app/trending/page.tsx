"use client";

import { useEffect, useState } from "react";
import { youtube } from "@/utils/api";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { VideoGrid } from "@/components/video/VideoGrid";

export default function TrendingPage() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetchTrendingVideos();
    }, []);

    const fetchTrendingVideos = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await youtube.get("videos", {
                params: {
                    part: "snippet,statistics",
                    chart: "mostPopular",
                    regionCode: "US",
                    maxResults: 24,
                },
            });

            setVideos(res.data.items);
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to fetch trending videos";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                <main className="flex-1 p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <span className="text-4xl">🔥</span>
                            Trending
                        </h1>
                        <p className="text-gray-400">
                            Check out what's trending on YouTube today
                        </p>
                    </div>

                    {/* Category Tabs */}
                    <div className="mb-6 flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
                        {["Now", "Music", "Gaming", "Movies", "News"].map((tab) => (
                            <button
                                key={tab}
                                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium text-white whitespace-nowrap transition-all border border-white/10 hover:border-purple-500/50"
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200">
                            <p className="font-medium">⚠️ Error: {error}</p>
                        </div>
                    )}

                    {/* Trending Videos */}
                    <VideoGrid videos={videos} loading={loading} />
                </main>
            </div>
        </div>
    );
}
