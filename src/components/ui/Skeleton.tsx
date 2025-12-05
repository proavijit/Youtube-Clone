"use client";

import React from "react";

interface SkeletonProps {
    className?: string;
    variant?: "rectangular" | "circular" | "text";
    width?: string | number;
    height?: string | number;
    animation?: "pulse" | "wave";
}

export const Skeleton: React.FC<SkeletonProps> = ({
    className = "",
    variant = "rectangular",
    width,
    height,
    animation = "pulse",
}) => {
    const baseClasses = "bg-white/10";
    const animationClasses = animation === "pulse" ? "animate-pulse" : "animate-shimmer";

    const variantClasses = {
        rectangular: "rounded-lg",
        circular: "rounded-full",
        text: "rounded",
    };

    const style: React.CSSProperties = {
        width: width || "100%",
        height: height || (variant === "text" ? "1em" : "100%"),
    };

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${animationClasses} ${className}`}
            style={style}
        />
    );
};

// Video Card Skeleton
export const VideoCardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => {
    return (
        <>
            {[...Array(count)].map((_, i) => (
                <div key={i} className="space-y-3">
                    {/* Thumbnail */}
                    <Skeleton className="aspect-video w-full" />

                    {/* Title */}
                    <div className="space-y-2">
                        <Skeleton variant="text" height={16} width="90%" />
                        <Skeleton variant="text" height={16} width="70%" />
                    </div>

                    {/* Channel info */}
                    <div className="flex items-center gap-2">
                        <Skeleton variant="circular" width={36} height={36} />
                        <div className="flex-1 space-y-2">
                            <Skeleton variant="text" height={12} width="50%" />
                            <Skeleton variant="text" height={12} width="40%" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

// Video Player Skeleton
export const VideoPlayerSkeleton: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Player */}
            <Skeleton className="aspect-video w-full rounded-2xl" />

            {/* Title */}
            <div className="space-y-2">
                <Skeleton variant="text" height={24} width="80%" />
                <Skeleton variant="text" height={24} width="60%" />
            </div>

            {/* Stats */}
            <div className="flex gap-4">
                <Skeleton width={100} height={32} className="rounded-full" />
                <Skeleton width={80} height={32} className="rounded-full" />
                <Skeleton width={120} height={32} className="rounded-full" />
            </div>

            {/* Channel */}
            <div className="flex items-center gap-4">
                <Skeleton variant="circular" width={48} height={48} />
                <div className="flex-1 space-y-2">
                    <Skeleton variant="text" height={16} width="30%" />
                    <Skeleton variant="text" height={12} width="20%" />
                </div>
            </div>
        </div>
    );
};

// Comment Skeleton
export const CommentSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
    return (
        <>
            {[...Array(count)].map((_, i) => (
                <div key={i} className="flex gap-3">
                    <Skeleton variant="circular" width={40} height={40} />
                    <div className="flex-1 space-y-2">
                        <Skeleton variant="text" height={12} width="30%" />
                        <Skeleton variant="text" height={14} width="90%" />
                        <Skeleton variant="text" height={14} width="70%" />
                    </div>
                </div>
            ))}
        </>
    );
};
