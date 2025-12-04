import { ColorTheme, Theme, ThemeEntry } from "./types";
import themesJson from './theme.json';

export const getDefaultColors = (theme: Theme, baseName?: string): ColorTheme => {
    if (Array.isArray(themesJson)) {
        const arr = themesJson as ThemeEntry[];
        const entry = arr.find(e => e.base === baseName) ?? arr.find(e => e.base === 'default') ?? arr[0];
        if (entry && entry.theme) return entry.theme[theme];
    } else if ((themesJson as any)?.dark || (themesJson as any)?.light) {
        return (themesJson as any)[theme] as ColorTheme;
    }

    // 最后兜底值（确保一定存在）
    return {
        base: "#09090b",
        surface: "rgba(39, 39, 42, 0.75)",
        text: "#fafafa",
        subtext: "#a1a1aa",
        accent: "#ffffff",
        glow: "rgba(255, 255, 255, 0.25)"
    };
};

// Local storage helpers for persisting data source URL
export const DATA_SOURCE_KEY = 'doudou:dataSourceUrl';

export const saveDataSourceUrl = (url: string) => {
    try {
        localStorage.setItem(DATA_SOURCE_KEY, url);
    } catch (e) {
        // ignore (e.g., storage disabled)
    }
};

export const loadDataSourceUrl = (): string | null => {
    try {
        return localStorage.getItem(DATA_SOURCE_KEY);
    } catch (e) {
        return null;
    }
};