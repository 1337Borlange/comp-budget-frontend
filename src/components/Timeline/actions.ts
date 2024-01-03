import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { apiFetch } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function deleteExpense(formData: FormData) {
  const session = await getServerSession(authOptions);
  const id = formData.get('expenseId') as string;

  try {
    const res = await apiFetch(
      (session as any)?.id_token,
      `${apiUrl}/adm/expenses?expenseId=${id}`,
      {
        method: 'DELETE',
      },
    );

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
