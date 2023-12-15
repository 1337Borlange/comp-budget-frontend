'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { apiFetch, getFormValue } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { User } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function updateUser(formData: FormData) {
  const session = await getServerSession(authOptions);

  const updatedUser: User = {
    id: String(formData.get('userId')),
    name: String(formData.get('name')),
    email: String(formData.get('email')),
    employeeNumber: String(formData.get('employeeNumber')),
    departmentNumber: String(formData.get('departmentNumber')),
    personalNumber: String(formData.get('personalNumber')),
    phoneNumber: String(formData.get('phoneNumber')),
    address: String(formData.get('address')),
    shirtSize: String(formData.get('shirtSize')),
    allergies: String(formData.get('allergies')),
    office: String(formData.get('office')),
    manager: String(formData.get('manager')),
    isAdmin: formData.get('isAdmin') === 'on' ? true : false,
    isManager: formData.get('isManager') === 'on' ? true : false,
  };

  try {
    const res = await apiFetch((session as any)?.id_token, `${apiUrl}/adm/users`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
    });
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

export async function deleteUser(formData: FormData) {
  const session = await getServerSession(authOptions);
  const id = formData.get('userId') as string;

  try {
    const res = await apiFetch((session as any)?.id_token, `${apiUrl}/adm/users?userId=${id}`, {
      method: 'DELETE',
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
    };
  }
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

  try {
    const res = await apiFetch((session as any)?.id_token, `${apiUrl}/adm/users`, {
      method: 'POST',
      body: JSON.stringify(responseBody),
    });
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
