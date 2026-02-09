import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../app/styles/globals.css';
import Header from '../components/Header/Header';
import CartProvider from '../components/CartProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lanchonete Delícia - Os Melhores Lanches',
  description: 'Sistema de pedidos de lanches online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}