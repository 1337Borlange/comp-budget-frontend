'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { apiFetch, getFormValue } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { BudgetRequestBody } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function updateBudget(formData: FormData) {
  const responseBody = {} as BudgetRequestBody;
  const session = await getServerSession(authOptions);

  formData.forEach((value, property: string) => {
    if (typeof value !== 'undefined') {
      const newVal = getFormValue(value);
      responseBody[property as keyof BudgetRequestBody] = newVal as never;
    }
  });

  try {
    const res = await apiFetch((session as any)?.id_token, `${apiUrl}/adm/budgets`, {
      method: 'PUT',
      body: JSON.stringify(responseBody),
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
