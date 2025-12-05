"use client";

import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { VideoCard } from "@/components/video/VideoCard";
import { clearHistory } from "@/redux/historySlice";
import type { RootState } from "@/redux/store";
import { useState } from "react";

export default function LikedVideosPage() {
    const { likedVideos } = useSelector((state: RootState) => state.history);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();

    // In a real app, you'd fetch full video details for liked video IDs
    // For now, we'll show a message

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                <main className="flex-1 p-6 lg:p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                                <span className="text-4xl">👍</span>
                                Liked Videos
                            </h1>
                            <p className="text-gray-400">
                                {likedVideos.length} video{likedVideos.length !== 1 ? "s" : ""} liked
                            </p>
                        </div>
                    </div>

                    {likedVideos.length === 0 ? (
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
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-400 mb-2">
                                No liked videos yet
                            </h3>
                            <p className="text-gray-500">
                                Videos you like will appear here
                            </p>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                            <p className="text-gray-300 text-center">
                                You have {likedVideos.length} liked video{likedVideos.length !== 1 ? "s" : ""}.
                                <br />
                                <span className="text-sm text-gray-500 mt-2 block">
                                    Full video details will be displayed here in the complete implementation.
                                </span>
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
