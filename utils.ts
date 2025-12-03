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