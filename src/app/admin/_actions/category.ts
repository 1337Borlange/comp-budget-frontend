'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { apiFetch } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { formDataType } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function saveCategory(formData: FormData) {
  const postBody: formDataType = {};
  const session = await getServerSession(authOptions);
  const chk = formData.getAll('categoryType');
  if (chk.length === 0) {
    // throw new Error('Please select at least one category type.');
    return {
      status: 500,
      data: 'Please select at least one category type.',
    };
  } else {
    formData.forEach((value, property: string) => {
      if (typeof postBody[property] !== 'undefined') {
        postBody[property] = formData.getAll(property);
      } else {
        postBody[property] = value;
      }
    });

    const res = await apiFetch(
      (session as any)?.id_token,
      `${apiUrl}/adm/categories`,
      {
        method: 'POST',
        body: JSON.stringify(postBody),
      }
    );
    const data = await res.json();
    revalidatePath('/admin');
    return {
      status: res.status,
      data,
    };
  }
}
