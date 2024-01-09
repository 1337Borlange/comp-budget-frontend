'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { apiFetch } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { formDataType } from '@/lib/types';

export async function saveCategory(formData: FormData) {
  const postBody: formDataType = {};
  const session = await getServerSession(authOptions);

  formData.forEach((value, property: string) => {
    if (typeof postBody[property] !== 'undefined') {
      postBody[property] = formData.getAll(property);
    } else {
      postBody[property] = value;
    }
  });

  console.log('postBody', postBody);

  try {
    const res = await apiFetch((session as any)?.id_token, `${apiUrl}/adm/categories`, {
      method: 'POST',
      body: JSON.stringify(postBody),
    });

    const data = await res.json();
    revalidatePath('/categories');
    return {
      status: res.status,
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'Error',
      message: (error as any)?.message ?? 'Something went wrong',
    };
  }
}
