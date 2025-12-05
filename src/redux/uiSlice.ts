import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
    theme: "dark" | "light";
    sidebarOpen: boolean;
}

const initialState: UIState = {
    theme: "dark",
    sidebarOpen: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<"dark" | "light">) => {
            state.theme = action.payload;
        },
        toggleTheme: (state) => {
            state.theme = state.theme === "dark" ? "light" : "dark";
        },
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload;
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
    },
});

export const { setTheme, toggleTheme, setSidebarOpen, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
