'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { apiFetch, getFormValue } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { BudgetRequestBody, NewExpense } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

interface formDataType {
  [key: string]: FormDataEntryValue | FormDataEntryValue[];
}

export async function saveCategory(formData: FormData) {
  const postBody: formDataType = {};
  const session = await getServerSession(authOptions);
  const chk = formData.getAll('categoryType');
  if (chk.length === 0) {
    throw new Error('Please select at least one category type.');
  } else {
    formData.forEach((value, property: string) => {
      if (typeof postBody[property] !== 'undefined') {
        postBody[property] = formData.getAll(property);
      } else {
        postBody[property] = value;
      }
    });
    console.log(postBody);
    await apiFetch((session as any)?.id_token, `${apiUrl}/adm/categories`, {
      method: 'POST',
      body: JSON.stringify(postBody),
    });
    revalidatePath('/admin');
  }
}
export async function saveExpense(formData: FormData) {
  const responseBody = {} as NewExpense;
  const session = await getServerSession(authOptions);
  const meth = formData.get('reqType') as string;
  console.log(meth);
  formData.delete('reqType');
  formData.forEach((value, property: string) => {
    console.log(value, property);

    // let _value = value;
    if (typeof value !== 'undefined') {
      const newVal = getFormValue(value);
      responseBody[property as keyof NewExpense] = newVal as never;
    }
  });

  await apiFetch((session as any)?.id_token, `${apiUrl}/adm/expenses`, {
    method: meth,
    body: JSON.stringify(responseBody),
  });
  revalidatePath('/admin');
  redirect('/admin');
}
export async function deleteExpense(formData: FormData) {
  const session = await getServerSession(authOptions);
  const id = formData.get('expenseId') as string;

  await apiFetch(
    (session as any)?.id_token,
    `${apiUrl}/adm/expenses?id=${id}`,
    {
      method: 'DELETE',
    }
  );
  revalidatePath('/admin');
  redirect('/admin');
}

export async function saveBudget(formData: FormData) {
  const responseBody = {} as BudgetRequestBody;
  const session = await getServerSession(authOptions);
  formData.forEach((value, property: string) => {
    if (typeof value !== 'undefined') {
      const newVal = getFormValue(value);
      responseBody[property as keyof BudgetRequestBody] = newVal as never;
    }
  });

  console.log(responseBody);

  await apiFetch((session as any)?.id_token, `${apiUrl}/adm/budgets`, {
    method: 'PUT',
    body: JSON.stringify(responseBody),
  });
  revalidatePath('/admin');
  redirect('/admin');
  //   apiFetch()
}
