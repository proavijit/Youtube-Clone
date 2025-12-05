"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setTheme } from "@/redux/uiSlice";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import type { RootState } from "@/redux/store";

export const ThemeToggle: React.FC = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.ui.theme);

    // Load theme from localStorage on mount
    useEffect(() => {
        const savedTheme = getLocalStorage<"dark" | "light">("theme", "dark");
        dispatch(setTheme(savedTheme));
        applyTheme(savedTheme);
    }, [dispatch]);

    // Apply theme to document
    const applyTheme = (newTheme: "dark" | "light") => {
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const handleToggle = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        dispatch(toggleTheme());
        setLocalStorage("theme", newTheme);
        applyTheme(newTheme);
    };

    return (
        <button
            onClick={handleToggle}
            className="p-2 hover:bg-white/10 dark:hover:bg-white/10 rounded-lg transition-all group"
            aria-label="Toggle theme"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            {theme === "dark" ? (
                // Sun icon for light mode
                <svg
                    className="w-6 h-6 text-gray-300 group-hover:text-yellow-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ) : (
                // Moon icon for dark mode
                <svg
                    className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            )}
        </button>
    );
};
