import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#ff385c",
        canvas: "#f6f7fb",
        elevated: "#ffffff",
        ink: "#222222",
        line: "#e8e8e8",
        muted: "#717171",
        ocean: "#dbe7ee",
        panel: "#ffffff",
        parchment: "#ffffff",
        rosewash: "#fff1f4",
        surface: "#f1f3f6",
        surfaceHover: "#e9edf2"
      },
      boxShadow: {
        panel: "0 12px 34px rgba(34, 34, 34, 0.09)",
        soft: "0 4px 16px rgba(34, 34, 34, 0.08)"
      }
    }
  },
  plugins: []
} satisfies Config;
