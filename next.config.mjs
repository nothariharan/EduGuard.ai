/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      { source: "/get_notifications", destination: "http://localhost:5000/get_notifications" },
      { source: "/send_notification", destination: "http://localhost:5000/send_notification" },
      { source: "/students", destination: "http://localhost:5000/students" },
    ]
  },
};

export default nextConfig;
