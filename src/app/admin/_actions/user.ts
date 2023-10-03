'use server';

import { auth } from '@/lib/auth';
import { apiFetch, getFormValue } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { revalidatePath } from 'next/cache';

export async function updateUser(formData: FormData) {
  const responseBody = {} as any; // User request body
  const session = await auth();

  formData.forEach((value, property: string) => {
    if (typeof value !== 'undefined') {
      const newVal = getFormValue(value);
      responseBody[property as any] = newVal as never;
    }
  });

  try {
    const res = await apiFetch(
      session?.id_token,
      `${apiUrl}/adm/users`,
      {
        method: 'PUT',
        body: JSON.stringify(responseBody),
      }
    );
    const data = await res.json();
    revalidatePath('/admin');
    return {
      status: res.status,
      data,
    };
  } catch (error) {
    return {
      status: 500,
      error,
    };
  }

  // redirect('/admin');
}

export async function deleteUser(formData: FormData) {
  const session = await auth();
  const id = formData.get('userId') as string;

  try {
    const res = await apiFetch(
      session?.id_token,
      `${apiUrl}/adm/users?userId=${id}`,
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
    };
  }

  //   apiFetch()
}

export async function addUser(formData: FormData) {
  const responseBody = {} as any; // User request body
  const session = await auth();

  formData.forEach((value, property: string) => {
    if (typeof value !== 'undefined') {
      const newVal = getFormValue(value);
      responseBody[property as any] = newVal as never;
    }
  });

  try {
    const res = await apiFetch(
      session?.id_token,
      `${apiUrl}/adm/users`,
      {
        method: 'POST',
        body: JSON.stringify(responseBody),
      }
    );
    const data = await res.json();
    revalidatePath('/admin');
    return {
      status: res.status,
      data,
    };
  } catch (error) {
    return {
      status: 500,
      error,
    };
  }
}