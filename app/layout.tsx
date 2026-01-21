import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'TextileCalc - Textile Engineering Tools',
  description: 'Professional textile engineering calculators and tools',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex flex-col min-h-screen font-sans antialiased">
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-00FPMBBSLH'} />
        {children}
      </body>
    </html>
  );
}
