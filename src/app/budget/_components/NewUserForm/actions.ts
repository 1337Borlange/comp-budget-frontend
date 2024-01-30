import { getFormValue } from '@/lib/helpers';
import { apiFetch } from '@/lib/apiFetch';
import { apiUrl } from '@/lib/settings';
import { revalidatePath } from 'next/cache';

/**
 * Adds a user by sending a POST request to the server.
 *
 * @param formData - The form data containing the user information.
 * @returns An object with the status code and the response data.
 */
export async function addUser(formData: FormData) {
  const responseBody = {} as any; // User request body

  formData.forEach((value, property: string) => {
    if (typeof value !== 'undefined') {
      const newVal = getFormValue(value);
      responseBody[property as any] = newVal as never;
    }
  });

  try {
    const res = await apiFetch(`${apiUrl}/adm/users`, {
      method: 'POST',
      body: JSON.stringify(responseBody),
    });
    const data = await res.json();
    revalidatePath('/budget');
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
