/* @type {import('next').NextConfig} */
import stylexPlugin from "@stylexjs/nextjs-plugin";

const __dirname = new URL(".", import.meta.url).pathname;

// Define the Next.js configuration
const nextConfig = {
  images: {
    domains: ["localhost"], // Add 'localhost' to the allowed domains
  },
};

export default stylexPlugin({
  rootDir: __dirname,
})(nextConfig);
