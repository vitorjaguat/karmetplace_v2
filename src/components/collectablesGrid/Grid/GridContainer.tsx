import { type ForwardedRef, forwardRef } from 'react';

import { Grid } from '~/components/ui';
import { cn } from '~/lib/utils';

type GridContainerProps = {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export const GridContainer = forwardRef(
  (props: GridContainerProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { className, ...otherProps } = props;

    return (
      <Grid.Root
        className={cn(
          className,
          'grid gap-6 md:gap-10! xl:gap-10!',
          'grid-cols-1',
          'md:grid-cols-3',
          'xl:grid-cols-3 [&>div]:justify-center! [&_div]:w-full! mx-auto!',
        )}
        ref={ref}
        {...otherProps}
      />
    );
  },
);

GridContainer.displayName = 'GridContainer';
