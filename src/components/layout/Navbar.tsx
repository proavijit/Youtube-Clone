"use client";

import React from "react";
import Link from "next/link";
import { SearchBar } from "@/components/search/SearchBar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface NavbarProps {
    onMenuClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
    return (
        <header className="bg-black/30 dark:bg-black/30 backdrop-blur-md border-b border-white/10 dark:border-white/10 sticky top-0 z-50">
            <div className="max-w-[2000px] mx-auto px-4 sm:px-6 py-3">
                <div className="flex items-center gap-4">
                    {/* Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="p-2 hover:bg-white/10 dark:hover:bg-white/10 rounded-lg transition-colors lg:hidden"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent hidden sm:block">
                            YouTube by Avijit Ghosh
                        </h1>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 mx-4">
                        <SearchBar />
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center gap-2">
                        {/* Theme Toggle */}
                        <div className="hidden sm:block">
                            <ThemeToggle />
                        </div>

                        {/* User Avatar */}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-110 transition-transform">
                            U
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
