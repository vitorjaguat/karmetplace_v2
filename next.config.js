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
        source: '/ethereum/asset/0x39f7e5bdfb46bf321b8df7803070d27d79361400:1',
        destination: '/1/0x39f7e5bdfb46bf321b8df7803070d27d79361400/1',
        permanent: true,
      },
      {
        source: '/ethereum/asset/0x39f7e5bdfb46bf321b8df7803070d27d79361400:2',
        destination: '/1/0x39f7e5bdfb46bf321b8df7803070d27d79361400/2',
        permanent: true,
      },
      {
        source: '/ethereum/asset/0x39f7e5bdfb46bf321b8df7803070d27d79361400:3',
        destination: '/1/0x39f7e5bdfb46bf321b8df7803070d27d79361400/3',
        permanent: true,
      },
      {
        source: '/ethereum/asset/0x39f7e5bdfb46bf321b8df7803070d27d79361400:4',
        destination: '/1/0x39f7e5bdfb46bf321b8df7803070d27d79361400/4',
        permanent: true,
      },
      {
        source: '/ethereum/asset/0x39f7e5bdfb46bf321b8df7803070d27d79361400:5',
        destination: '/1/0x39f7e5bdfb46bf321b8df7803070d27d79361400/5',
        permanent: true,
      },
      {
        source: '/ethereum/asset/0x39f7e5bdfb46bf321b8df7803070d27d79361400:6',
        destination: '/1/0x39f7e5bdfb46bf321b8df7803070d27d79361400/6',
        permanent: true,
      },
    ];
  },
};

export default withNextVideo(config);
