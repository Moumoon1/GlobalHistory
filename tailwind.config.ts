import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f2933",
        parchment: "#fbf5e7",
        ocean: "#9dd7f0"
      },
      boxShadow: {
        panel: "0 18px 60px rgba(31, 41, 51, 0.14)"
      }
    }
  },
  plugins: []
} satisfies Config;
