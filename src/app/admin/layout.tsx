import Header from '@/components/Header';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import '../../styles/components/page.scss';
import { notFound, redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin');
  if (session && !(session as any).isAdmin) {
    notFound();
  }
  return (
    <>
      <div className="page-wrapper">
        <Header user={session?.user} isAdmin={(session as any).isAdmin} />
        {/* <AdminContextProvider> */}
        {children}
        {/* </AdminContextProvider> */}
      </div>
    </>
  );
}
