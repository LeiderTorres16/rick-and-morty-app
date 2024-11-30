/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "1000logos.net",
            },
        ]
    }
};

export default nextConfig;
