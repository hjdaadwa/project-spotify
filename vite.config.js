import { defineConfig } from "vite";
import { ViteAliases } from "vite-aliases";
import legacy from "@vitejs/plugin-legacy";
import TemplatePlugin from "./plugins/vite-template-plugin";

export default defineConfig({
    build: {
        target: 'es2017',
        outDir: 'dist',
        assetsDir: 'assets',
    },
    server: {
        port: 3000,
        host: '0.0.0.0',
        hmr: true,
    },
    plugins: [
        ViteAliases(),
        TemplatePlugin(),
        legacy({
            targets: ['defaults', 'not IE 11'],
        })
    ],
})