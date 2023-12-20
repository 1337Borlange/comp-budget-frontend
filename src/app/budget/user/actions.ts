import { apiFetch } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';

export async function getUsers(token: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/adm/users`).then((res) => {
    return res.json();
  });
}
