import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import fs from 'fs';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// Read package.json
const pkgPath = path.resolve(__dirname, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

// Custom plugin to emit package.json (version only to save bandwidth/security)
const emitPackageJsonPlugin = () => {
    return {
        name: 'emit-package-json',
        generateBundle() {
            this.emitFile({
                type: 'asset',
                fileName: 'package.json',
                source: JSON.stringify({ version: pkg.version }, null, 2)
            });
            console.log('Version file emitted: package.json');
        }
    };
};

// https://vite.dev/config/
export default defineConfig({
    define: {
        'import.meta.env.PACKAGE_VERSION': JSON.stringify(pkg.version)
    },
    plugins: [
        react(),
        tailwindcss(),
        ViteImageOptimizer({
            png: { quality: 80 },
            jpeg: { quality: 80 },
            webp: { quality: 80 },
            avif: { quality: 70 },
        }),
        emitPackageJsonPlugin(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        }
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
            mangle: true,
        },
    },
    server: {
        proxy: {
            "/video-proxy": {
                target: "https://yoozy.oss-cn-hangzhou.aliyuncs.com",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/video-proxy/, ""),
                configure: (proxy, options) => {
                    proxy.on("proxyReq", (proxyReq, req, res) => {
                        // 添加必要的头部
                        proxyReq.setHeader("User-Agent", "Mozilla/5.0 (compatible)");
                    });
                }
            }
        }
    }
});
