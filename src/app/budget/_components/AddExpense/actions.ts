'use server';

import { revalidatePath } from 'next/cache';

import { apiUrl } from '@/lib/settings';
import { apiFetch } from '@/lib/apiFetch';
import { ExpenseDTO } from '@/lib/types';

export async function saveExpense(expense: ExpenseDTO) {
  if (!expense.categoryId) {
    return {
      status: 400,
      message: 'Category is required',
    };
  }

  try {
    const res = await apiFetch(`${apiUrl}/adm/expenses`, {
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
