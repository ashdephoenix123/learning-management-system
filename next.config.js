/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.akashsarki.me',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'anonymousuniversity.vercel.app',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost:3000',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                pathname: '/anonymous_user_images/uploads/userImages/**',
            }
        ]
    }
}

module.exports = nextConfig
