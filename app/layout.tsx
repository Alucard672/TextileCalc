import type { Metadata } from 'next';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-00FPMBBSLH';

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex flex-col min-h-screen font-sans antialiased">
        <GoogleAnalytics gaId={gaId} />
        {children}
      </body>
    </html>
  );
}
