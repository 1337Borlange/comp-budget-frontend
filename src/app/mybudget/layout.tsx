import Header from '@/components/Header';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import '../../styles/components/page.scss';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="page-wrapper">
        <Header user={session?.user} />
        {children}
      </div>
    </>
  );
}
