/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable experimental features for better performance
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ['@echopress/ui'],
    },

    // Image optimization for podcast thumbnails and blog images
    images: {
        domains: [
            'localhost',
            'api.echopress.ai',
            'storage.googleapis.com',
            's3.amazonaws.com',
            'images.unsplash.com',
            'picsum.photos'
        ],
        formats: ['image/webp', 'image/avif'],
    },

    // Environment variables
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
        NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000',
    },

    // Webpack configuration for audio files
    webpack: (config, { isServer }) => {
        // Handle audio files
        config.module.rules.push({
            test: /\.(mp3|wav|ogg|m4a)$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '/_next/static/audio/',
                    outputPath: 'static/audio/',
                },
            },
        });

        return config;
    },

    // Headers for security and performance
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },

    // Redirects for SEO
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
