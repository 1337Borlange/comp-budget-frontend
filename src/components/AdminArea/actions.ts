import { apiFetch } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { Budget, Expense, User } from '@/lib/types';

/**
 * Retrieves the list of users from the server.
 * @param token - The authentication token.
 * @returns A Promise that resolves to the list of users.
 */
export async function getUsers(token: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/adm/users`).then((res) => {
    return res.json();
  });
}

/**
 * Retrieves the user information for the authenticated user.
 * @param token - The authentication token.
 * @returns A Promise that resolves to the User object if successful, or undefined if there was an error.
 */
export async function getMe(token: string): Promise<User | undefined> {
  return apiFetch(token, `${apiUrl}/me`).then((res) => {
    return res.json();
  });
}

/**
 * Retrieves the expenses of a user.
 * @param token - The authentication token.
 * @param id - The ID of the user. If not provided, an empty array will be returned.
 * @returns A promise that resolves to an array of expenses.
 */
export async function getUserExpenses(token: string, id?: string): Promise<Expense[]> {
  if (!id) {
    return Promise.resolve([]);
  }
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
 * @param token - The authentication token.
 * @param id - The ID of the user.
 * @returns A Promise that resolves to the user's budget, or undefined if the ID is not provided or an error occurs.
 */
export async function getUserBudget(token: string, id?: string): Promise<Budget | undefined> {
  if (!id) {
    return Promise.resolve(undefined);
  }
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
 * Retrieves the categories from the API.
 * @param token - The authentication token.
 * @returns A Promise that resolves to the categories data.
 */
export async function getCategories(token: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/categories`).then((res) => {
    return res.json();
  });
}

/**
 * Fetches the category types from the API.
 * @param token - The authentication token.
 * @returns A Promise that resolves to the category types.
 */
export async function getCategoryTypes(token: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/categories/types`).then((res) => {
    return res.json();
  });
}
