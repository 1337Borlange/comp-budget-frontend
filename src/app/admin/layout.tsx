import Header from '@/components/Header';
import '../../styles/components/page.scss';
import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session.isAdmin) {
    notFound();
  }

  return (
    <>
      <div className="page-wrapper">
        <Header user={session.user} isAdmin={session.isAdmin} />
        {/* <AdminContextProvider> */}
        {children}
        {/* </AdminContextProvider> */}
      </div>
    </>
  );
}
