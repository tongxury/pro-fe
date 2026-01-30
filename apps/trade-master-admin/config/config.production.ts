import {defineConfig} from "@umijs/max";

export default defineConfig({
    define: {
        'process.env.API_URL': 'https://i.memex.trade',
    },
});
