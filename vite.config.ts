
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),           // Siempre primero react
    tailwindcss(),     // Luego tailwind
    tsconfigPaths(),   // Finalmente los paths de TS
  ],
});
