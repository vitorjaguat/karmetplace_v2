'use server';

import { ssrClient } from '~/app/marketplace-sdk/ssr';
import { cn } from '~/lib/utils';

import { InventoryButton } from './Buttons/InventoryButton';
import MenuButton from './Buttons/MenuButton';
import { Socials } from './Buttons/Socials';
import { WalletButton } from './Buttons/WalletButton';
import { HeaderLogo } from './HeaderLogo';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

export const Header = async () => {
  const marketplaceConfig = await ssrClient().then((s) =>
    s.getMarketplaceConfig(),
  );

  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isLandingPage = pathname === '/';
  const isFaq = pathname.includes('/faq');
  const isAbout = pathname.includes('/about');

  return (
    <div
      className={cn(
        'h-(--headerHeight) bg-background-primary flex gap-2 p-3 relative border-b border-border-normal',
        'sticky top-0 z-20 w-full md:pr-6!',
      )}
    >
      <MenuButton />

      {!isLandingPage && (
        <HeaderLogo
          logoUrl={marketplaceConfig.logoUrl}
          title={marketplaceConfig.title}
        />
      )}

      {/* <Socials socials={marketplaceConfig.socials} /> */}
      {/* ABOUT & FAQ */}
      <div className="hidden md:flex! text-neutral-100 gap-6 h-full items-center">
        <Link href="/about" className={isAbout ? 'text-neutral-400' : ''}>
          About
        </Link>
        <Link href="/faq" className={isFaq ? 'text-neutral-400' : ''}>
          FAQ
        </Link>
      </div>
      <div className="w-full flex md:justify-center items-center">
        <Image
          alt="The Sphere | Karmetplace"
          src="/images/karmetplace_logo.png"
          width={2580}
          height={430}
          className="max-h-full max-w-[80%] md:max-w-fit"
        />
      </div>

      <div className="flex-1" />
      <InventoryButton />

      <WalletButton />
    </div>
  );
};
