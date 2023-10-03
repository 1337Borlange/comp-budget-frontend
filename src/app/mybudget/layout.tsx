import Header from '@/components/Header';
import '../../styles/components/page.scss';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect('/api/auth/signin');

  return (
    <>
      <div className="page-wrapper">
        <Header
          user={session.user}
          isAdmin={session.isAdmin ?? false}
        />
        {children}
      </div>
    </>
  );
}
