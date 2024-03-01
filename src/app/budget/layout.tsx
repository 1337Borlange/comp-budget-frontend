import Header from '@/components/Header';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import '../../styles/components/page.scss';
import { redirect } from 'next/navigation';
import { AdminArea } from '@/components/AdminArea/AdminArea';
import { getMe } from './_actions/actions';
import { Providers } from '@/lib/Providers';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);
  const me = await getMe();
  if (!session) redirect('/api/auth/signin');

  return (
    <>
      <div className="page-wrapper">
        <Header isAdmin={me.isAdmin ?? false} />
        {me?.isAdmin && <AdminArea isAdmin={me?.isAdmin} />}
        <Providers session={session} >
          {children}
        </Providers>
      </div>
    </>
  );
}

