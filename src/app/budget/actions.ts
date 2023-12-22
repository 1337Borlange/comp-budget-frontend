import { apiFetch } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { User } from '@/lib/types';

/**
 * Retrieves expenses for a specific user.
 * @param {string} token - The authentication token.
 * @param {string} id - The user ID.
 * @returns {Promise<any>} - A promise that resolves to the expenses data.
 */
export async function getExpenses(token: string, id: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/expenses?userId=${id}`).then((res) => {
    return res.json();
  });
}

/**
 * Retrieves the budget data for a specific user.
 * @param token - The authentication token.
 * @param id - The user ID.
 * @returns A Promise that resolves to the budget data.
 */
export async function getBudget(token: string, id: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/budgets?userId=${id}`).then((res) => {
    return res.json();
  });
}

/**
 * Retrieves user information.
 * @param token - The authentication token.
 * @returns A Promise that resolves to a User object.
 */
export async function getMe(token: string): Promise<User> {
  return apiFetch(token, `${apiUrl}/me`).then((res) => {
    return res.json();
  });
}
