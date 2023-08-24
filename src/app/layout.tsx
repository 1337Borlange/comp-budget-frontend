// import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Providers } from '@/lib/Providers';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import '../styles/style.scss';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My competence budget - tretton37',
  description: 'View your company competence budget',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
