'use client';

import { Text } from '@0xsequence/design-system';
import Link from 'next/link';

type HeaderLogoProps = {
  logoUrl?: string;
  title?: string;
};

export const HeaderLogo = ({ logoUrl, title }: HeaderLogoProps) => {
  return (
    <Link
      prefetch={false}
      href="/"
      className={
        'hidden md:flex! items-center text-xl font-bold text-secondary'
      }
    >
      {/* {logoUrl ? (
        <img
          src={logoUrl}
          className="h-full max-w-[200px] object-contain"
          alt="Logo"
        />
      ) : (
        <Text className="text-xl" fontWeight="bold">
          {title}
        </Text>
      )} */}
      <div id="logoAnimation" className="md:mr-7 scale-[0.3] md:scale-[0.5]">
        <div className="logo-animation"></div>
      </div>
    </Link>
  );
};
