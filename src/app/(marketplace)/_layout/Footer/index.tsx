import Image from 'next/image';

export const Footer = () => {
  return (
    <div
      className=" 
    z-[1] p-6 md:p-10! flex flex-col w-full items-center md:block! text-center md:text-left! bg-gray-200/10 text-neutral-100 md:mt-6"
    >
      <div className="mb-4 md:-ml-[8px]! w-1/4">
        <Image
          src="/images/karmetplace_logo.png"
          alt="The Sphere Karmetplace"
          width={2580}
          height={430}
        />
      </div>
      <div className="flex flex-col md:grid! md:grid-cols-2! w-full">
        <div className="text-[14px] text-[var(--colors-gray12)] flex flex-col">
          <div className="">Regenerative Commons for Live Arts</div>
          <div className="">v0.2 / 2023-2025</div>
          <div className="">
            Developed by{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://uint.studio/"
              className="hover:tracking-wide duration-700"
            >
              Uint Studio
            </a>
          </div>
        </div>
        <div className="flex items-end justify-between md:justify-end! gap-6">
          <div className="text-left text-[14px] text-[var(--colors-gray12)] flex flex-col justify-end mt-6 md:mt-0!">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://thesphere.as"
            >
              <div className="">Website</div>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.thesphere.as/"
            >
              <div className="">Docs</div>
            </a>
          </div>
          <div className="text-[14px] text-[var(--colors-gray12)] flex flex-col justify-end text-right mt-6 md:mt-0!">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/TheSphere_as"
            >
              <div className="">Twitter</div>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://t.me/+o3hn1fgGsQMzZjgx"
            >
              <div className="">Telegram</div>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.gg/e8K8KPrJ49"
            >
              <div className="">Discord</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// import { ssrClient } from '~/app/marketplace-sdk/ssr';
// import { cn } from '~/lib/utils';

// import { Button, Text } from '@0xsequence/design-system';
// import NextLink from 'next/link';

// export const Footer = async () => {
//   const marketplaceConfig = await ssrClient().then((s) =>
//     s.getMarketplaceConfig(),
//   );
//   const { title: marketplaceTitle } = marketplaceConfig;
//   const year = new Date().getFullYear();

//   return (
//     <div
//       className={cn(
//         'flex-col md:flex-row!',
//         'flex gap-2 md:justify-between! md:items-center!',
//         'w-full px-8 py-5',
//         'border-t border-border-normal',
//         'mt-auto',
//       )}
//     >
//       <Text className="text-sm font-bold text-muted text-center">
//         ⓒ{year} {marketplaceTitle}
//       </Text>

//       <div className="flex gap-2 md:gap-7! items-center justify-center">
//         <Button asChild size="sm" variant="text" className="text-muted p-0">
//           <NextLink href="/privacy">Privacy Policy</NextLink>
//         </Button>

//         <Button asChild size="sm" variant="text" className="text-muted p-0">
//           <NextLink href="/terms">Terms of Service</NextLink>
//         </Button>
//       </div>
//     </div>
//   );
// };
