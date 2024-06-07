/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "media.ldlc.com",
            port: "",
          },]
    }
};



export default nextConfig;
