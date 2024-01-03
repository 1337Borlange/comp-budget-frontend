import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { apiFetch } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { User } from '@/lib/types';
import { getServerSession } from 'next-auth';

/**
 * Retrieves user information.
 * @returns A Promise that resolves to a User object.
 */
export async function getMe(): Promise<User> {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.id_token;

  return apiFetch(token, `${apiUrl}/me`).then((res) => {
    return res.json();
  });
}
