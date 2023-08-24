'use client';

import { PropsWithChildren } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { AdminContextProvider } from '@/app/admin/components/AdminContext';
// import GlobalsCss from '@/app/globals.css';

interface ProvidersProps extends PropsWithChildren {
  session: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <>
      {/* <GlobalsCss /> */}
      <SessionProvider session={session}>
        <AdminContextProvider>{children}</AdminContextProvider>
      </SessionProvider>
    </>
  );
}
