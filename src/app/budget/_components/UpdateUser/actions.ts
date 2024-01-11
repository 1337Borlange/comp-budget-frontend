import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { apiFetch } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { User } from '@/lib/types';

export async function updateUser(formData: FormData) {
  console.log('updateUser');
  const session = await getServerSession(authOptions);
  const id = String(formData.get('userId'));

  const updatedUser: User = {
    id,
    name: String(formData.get('name')),
    employeeNumber: String(formData.get('employeeNumber')),
    departmentNumber: String(formData.get('departmentNumber')),
    personalNumber: String(formData.get('personalNumber')),
    phoneNumber: String(formData.get('phoneNumber')),
    address: String(formData.get('address')),
    email: String(formData.get('email')),
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
    console.log(res);
    const data = await res.json();
    revalidatePath(`/budget/user?id=${id}`);
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
    revalidatePath('/budget');
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
