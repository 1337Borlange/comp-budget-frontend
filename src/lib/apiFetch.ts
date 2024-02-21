'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const apiFetch = async (
  url: string,
  options: RequestInit = { headers: {} },
): Promise<Response> => {
  const session = await getServerSession(authOptions);
  const token = session.id_token;

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



//for client components we need to return a plain old javascript object. -- Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.
export const apiFetchForClientComponents = async (
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

  const res = await fetch(url, _options);

  return await res.json();
};