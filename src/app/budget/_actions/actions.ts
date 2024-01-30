import { apiFetch } from '@/lib/apiFetch';
import { apiUrl } from '@/lib/settings';
import { User } from '@/lib/types';

/**
 * Retrieves user information.
 * @returns A Promise that resolves to a User object.
 */
export async function getMe(): Promise<User> {
  try {
    const response = await apiFetch(`${apiUrl}/me`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Error fetching me');
    }

    return data;
  } catch (error) {
    const message = (error as any)?.message || 'Error fetching me';
    console.error('Error fetching me:', message);
    return {} as User;
  }
}
