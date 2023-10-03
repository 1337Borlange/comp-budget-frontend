// import './globals.css';
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import { Providers } from '@/lib/Providers';
import '../styles/style.scss';
import { Toaster } from 'react-hot-toast';
import { auth } from '@/lib/auth';

const sora = Sora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | tretton37',
    default: 'tretton37', // a default is required when creating a template
  },
  description: 'View your company competence budget',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  return (
    <html lang="en">
      <body className={sora.className}>
        <Providers session={session}>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
