import '~/styles/globals.css';

import { Space_Grotesk } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body className="relative min-h-screen">
        <div className="site-background" aria-hidden>
          <div className="star-container">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
        <NuqsAdapter>
          <div className="relative z-10 flex min-h-screen flex-col">
            {children}
          </div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
