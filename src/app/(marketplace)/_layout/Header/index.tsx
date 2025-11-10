'use server';

import { ssrClient } from '~/app/marketplace-sdk/ssr';
import { cn } from '~/lib/utils';

import { InventoryButton } from './Buttons/InventoryButton';
import MenuButton from './Buttons/MenuButton';
// import { Socials } from './Buttons/Socials';
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
        'sticky top-0 z-20 w-full md:pr-0! md:pl-0! md:justify-between',
      )}
    >
      <MenuButton />

      <div className="md:pl-0! md:ml-0! flex md:min-w-1/3">
        {!isLandingPage && (
          <HeaderLogo
            logoUrl={marketplaceConfig.logoUrl}
            title={marketplaceConfig.title}
          />
        )}

        {/* ABOUT & FAQ */}
        <div className="hidden md:flex! text-neutral-100 gap-6 h-full items-center">
          <Link href="/about" className={isAbout ? 'text-neutral-400' : ''}>
            About
          </Link>
          <Link href="/faq" className={isFaq ? 'text-neutral-400' : ''}>
            FAQ
          </Link>
        </div>
      </div>
      <div className="w-full flex md:hidden! lg:flex! md:justify-center! items-center">
        <Image
          alt="The Sphere | Karmetplace"
          src="/images/karmetplace_logo.png"
          width={2580}
          height={430}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="md:hidden flex-1" />
      <div className="flex md:gap-5 md:min-w-1/3 justify-end md:pr-6!">
        <InventoryButton />

        <WalletButton />
      </div>
    </div>
  );
};
