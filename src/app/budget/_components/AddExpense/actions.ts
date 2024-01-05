'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { apiUrl } from '@/lib/settings';
import { apiFetch, getFormValue } from '@/lib/helpers';
import { NewExpense } from '@/lib/types';

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
    const res = await apiFetch((session as any)?.id_token, `${apiUrl}/adm/expenses`, {
      method,
      body: JSON.stringify(responseBody),
    });
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    const data = res.json();
    revalidatePath('/budget');
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
