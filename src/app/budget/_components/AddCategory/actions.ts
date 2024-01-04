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
  const chk = formData.getAll('categoryType');
  if (chk.length === 0) {
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

    const res = await apiFetch((session as any)?.id_token, `${apiUrl}/adm/categories`, {
      method: 'POST',
      body: JSON.stringify(postBody),
    });
    const data = await res.json();
    revalidatePath('/budget');
    return {
      status: res.status,
      data,
    };
  }
}
