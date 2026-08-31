import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/store';
import { AuthProvider } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { MarketPriceTicker } from '@/components/MarketPriceTicker';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KethPiyasa (කෙත්පියස) - Direct Farmer-to-Buyer B2B Agricultural Marketplace',
  description: 'Direct Farmer-to-Buyer B2B Marketplace Platform in Sri Lanka. Connect farmers directly with commercial buyers, bulk crop listings, advance harvest bookings, and escrow payments.',
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased selection:bg-[#064e3b] selection:text-white`}>
        <AppProvider>
          <AuthProvider>
            <Navbar />
            <MarketPriceTicker />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
              {children}
            </main>
            <footer className="bg-[#043e2f] text-white py-8 px-4 sm:px-8 text-xs border-t border-emerald-900">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-emerald-300 text-sm">kethpiyasa (කෙත්පියස)</span> • National Direct Agricultural B2B Platform
                  <p className="mt-1 text-emerald-200/80">© 2026 KethPiyasa Platform Ltd. Empowering Sri Lankan Agrarian Communities.</p>
                </div>
                <div className="flex items-center gap-4 text-emerald-200/80">
                  <span>Escrow Secured</span> • <span>Verified by NIC / Business License</span> • <span>Sri Lanka Agricultural Grid</span>
                </div>
              </div>
            </footer>
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
