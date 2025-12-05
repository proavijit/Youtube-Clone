"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
    const pathname = usePathname();

    const menuItems = [
        {
            section: "Main",
            items: [
                { icon: "🏠", label: "Home", href: "/" },
                { icon: "🔥", label: "Trending", href: "/trending" },
                { icon: "🎵", label: "Music", href: "/category/music" },
                { icon: "🎮", label: "Gaming", href: "/category/gaming" },
                { icon: "📰", label: "News", href: "/category/news" },
                { icon: "⚽", label: "Sports", href: "/category/sports" },
            ],
        },
        {
            section: "Library",
            items: [
                { icon: "🕐", label: "History", href: "/history" },
                { icon: "👍", label: "Liked Videos", href: "/liked" },
                { icon: "⏰", label: "Watch Later", href: "/watch-later" },
            ],
        },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:sticky top-0 left-0 h-screen
          bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl
          border-r border-white/10
          transition-transform duration-300 ease-in-out
          z-50 lg:z-0
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-64 lg:w-56 xl:w-64
        `}
            >
                <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {/* Close button for mobile */}
                    <div className="lg:hidden p-4 flex justify-end">
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Menu Sections */}
                    <nav className="px-3 pb-6 space-y-6">
                        {menuItems.map((section) => (
                            <div key={section.section}>
                                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    {section.section}
                                </h3>
                                <ul className="space-y-1">
                                    {section.items.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                onClick={onClose}
                                                className={`
                          flex items-center gap-4 px-3 py-2.5 rounded-lg
                          transition-all duration-200
                          ${isActive(item.href)
                                                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-l-4 border-purple-500"
                                                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                                                    }
                        `}
                                            >
                                                <span className="text-xl">{item.icon}</span>
                                                <span className="font-medium text-sm">{item.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-white/10">
                        <p className="text-xs text-gray-500">
                            © 2025 YouTube Clone
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                            Built with Next.js by Avijit
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
};
