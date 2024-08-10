import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';

const notoSans = Noto_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Event Management',
  description: 'Event Management demo',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${notoSans.className} bg-primary`}>
        <main className='bg-white shadow-lg p-2 max-w-5xl rounded'>
          {children}
          {modal}
        </main>
      </body>
    </html>
  );
}
