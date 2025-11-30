import { NextConfig } from 'next';
import withPlugins from 'next-compose-plugins';
import withTM from 'next-transpile-modules';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

export default withPlugins([withTM(['lucide-react'])], nextConfig);