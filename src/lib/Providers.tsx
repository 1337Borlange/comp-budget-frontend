'use client';

import { PropsWithChildren } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, MeProvider } from './context';

interface ProvidersProps extends PropsWithChildren {
  session: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <>
      <SessionProvider session={session}>
        <MeProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </MeProvider>
      </SessionProvider>
    </>
  );
}
