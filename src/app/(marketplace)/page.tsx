// import { ssrClient } from '../marketplace-sdk/ssr';
import { FloorPriceDisplay } from '~/components/FloorPriceDisplay';

import Image from 'next/image';
import Link from 'next/link';

const FALLBACK_COLLECTION_ROUTE =
  '/1/0x39f7e5bdfb46bf321b8df7803070d27d79361400/items';

const FEATURED_COLLECTION = {
  title: 'The Sphere Karmic Objects — First Cycle',
  description:
    'The Sphere concludes its first funding cycle with KARMIC OBJECTS, a unique collection of six artworks.',
  bannerSrc: '/images/materia.jpg',
  avatarSrc: '/images/logo-sprite.png',
};

// type MarketplaceCollection = {
//   chainId: string | number;
//   address: string;
//   title?: string | null;
// };

// const getPrimaryCollection = (
//   config: unknown,
// ): MarketplaceCollection | undefined => {
//   if (!config || typeof config !== 'object' || !('collections' in config)) {
//     return undefined;
//   }

//   const maybeCollections: unknown = (config as { collections?: unknown })
//     .collections;
//   if (!Array.isArray(maybeCollections)) {
//     return undefined;
//   }

//   for (const candidate of maybeCollections) {
//     if (!candidate || typeof candidate !== 'object') {
//       continue;
//     }

//     const { chainId, address, title } = candidate as {
//       chainId?: unknown;
//       address?: unknown;
//       title?: unknown;
//     };

//     if (
//       (typeof chainId === 'string' || typeof chainId === 'number') &&
//       typeof address === 'string'
//     ) {
//       return {
//         chainId,
//         address,
//         title: typeof title === 'string' ? title : undefined,
//       };
//     }
//   }

//   return undefined;
// };

export default async function HomePage() {
  // const client = await ssrClient();
  // const marketplaceConfig: unknown = await client.getMarketplaceConfig();

  // const primaryCollection = getPrimaryCollection(marketplaceConfig);
  const primaryCollection = {
    chainId: '1',
    address: '0x39f7e5bdfb46bf321b8df7803070d27d79361400',
    title: 'The Sphere Karmic Objects — First Cycle',
  };
  const marketplaceHref: string = primaryCollection
    ? `/${String(primaryCollection.chainId)}/${primaryCollection.address}/items`
    : FALLBACK_COLLECTION_ROUTE;

  // const marketplaceLabel = primaryCollection?.title ?? 'Explore collection';

  return (
    <main className="relative flex min-h-[calc(100vh-calc(--headerHeight))] w-full items-center justify-center">
      <div className="container mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center md:gap-8 md:py-20">
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
          The Sphere | KARMETPLACE
        </span>
        <h1 className="text-3xl text-neutral-100 md:text-5xl">
          Experiment, Trade, and Collect Live Art
        </h1>
        <p className="text-base text-neutral-300 md:text-lg">
          Step into the curated marketplace to explore live seeds, derivatives,
          and collectibles from The Sphere community. When you&apos;re ready,
          jump straight into the currently featured collection.
        </p>
        <Link
          prefetch
          aria-label={`Explore ${FEATURED_COLLECTION.title}`}
          href={marketplaceHref as `/1/${string}/items`}
          className="group relative mt-12 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-left shadow-lg backdrop-blur-sm transition hover:border-primary/40 hover:bg-white/[0.07] md:mt-14 md:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row! lg:items-stretch lg:gap-10">
            <div className="flex-1 relative overflow-hidden rounded-2xl bg-black/20 lg:max-w-[48%]">
              <div className="relative h-72 w-full lg:h-[420px]">
                <video
                  src="/videos/karmetplace_intro_v3.mp4"
                  autoPlay
                  muted
                  loop
                  className="h-full w-full object-cover aspect-video transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              {/* <div className="absolute bottom-6 left-6 hidden h-20 w-20 overflow-hidden rounded-xl border border-white/40 bg-black/40 shadow-xl md:block">
                <Image
                  src={FEATURED_COLLECTION.avatarSrc}
                  alt="Featured collection avatar"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div> */}
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
                  Featured Collection
                </span>
                <h3 className="text-2xl font-semibold tracking-tight text-neutral-50 md:text-3xl">
                  {FEATURED_COLLECTION.title}
                </h3>
                <p className="max-w-2xl text-sm text-neutral-300 md:text-base">
                  {FEATURED_COLLECTION.description}
                </p>
              </div>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <FloorPriceDisplay
                  contractAddress={primaryCollection.address}
                  chainId={Number(primaryCollection.chainId)}
                />
                <span className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black transition group-hover:bg-primary/80 md:px-6 md:py-3 md:text-base">
                  Explore collection
                </span>
              </div>
            </div>
          </div>
        </Link>
        {/* <Link
          href={marketplaceHref}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-primary/80 md:text-base"
        >
          {marketplaceLabel}
        </Link> */}
      </div>
    </main>
  );
}
