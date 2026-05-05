import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, "../../"),
  },
  allowedDevOrigins: ['26.87.198.178', 'http://[IP_ADDRESS]', 'http://localhost'],
};

export default nextConfig;
