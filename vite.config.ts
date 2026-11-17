import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Tailwind v4 用 Vite 插件，别用旧的 postcss 配置

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
