import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: false,
            },
        ]
    },
    reactStrictMode: false, // true的话 React可能会故意两次调用某些生命周期方法，包括render和useEffect，以帮助发现潜在的问题。这只会在开发模式下发生，生产模式下不会。
    webpack: (config, {isServer}) => {
        // 添加处理视频文件的规则
        config.module.rules.push({
            test: /\.(mp4|webm)$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '/_next',
                    outputPath: 'static/videos/',
                    name: '[name].[ext]',
                },
            },
        });

        return config;
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default withNextIntl(nextConfig);
