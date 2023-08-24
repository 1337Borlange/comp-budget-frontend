'use client';
import { apiFetch } from '@/lib/helpers';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const apiUrl = 'https://ninjabudget-poc-api.azurewebsites.net/api';

export const TestFetch = () => {
  const session = useSession();
  console.log(session);
  useEffect(() => {
    if (session) {
      apiFetch(
        (session as any).data.id_token,
        `${apiUrl}/expenses?userId=${(session as any).data.sub}`
      );
    }
  }, [session]);
  return <div>Session</div>;
};
