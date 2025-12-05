"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { youtube } from "@/utils/api";
import { setVideos, setLoading, setError } from "@/redux/videoSlice";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { VideoGrid } from "@/components/video/VideoGrid";
import type { RootState } from "@/redux/store";
import { useState } from "react";

function SearchPageContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const dispatch = useDispatch();
    const { videos, loading, error } = useSelector((state: RootState) => state.video);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (query) {
            fetchSearchResults(query);
        }
    }, [query]);

    const fetchSearchResults = async (searchQuery: string) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            const res = await youtube.get("search", {
                params: {
                    part: "snippet",
                    maxResults: 24,
                    q: searchQuery,
                    type: "video",
                },
            });

            dispatch(setVideos(res.data.items));
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to fetch search results";
            dispatch(setError(errorMessage));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                <main className="flex-1 p-6 lg:p-8">
                    {/* Search Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Search results for: <span className="text-purple-400">"{query}"</span>
                        </h1>
                        <p className="text-gray-400">
                            {!loading && videos.length > 0 && `${videos.length} results found`}
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
                        {["All", "Today", "This Week", "This Month", "This Year"].map((filter) => (
                            <button
                                key={filter}
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium text-white whitespace-nowrap transition-all border border-white/10"
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200">
                            <p className="font-medium">⚠️ Error: {error}</p>
                        </div>
                    )}

                    {/* Results */}
                    <VideoGrid videos={videos} loading={loading} layout="list" />
                </main>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400 text-lg">Loading search...</p>
                </div>
            </div>
        }>
            <SearchPageContent />
        </Suspense>
    );
}
