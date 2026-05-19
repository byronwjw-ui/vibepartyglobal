/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 严格模式：构建错误必须真修。不再使用 ignoreBuildErrors / ignoreDuringBuilds 兜底，
  // 避免技术债越积越大、上线后 runtime 才暴雷。
};
export default nextConfig;
