'use server';

import { auth } from './auth';

export const apiFetch = async (
  url: string,
  options: RequestInit = { headers: {} },
): Promise<Response> => {
  const session = await auth();

  const _options = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.id_token}`,
      ...options.headers,
    },
  };

  return fetch(url, _options);
};



//for client components we need to return a plain old javascript object. -- Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.
export const apiFetchForClientComponents = async (
  url: string,
  options: RequestInit = { headers: {} },
): Promise<Response> => {
  const session = await auth();

  const _options = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.id_token}`,
      ...options.headers,
    },
  };

  const res = await fetch(url, _options);

  return await res.json();
};
