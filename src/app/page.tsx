"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { youtube } from "@/utils/api";
import { setVideos, setLoading, setError } from "@/redux/videoSlice";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { VideoGrid } from "@/components/video/VideoGrid";
import { CategoryFilter } from "@/components/search/CategoryFilter";
import type { RootState } from "@/redux/store";

const CATEGORIES = [
  "All",
  "Music",
  "Gaming",
  "News",
  "Sports",
  "Education",
  "Entertainment",
  "Technology",
  "Comedy",
  "Movies",
];

export default function Home() {
  const dispatch = useDispatch();
  const { videos, loading, error } = useSelector((state: RootState) => state.video);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchVideos = async (category = "All") => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const query = category === "All" ? "trending" : category;

      const res = await youtube.get("search", {
        params: {
          part: "snippet",
          maxResults: 24,
          q: query,
          type: "video",
          order: "viewCount",
        },
      });

      dispatch(setVideos(res.data.items));
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch videos";
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchVideos(activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:from-gray-900 dark:via-black dark:to-gray-900 bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 backdrop-blur-xl">
              <p className="font-medium">⚠️ Error: {error}</p>
              <p className="text-sm mt-1">
                Please check your API key in the .env file
              </p>
            </div>
          )}

          {/* Category Filters */}
          <div className="mb-8">
            <CategoryFilter
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Video Grid */}
          <VideoGrid videos={videos} loading={loading} />

          {/* Empty State */}
          {!loading && !error && videos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No videos found. Try a different category.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
