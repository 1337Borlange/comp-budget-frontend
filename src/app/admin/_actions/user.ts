'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { apiFetch, getFormValue } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateUser(formData: FormData) {
  const responseBody = {} as any; // User request body
  const session = await getServerSession(authOptions);
  formData.forEach((value, property: string) => {
    if (typeof value !== 'undefined') {
      const newVal = getFormValue(value);
      responseBody[property as any] = newVal as never;
    }
  });

  console.log(responseBody);

  try {
    const res = await apiFetch(
      (session as any)?.id_token,
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
  const session = await getServerSession(authOptions);
  const id = formData.get('userId') as string;

  try {
    const res = await apiFetch(
      (session as any)?.id_token,
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
  const session = await getServerSession(authOptions);
  formData.forEach((value, property: string) => {
    if (typeof value !== 'undefined') {
      const newVal = getFormValue(value);
      responseBody[property as any] = newVal as never;
    }
  });

  console.log(responseBody);

  try {
    const res = await apiFetch(
      (session as any)?.id_token,
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
