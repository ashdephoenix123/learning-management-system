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
            
        ]
    }
}

module.exports = nextConfig
