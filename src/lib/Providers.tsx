'use client';

import { PropsWithChildren, useEffect } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { useDarkMode } from 'usehooks-ts';
// import GlobalsCss from '@/app/globals.css';

interface ProvidersProps extends PropsWithChildren {
  session: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <>
      {/* <GlobalsCss /> */}
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
}
