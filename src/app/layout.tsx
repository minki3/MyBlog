import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavigationBar from '@/components/nav/NavigationBar';
import Footer from '@/components/nav/Footer';
import Category from '@/components/category/Category';
import { AuthContext } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'minki3',
  description: 'introduce | blog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <NavigationBar />
          <main className="p-2">
            <Category />
            <div className="basis-[90%]">{children}</div>
          </main>
          <Footer />
        </AuthContext>
      </body>
    </html>
  );
}
