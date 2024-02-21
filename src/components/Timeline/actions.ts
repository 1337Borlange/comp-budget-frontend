import { apiFetch } from '@/lib/apiFetch';
import { apiUrl } from '@/lib/settings';
import { revalidatePath } from 'next/cache';

export async function deleteExpense(formData: FormData) {
  const id = formData.get('expenseId') as string;

  try {
    const res = await apiFetch(`${apiUrl}/adm/expenses?expenseId=${id}`, {
      method: 'DELETE',
    });

    const data = res.json();
    revalidatePath('/admin');

    return {
      status: res.status,
      data,
    };
  } catch (error) {
    return {
      error,
      data: {},
    };
  }
}
