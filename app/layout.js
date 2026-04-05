import './globals.css';

export const metadata = {
  title: 'Archive Engines',
  description: 'Search Japanese proxy services in English. Find clothing across Mercari, Yahoo Auctions, Zozotown and more.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
