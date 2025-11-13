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
  async redirects() {
    return [
      {
        source:
          '/ethereum/asset/0x39f7e5bdfb46bf321b8df7803070d27d79361400:(:tokenId\\d+)',
        destination: '/1/0x39f7e5bdfb46bf321b8df7803070d27d79361400/:tokenId',
        permanent: true,
      },
    ];
  },
};

export default withNextVideo(config);
