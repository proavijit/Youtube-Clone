"use client";

import { useSelector } from "react-redux";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import type { RootState } from "@/redux/store";
import { useState } from "react";

export default function WatchLaterPage() {
    const { watchLater } = useSelector((state: RootState) => state.history);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                <main className="flex-1 p-6 lg:p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <span className="text-4xl">⏰</span>
                            Watch Later
                        </h1>
                        <p className="text-gray-400">
                            {watchLater.length} video{watchLater.length !== 1 ? "s" : ""} saved
                        </p>
                    </div>

                    {watchLater.length === 0 ? (
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
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-400 mb-2">
                                No videos saved
                            </h3>
                            <p className="text-gray-500">
                                Videos you save for later will appear here
                            </p>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                            <p className="text-gray-300 text-center">
                                You have {watchLater.length} video{watchLater.length !== 1 ? "s" : ""} saved for later.
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
