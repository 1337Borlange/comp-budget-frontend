'use server';

import { revalidatePath } from 'next/cache';

import { apiFetch } from '@/lib/apiFetch';
import { apiUrl } from '@/lib/settings';
import { formDataType } from '@/lib/types';

export async function saveCategory(formData: FormData) {
  const postBody: formDataType = {};

  formData.forEach((value, property: string) => {
    if (typeof postBody[property] !== 'undefined') {
      postBody[property] = formData.getAll(property);
    } else {
      postBody[property] = value;
    }
  });

  try {
    const res = await apiFetch(`${apiUrl}/adm/categories`, {
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
