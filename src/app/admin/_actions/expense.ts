'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { apiFetch, getFormValue } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { NewExpense } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function saveExpense(formData: FormData) {
  const responseBody = {} as NewExpense;
  const session = await getServerSession(authOptions);
  const method = formData.get('reqType') as string;
  formData.delete('reqType');
  formData.forEach((value, property: string) => {
    if (typeof value !== 'undefined') {
      const newVal = getFormValue(value);
      responseBody[property as keyof NewExpense] = newVal as never;
    }
  });

  try {
    const res = await apiFetch(
      (session as any)?.id_token,
      `${apiUrl}/adm/expenses`,
      {
        method,
        body: JSON.stringify(responseBody),
      }
    );
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
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
  // redirect('/admin');
}
export async function deleteExpense(formData: FormData) {
  const session = await getServerSession(authOptions);
  const id = formData.get('expenseId') as string;

  try {
    const res = await apiFetch(
      (session as any)?.id_token,
      `${apiUrl}/adm/expenses?expenseId=${id}`,
      {
        method: 'DELETE',
      }
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
  // redirect('/admin');
}
