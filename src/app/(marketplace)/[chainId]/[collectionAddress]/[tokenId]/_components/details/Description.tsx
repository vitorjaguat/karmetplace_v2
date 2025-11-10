import React from 'react';
import ReactMarkdown from 'react-markdown';

import CustomSkeleton from '~/components/custom-skeleton/CustomSkeleton';

import { Text } from '@0xsequence/design-system';

// import remarkBreaks from 'remark-breaks';

type DescriptionProps = {
  description?: string;
  isLoading: boolean;
};

export default function Description({
  description,
  isLoading,
}: DescriptionProps) {
  const descriptionNotSet = !description && !isLoading;

  // Debug: log the description to see what we're working with
  // console.log('Description content:', description);
  // console.log('description ', description);
  // Process description to add line breaks at natural points
  const processedDescription = description;
  // ?.replace(/\*\*([^*]+)\*\*/g, '\n**$1**\n') // Add breaks around bold sections
  // ?.replace(/\. ([A-Z])/g, '.\n\n$1') // Add breaks after sentences starting new topics
  // ?.replace(/^\n+/, ''); // Remove leading line breaks

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 mb-3">
        <CustomSkeleton className="h-4 w-full" />
        <CustomSkeleton className="h-4 w-2/3" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 mb-3">
      <Text className="text-xs text-muted font-medium">Description</Text>
      {!descriptionNotSet && (
        <div className="text-sm text-secondary font-medium whitespace-pre-line lg:pr-40 xl:pr-96 xl:mr-20">
          <ReactMarkdown>{processedDescription || ''}</ReactMarkdown>
        </div>
      )}
      {descriptionNotSet && (
        <Text className="text-sm text-secondary font-medium">
          No description for this collectible
        </Text>
      )}
    </div>
  );
}
