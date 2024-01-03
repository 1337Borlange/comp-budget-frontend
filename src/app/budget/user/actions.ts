import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { apiFetch, getFormValue } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { Budget, Expense, User } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

/**
 * Retrieves the list of users from the server.
 * @returns A Promise that resolves to the list of users.
 */
export async function getUsers(): Promise<any> {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.id_token;

  return apiFetch(token, `${apiUrl}/adm/users`).then((res) => {
    return res.json();
  });
}

/**
 * Retrieves expenses for a specific user.
 * @param {string} id - The user ID.
 * @returns {Promise<any>} - A promise that resolves to the expenses data.
 */
export async function getExpenses(id: string): Promise<any> {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.id_token;

  return apiFetch(token, `${apiUrl}/expenses?userId=${id}`).then((res) => {
    return res.json();
  });
}

/**
 * Retrieves the budget data for a specific user.
 * @param id - The user ID.
 * @returns A Promise that resolves to the budget data.
 */
export async function getBudget(id: string): Promise<any> {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.id_token;

  return apiFetch(token, `${apiUrl}/budgets?userId=${id}`).then((res) => {
    return res.json();
  });
}

/**
 * Retrieves the categories from the API.
 * @param token - The authentication token.
 * @returns A Promise that resolves to the categories data.
 */
export async function getCategories(): Promise<any> {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.id_token;

  return apiFetch(token, `${apiUrl}/categories`).then((res) => {
    return res.json();
  });
}

/**
 * Fetches the category types from the API.
 * @returns A Promise that resolves to the category types.
 */
export async function getCategoryTypes(): Promise<any> {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.id_token;

  return apiFetch(token, `${apiUrl}/categories/types`).then((res) => {
    return res.json();
  });
}

/**
 * Retrieves the expenses of a user.
 * @param id - The ID of the user. If not provided, an empty array will be returned.
 * @returns A promise that resolves to an array of expenses.
 */
export async function getUserExpenses(id?: string): Promise<Expense[]> {
  if (!id) {
    return Promise.resolve([]);
  }
  const session = await getServerSession(authOptions);
  const token = (session as any)?.id_token;

  try {
    const result = await apiFetch(token, `${apiUrl}/adm/expenses?userId=${id}`);
    if (result.ok) {
      const data = await result.json();
      return data;
    }
    return [];
  } catch (error) {
    return [];
  }
}

/**
 * Retrieves the budget for a user.
 * @param id - The ID of the user.
 * @returns A Promise that resolves to the user's budget, or undefined if the ID is not provided or an error occurs.
 */
export async function getUserBudget(id?: string): Promise<Budget | undefined> {
  if (!id) {
    return Promise.resolve(undefined);
  }

  const session = await getServerSession(authOptions);
  const token = (session as any)?.id_token;

  try {
    const result = await apiFetch(token, `${apiUrl}/budgets?userId=${id}`);
    if (result.ok) {
      const data = await result.json();
      return data;
    }
    return;
  } catch (error) {
    return;
  }
}

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
