'use client';

import { Image } from '@0xsequence/design-system';
import { useCollectible } from '@0xsequence/marketplace-sdk/react';
// import Video from 'next-video';
import Player from 'next-video/player';
import { useParams } from 'next/navigation';
import { type Hex } from 'viem';

export const CollectibleImage = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const tokenId = params.tokenId as string;

  const { data: collectible, isLoading: collectibleLoading } = useCollectible({
    chainId,
    collectionAddress,
    collectibleId: tokenId,
  });
  const placeholderImage = '/images/chess-tile.png';
  // console.dir(collectible, { depth: null });

  // Determine the source to use for rendering
  const animationUrl = collectible?.animation_url;
  // const imageUrl = collectible?.image;
  // const fileSrc = animationUrl || imageUrl || placeholderImage;

  if (collectibleLoading) return <CollectibleImageSkeleton />;

  if (animationUrl) {
    return (
      <Player
        src={animationUrl}
        controls
        loop
        muted
        autoPlay
        style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
        className="rounded-sm"
        playsInline
      />
    );
  }

  // Fallback to placeholder if no animationUrl
  return (
    <div className="mx-auto w-full rounded-[8px] bg-background-control/40 relative aspect-video">
      <Image
        src={placeholderImage}
        alt="Placeholder"
        className="aspect-square w-full rounded-lg object-cover"
      />
    </div>
  );
};

// Animation frame component with autoplay for Arweave videos
// const AnimationFrame = ({
//   src,
//   fallbackImage,
// }: {
//   src: string;
//   fallbackImage: string;
// }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);

//   // Add autoplay parameters to the Arweave URL
//   const autoplaySrc = useMemo(() => {
//     if (!src) return src;

//     // For Arweave URLs, add autoplay parameters
//     const separator = src.includes('?') ? '&' : '?';
//     return `${src}${separator}autoplay=1&controls=1&loop=1&muted=0`;
//   }, [src]);

//   return (
//     <div className="w-full bg-background-control/30 rounded-lg relative aspect-video overflow-hidden max-w-full">
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center">
//           <CollectibleImageSkeleton />
//         </div>
//       )}
//       {hasError && (
//         <div className="absolute inset-0 flex items-center justify-center">
//           <Image
//             src={fallbackImage}
//             alt="Fallback image"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>
//       )}
//       <iframe
//         title="Arweave video content"
//         className={cn(
//           'w-full h-full max-w-full',
//           isLoading && 'opacity-0',
//           hasError && 'hidden',
//         )}
//         src={autoplaySrc}
//         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
//         sandbox="allow-scripts allow-same-origin allow-presentation"
//         allowFullScreen
//         style={{
//           border: '0px',
//           width: '100%',
//           height: '100%',
//           display: 'block',
//         }}
//         onLoad={() => setIsLoading(false)}
//         onError={() => {
//           setIsLoading(false);
//           setHasError(true);
//         }}
//       />
//     </div>
//   );
// };

// Video player component
// const VideoPlayer = ({
//   src,
//   fallbackImage,
// }: {
//   src: string;
//   fallbackImage: string;
// }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);

//   return (
//     <div className="w-full align-center flex justify-center bg-background-control/30 relative aspect-video">
//       {isLoading && (
//         <div className="absolute inset-0">
//           <CollectibleImageSkeleton />
//         </div>
//       )}
//       {hasError && (
//         <div className="absolute inset-0 flex items-center justify-center">
//           <Image
//             src={fallbackImage}
//             alt="Fallback image"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>
//       )}
//       <video
//         // className={cn('w-full', isLoading && 'opacity-0', hasError && 'hidden')}
//         className="w-full"
//         autoPlay
//         // preload="none"
//         // loop
//         controls
//         playsInline
//         width="250"
//         height="90"
//         // controlsList="play"
//         // muted
//         poster="/images/materia.jpg"
//         onLoadedData={() => setIsLoading(false)}
//         // onError={() => {
//         //   setIsLoading(false);
//         //   setHasError(true);
//         // }}
//       >
//         <source src={src} type="video/mp4" />
//       </video>
//     </div>
//   );
// };

function CollectibleImageSkeleton() {
  return <div className="aspect-video w-full h-full loading rounded-lg" />;
}

// 'use client';

// import { Suspense, useState } from 'react';
// import ReactPlayer from 'react-player';

// import { getProxyImageUrl } from '~/lib/image-proxy';
// import { isHtml, isVideo, is3dModel, isAnimationUrl } from '~/lib/utils';
// import { cn } from '~/lib/utils';

// import { Image } from '@0xsequence/design-system';
// import { useCollectible } from '@0xsequence/marketplace-sdk/react';
// import dynamic from 'next/dynamic';
// import { useParams } from 'next/navigation';
// import { type Hex } from 'viem';

// const ModelViewer = dynamic(() => import('./ModelViewer'), {
//   ssr: false,
// });

// export const CollectibleImage = () => {
//   const params = useParams();
//   const chainId = Number(params.chainId);
//   const collectionAddress = params.collectionAddress as Hex;
//   const tokenId = params.tokenId as string;

//   const { data: collectible, isLoading: collectibleLoading } = useCollectible({
//     chainId,
//     collectionAddress,
//     collectibleId: tokenId,
//   });
//   const placeholderImage = '/images/chess-tile.png';

//   // Determine the source to use for rendering
//   const animationUrl = collectible?.animation_url;
//   const imageUrl = collectible?.image;
//   const fileSrc = animationUrl || imageUrl || placeholderImage;

//   if (collectibleLoading) return <CollectibleImageSkeleton />;

//   // Since all animation_url are videos, use ReactPlayer
//   if (animationUrl) {
//     return <VideoPlayer src={animationUrl} fallbackImage={placeholderImage} />;
//   }

//   // Fallback for regular images
//   return (
//     <div className="mx-auto w-full rounded-[8px] bg-background-control/40 relative aspect-square">
//       <Image
//         src={getProxyImageUrl(fileSrc, 600, 600)}
//         alt={collectible?.name || 'NFT Image'}
//         className="aspect-square w-full rounded-lg object-cover"
//         onError={(e) => {
//           e.currentTarget.src = placeholderImage;
//         }}
//       />
//     </div>
//   );
// };

// // Animation frame component for HTML and animation URLs
// const AnimationFrame = ({
//   src,
//   fallbackImage,
// }: {
//   src: string;
//   fallbackImage: string;
// }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);

//   return (
//     <div className="w-full align-center flex justify-center bg-background-control/30 rounded-lg relative aspect-video">
//       {isLoading && (
//         <div className="absolute inset-0">
//           <CollectibleImageSkeleton />
//         </div>
//       )}
//       {hasError && (
//         <div className="absolute inset-0 flex items-center justify-center">
//           <Image
//             src={fallbackImage}
//             alt="Fallback image"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>
//       )}
//       <iframe
//         title="Collectible animation"
//         className={cn(
//           'w-full rounded-lg',
//           isLoading && 'opacity-0',
//           hasError && 'hidden',
//         )}
//         src={src}
//         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; autoplay"
//         sandbox="allow-scripts allow-same-origin"
//         style={{ border: '0px' }}
//         onLoad={() => setIsLoading(false)}
//         onError={() => {
//           setIsLoading(false);
//           setHasError(true);
//         }}
//       />
//     </div>
//   );
// };

// // React Player component for video content
// const VideoPlayer = ({
//   src,
//   fallbackImage,
// }: {
//   src: string;
//   fallbackImage: string;
// }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);

//   return (
//     <div className="w-full align-center flex justify-center bg-background-control/30 rounded-lg relative aspect-video">
//       {isLoading && (
//         <div className="absolute inset-0">
//           <CollectibleImageSkeleton />
//         </div>
//       )}
//       {hasError && (
//         <div className="absolute inset-0 flex items-center justify-center">
//           <Image
//             src={fallbackImage}
//             alt="Fallback image"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>
//       )}
//       <ReactPlayer
//         src={src}
//         width="100%"
//         height="100%"
//         controls={true}
//         loop={true}
//         autoPlay={true}
//         // playing={false} // Don't autoplay by default
//         muted={true}
//         playsInline={true}
//         className={cn('', isLoading && 'opacity-0', hasError && 'hidden')}
//         onReady={() => setIsLoading(false)}
//         onError={() => {
//           setIsLoading(false);
//           setHasError(true);
//         }}
//         // config={{
//         //   file: {
//         //     attributes: {
//         //       crossOrigin: 'anonymous',
//         //       preload: 'metadata',
//         //       playsInline: true,
//         //     },
//         //   },
//         // }}
//       />
//     </div>
//   );
// };

// function CollectibleImageSkeleton() {
//   return <div className="aspect-video w-full h-full loading rounded-lg" />;
// }
