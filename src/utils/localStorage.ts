/**
 * LocalStorage utility functions with error handling
 */

/**
 * Get item from localStorage
 * @param key - Storage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns Parsed value or default
 */
export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;

    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
        return defaultValue;
    }
};

/**
 * Set item in localStorage
 * @param key - Storage key
 * @param value - Value to store
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
    }
};

/**
 * Remove item from localStorage
 * @param key - Storage key
 */
export const removeLocalStorage = (key: string): void => {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error);
    }
};

/**
 * Clear all localStorage
 */
export const clearLocalStorage = (): void => {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.clear();
    } catch (error) {
        console.error("Error clearing localStorage:", error);
    }
};
