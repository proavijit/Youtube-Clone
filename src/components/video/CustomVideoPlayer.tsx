"use client";

import React from "react";

interface CustomVideoPlayerProps {
    videoId: string;
    title: string;
}

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
    videoId,
    title,
}) => {
    return (
        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
                style={{
                    border: 'none',
                }}
            />
        </div>
    );
};
