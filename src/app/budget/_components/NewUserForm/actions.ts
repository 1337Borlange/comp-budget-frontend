import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { apiFetch, getFormValue } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

/**
 * Adds a user by sending a POST request to the server.
 *
 * @param formData - The form data containing the user information.
 * @returns An object with the status code and the response data.
 */
export async function addUser(formData: FormData) {
  const responseBody = {} as any; // User request body
  const session = await getServerSession(authOptions);
  const token = (session as any)?.id_token;

  formData.forEach((value, property: string) => {
    if (typeof value !== 'undefined') {
      const newVal = getFormValue(value);
      responseBody[property as any] = newVal as never;
    }
  });

  try {
    const res = await apiFetch(token, `${apiUrl}/adm/users`, {
      method: 'POST',
      body: JSON.stringify(responseBody),
    });
    const data = await res.json();
    revalidatePath('/user');
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
