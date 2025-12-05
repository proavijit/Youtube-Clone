"use client";

import React from "react";

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
}) => {
    return (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${activeCategory === category
                            ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white border-transparent shadow-lg shadow-purple-500/30"
                            : "bg-white/10 text-white border-white/10 hover:bg-white/20 hover:border-purple-500/50"
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};
