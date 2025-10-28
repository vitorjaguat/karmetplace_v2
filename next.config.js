import { withNextVideo } from 'next-video/process';

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: [
    '@0xsequence/marketplace-sdk',
    '@0xsequence/design-system',
  ],
};

export default withNextVideo(config);
