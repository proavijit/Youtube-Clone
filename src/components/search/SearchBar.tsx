"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { debounce } from "@/utils/debounce";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import axios from "axios";

interface SearchBarProps {
    onSearch?: (query: string) => void;
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    placeholder = "Search",
}) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Load recent searches on mount
    useEffect(() => {
        const recent = getLocalStorage<string[]>("recentSearches", []);
        setRecentSearches(recent);
    }, []);

    // Fetch search suggestions
    const fetchSuggestions = async (query: string) => {
        if (!query.trim()) {
            setSuggestions([]);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.get(
                `https://suggestqueries.google.com/complete/search`,
                {
                    params: {
                        client: "firefox",
                        ds: "yt",
                        q: query,
                    },
                }
            );

            if (response.data && response.data[1]) {
                setSuggestions(response.data[1].slice(0, 8));
            }
        } catch (error) {
            console.error("Failed to fetch suggestions:", error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Debounced suggestion fetcher
    const debouncedFetchSuggestions = useRef(
        debounce(fetchSuggestions, 300)
    ).current;

    useEffect(() => {
        if (searchQuery) {
            debouncedFetchSuggestions(searchQuery);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setIsLoading(false);
        }
    }, [searchQuery]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const saveToRecentSearches = (query: string) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        let recent = getLocalStorage<string[]>("recentSearches", []);

        // Remove if already exists
        recent = recent.filter((item) => item !== trimmedQuery);

        // Add to beginning
        recent.unshift(trimmedQuery);

        // Keep only last 10
        recent = recent.slice(0, 10);

        setLocalStorage("recentSearches", recent);
        setRecentSearches(recent);
    };

    const handleSearch = (query: string) => {
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
            saveToRecentSearches(trimmedQuery);
            setShowSuggestions(false);
            setSearchQuery(trimmedQuery);

            if (onSearch) {
                onSearch(trimmedQuery);
            } else {
                router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(searchQuery);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion);
        handleSearch(suggestion);
    };

    const handleRecentSearchClick = (search: string) => {
        setSearchQuery(search);
        handleSearch(search);
    };

    const clearRecentSearches = () => {
        setLocalStorage("recentSearches", []);
        setRecentSearches([]);
    };

    const removeRecentSearch = (search: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const updated = recentSearches.filter((item) => item !== search);
        setLocalStorage("recentSearches", updated);
        setRecentSearches(updated);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const totalItems = searchQuery ? suggestions.length : recentSearches.length;

        if (!showSuggestions || totalItems === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < totalItems - 1 ? prev + 1 : prev
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0) {
                    const items = searchQuery ? suggestions : recentSearches;
                    handleSuggestionClick(items[selectedIndex]);
                } else {
                    handleSearch(searchQuery);
                }
                break;
            case "Escape":
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
        }
    };

    const displayItems = searchQuery ? suggestions : recentSearches;
    const showDropdown = showSuggestions && (displayItems.length > 0 || isLoading);

    return (
        <div ref={searchRef} className="relative flex-1 max-w-2xl">
            <form onSubmit={handleSubmit}>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder={placeholder}
                        className="w-full pl-12 pr-24 py-2.5 sm:py-3 bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-full text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery("");
                                setSuggestions([]);
                            }}
                            className="absolute right-20 sm:right-24 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                    <button
                        type="submit"
                        className="absolute right-1 top-1/2 -translate-y-1/2 px-3 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all text-sm sm:text-base flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="hidden sm:inline">Search</span>
                    </button>
                </div>
            </form>

            {/* Suggestions Dropdown */}
            {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/98 dark:bg-gray-900/98 backdrop-blur-xl border border-white/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[400px] overflow-y-auto">
                    {isLoading ? (
                        <div className="px-6 py-4 flex items-center gap-3 text-gray-400">
                            <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm">Loading suggestions...</span>
                        </div>
                    ) : (
                        <>
                            {/* Recent Searches Header */}
                            {!searchQuery && recentSearches.length > 0 && (
                                <div className="px-6 py-3 flex items-center justify-between border-b border-white/10">
                                    <span className="text-sm font-medium text-gray-400">Recent searches</span>
                                    <button
                                        onClick={clearRecentSearches}
                                        className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                                    >
                                        Clear all
                                    </button>
                                </div>
                            )}

                            {/* Suggestions/Recent Searches List */}
                            {displayItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(item)}
                                    className={`w-full px-6 py-3 text-left flex items-center gap-3 transition-colors group ${index === selectedIndex
                                            ? "bg-purple-500/20 text-white"
                                            : "text-gray-300 hover:bg-white/10"
                                        }`}
                                >
                                    <svg
                                        className={`w-4 h-4 flex-shrink-0 ${searchQuery ? "text-gray-500" : "text-purple-400"
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        {searchQuery ? (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        ) : (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        )}
                                    </svg>
                                    <span className="flex-1 truncate">{item}</span>
                                    {!searchQuery && (
                                        <button
                                            onClick={(e) => removeRecentSearch(item, e)}
                                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all"
                                            title="Remove"
                                        >
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </button>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
