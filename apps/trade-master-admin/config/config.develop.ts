import {defineConfig} from "@umijs/max";

export default defineConfig({
    // proxy: {
    //     '/api': {
    //         target: 'http://localhost:8080',
    //         secure: false,
    //         changeOrigin: true,
    //         headers: {
    //             Authorization: ''
    //         }
    //     },
    // },
    define: {
        'process.env.AUTH_URL': 'https://core.studyunis.com/api/auth/code?platform=member',
        'process.env.API_URL': 'http://localhost:8081',
        'process.env.COOKIE_DOMAIN': 'localhost',
        'process.env.BASE_URL':'https://studygptapp.studyunis.com'

    },
});
