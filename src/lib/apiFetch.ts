'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const apiFetch = async (
  url: string,
  options: RequestInit = { headers: {} },
): Promise<Response> => {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.id_token;

  const _options = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  };

  // console.log({ url, tokenExsis: !!token });
  return fetch(url, _options);
};
