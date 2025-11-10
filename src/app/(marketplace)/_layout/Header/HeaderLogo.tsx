'use client';

// import { Text } from '@0xsequence/design-system';
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
        'hidden md:flex! md:-ml-2! items-center text-xl font-bold text-secondary'
      }
    >
      <div
        id="logoAnimation"
        className="md:ml-0! md:pl-0! md:mr-0 lg:mr-7 scale-[0.3] md:scale-[0.5]"
      >
        <div className="logo-animation"></div>
      </div>
    </Link>
  );
};
