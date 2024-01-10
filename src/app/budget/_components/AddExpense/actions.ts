'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { apiUrl } from '@/lib/settings';
import { apiFetch } from '@/lib/helpers';
import { ExpenseDTO } from '@/lib/types';

export async function saveExpense(expense: ExpenseDTO) {
  const session = await getServerSession(authOptions);

  if (!expense.categoryId) {
    return {
      status: 400,
      message: 'Category is required',
    };
  }

  try {
    const res = await apiFetch((session as any)?.id_token, `${apiUrl}/adm/expenses`, {
      method: 'POST',
      body: JSON.stringify(expense),
    });
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    const data = res.json();
    revalidatePath('/categories');
    return {
      status: res.status,
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: (error as any)?.message ?? 'Something went wrong',
    };
  }
}
