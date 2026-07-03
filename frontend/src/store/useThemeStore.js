import {create} from 'zustand';

// Only two themes: a green and white light theme, and a dark theme
const stored = localStorage.getItem("srm-theme");
const initialTheme = stored === "srmdark" || stored === "srmlight" ? stored : "srmlight";

export const useThemeStore = create((set)=>({
    theme: initialTheme,
    setTheme: (theme) => {
        localStorage.setItem("srm-theme",theme);
        set({theme});
    },
    toggleTheme: () => set((state) => {
        const next = state.theme === "srmdark" ? "srmlight" : "srmdark";
        localStorage.setItem("srm-theme", next);
        return { theme: next };
    }),
}));
