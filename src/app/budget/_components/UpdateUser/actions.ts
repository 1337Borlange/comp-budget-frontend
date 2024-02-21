import { revalidatePath } from 'next/cache';

import { apiFetch } from '@/lib/apiFetch';
import { apiUrl } from '@/lib/settings';
import { User } from '@/lib/types';

export async function updateUser(updatedUser: User) {
  try {
    const res = await apiFetch(`${apiUrl}/adm/users`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
    });
    const data = await res.json();
    revalidatePath(`/budget/user?id=${updatedUser.id}`);
    return {
      status: res.status,
      data,
    };
  } catch (error) {
    return {};
  }
}

export async function deleteUser(formData: FormData) {
  const id = formData.get('userId') as string;

  try {
    const res = await apiFetch(`${apiUrl}/adm/users?userId=${id}`, {
      method: 'DELETE',
    });
    const data = res.json();
    revalidatePath('/budget');
    return {
      status: res.status,
      data,
    };
  } catch (error) {
    return {};
  }
}
