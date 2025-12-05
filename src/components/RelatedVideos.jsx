"use client";

import Link from "next/link";

const RelatedVideos = ({ videos }) => {
    if (!videos || videos.length === 0) {
        return (
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold mb-4 text-white">Related Videos</h2>
                <p className="text-gray-400">No related videos found</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Related Videos
            </h2>
            <div className="space-y-3">
                {videos.map((video) => {
                    const videoId = video.id?.videoId || video.id;
                    const thumbnail = video.snippet?.thumbnails?.medium?.url ||
                        video.snippet?.thumbnails?.default?.url ||
                        video.snippet?.thumbnails?.high?.url;

                    return (
                        <Link
                            key={videoId}
                            href={`/video/${videoId}`}
                            className="flex gap-3 hover:bg-white/10 rounded-xl p-2 transition-all duration-300 group"
                        >
                            {/* Thumbnail */}
                            <div className="flex-shrink-0 w-40 aspect-video rounded-lg overflow-hidden bg-gray-800 relative">
                                {thumbnail ? (
                                    <img
                                        src={thumbnail}
                                        alt={video.snippet?.title || "Video thumbnail"}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                                        <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Video Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium line-clamp-2 text-sm mb-1 text-white group-hover:text-purple-300 transition-colors">
                                    {video.snippet?.title || "Untitled Video"}
                                </h3>
                                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                                    {video.snippet?.channelTitle || "Unknown Channel"}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default RelatedVideos;
