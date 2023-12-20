import Header from '@/components/Header';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import '../../styles/components/page.scss';
import { redirect } from 'next/navigation';
import { AdminArea } from '@/components/AdminArea/AdminArea';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);
  const isAdmin = (session as any)?.isAdmin ?? false;
  if (!session) redirect('/api/auth/signin');

  return (
    <>
      <div className="page-wrapper">
        <Header isAdmin={(session as any)?.isAdmin ?? false} />
        {isAdmin && <AdminArea isAdmin={isAdmin} />}
        {children}
      </div>
    </>
  );
}
