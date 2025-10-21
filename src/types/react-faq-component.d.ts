declare module 'react-faq-component' {
  export interface FaqData {
    title: string;
    rows: Array<{
      title: string;
      content: string;
    }>;
  }

  export interface FaqStyles {
    bgColor?: string;
    titleTextColor?: string;
    rowTitleColor?: string;
    titleTextSize?: string;
    rowTitleTextSize?: string;
    rowContentColor?: string;
    arrowColor?: string;
    rowContentPaddingBottom?: string;
  }

  export interface FaqConfig {
    animate?: boolean;
    arrowIcon?: string;
    tabFocus?: boolean;
  }

  export interface FaqProps {
    data: FaqData;
    styles?: FaqStyles;
    config?: FaqConfig;
  }

  export const Faq: React.FC<FaqProps>;
}
