import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Every surface uses Times New Roman per the product brief
        serif: ['"Times New Roman"', 'Times', 'serif'],
        sans: ['"Times New Roman"', 'Times', 'serif'],
      },
      boxShadow: {
        // Soft, Apple-like elevation
        soft: "0 10px 40px -12px rgba(16, 40, 24, 0.18)",
        glass: "0 8px 32px -8px rgba(16, 40, 24, 0.25)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        srmlight: {
          "primary": "#16a34a",
          "primary-content": "#ffffff",
          "secondary": "#22c55e",
          "secondary-content": "#04250f",
          "accent": "#0f9d58",
          "accent-content": "#ffffff",
          "neutral": "#1f2a24",
          "neutral-content": "#f5faf6",
          "base-100": "#ffffff",
          "base-200": "#f4faf5",
          "base-300": "#e6f2e9",
          "base-content": "#12211a",
          "info": "#0ea5e9",
          "success": "#16a34a",
          "warning": "#f59e0b",
          "error": "#ef4444",
          "--rounded-box": "1.25rem",
          "--rounded-btn": "0.9rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--border-btn": "1px",
        },
      },
      {
        srmdark: {
          "primary": "#4ade80",
          "primary-content": "#04250f",
          "secondary": "#22c55e",
          "secondary-content": "#04250f",
          "accent": "#34d399",
          "accent-content": "#04250f",
          "neutral": "#132018",
          "neutral-content": "#e7f6ec",
          "base-100": "#0d1611",
          "base-200": "#111e17",
          "base-300": "#18271e",
          "base-content": "#e7f6ec",
          "info": "#38bdf8",
          "success": "#4ade80",
          "warning": "#fbbf24",
          "error": "#f87171",
          "--rounded-box": "1.25rem",
          "--rounded-btn": "0.9rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--border-btn": "1px",
        },
      },
    ],
    darkTheme: "srmdark",
  },
};
