import ScrollToTop from '~/components/ScrollToTop';
import { cn } from '~/lib/utils';

import CollectiblePageClient from './_components/CollectiblePageClient';
import CollectibleSidebar from './_components/Sidebar';

export default async function CollectibleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollToTop once={true} />

      <div
        className={cn(
          '@container/collectibleViewContainer',
          'flex mx-auto h-fit min-h-screen w-full  flex-col gap-12 px-2 max-w-none!',
          // 'max-w-[1200px]'
        )}
      >
        <div
          className={cn(
            '@xl/collectibleViewContainer:gap-10 gap-8',
            'flex flex-col-reverse md:flex-row! sm:px-4!',
            'justify-center',
            '@xl/collectibleViewContainer:py-10! py-4',
          )}
        >
          <div className="hidden md:block!">
            <CollectibleSidebar />
          </div>

          <div className="flex flex-col w-full md:w-[462px]! lg:w-full!">
            <CollectiblePageClient>{children}</CollectiblePageClient>
          </div>
        </div>
      </div>
    </>
  );
}
