import { apiFetch } from '@/lib/apiFetch';
import { apiUrl } from '@/lib/settings';
import { Budget, CategoryDTO, ExpenseDTO, User } from '@/lib/types';

export async function getUser(id: string): Promise<User> {
  const response = await apiFetch(`${apiUrl}/users/${id}`);

  if (!response.ok) {
    throw new Error('Error fetching user');
  }

  return await response.json();
}

/**
 * Retrieves the list of users from the server.
 * @returns A Promise that resolves to the list of users.
 */
export async function getUsers(): Promise<User[]> {
  const response = await apiFetch(`${apiUrl}/adm/users`);

  if (!response.ok) {
    throw new Error('Error fetching users');
  }

  const data = await response.json();
  return data;
}

/**
 * Retrieves expenses for a specific user.
 * @param {string} userId - The user ID.
 * @returns {Promise<any>} - A promise that resolves to the expenses data.
 */
export async function getExpenses(userId: string): Promise<ExpenseDTO[]> {
  const response = await apiFetch(`${apiUrl}/expenses/${userId}`);

  if (!response.ok) {
    throw new Error('Error fetching expenses');
  }

  const data = await response.json();
  return data;
}

/**
 * Retrieves the budget data for a specific user.
 * @param userId - The user ID.
 * @returns A Promise that resolves to the budget data.
 */
export async function getBudget(userId: string): Promise<Budget> {
  const response = await apiFetch(`${apiUrl}/budgets/${userId}`);

  if (!response.ok) {
    throw new Error('Error fetching budget');
  }

  const data = await response.json();
  return data;
}

/**
 * Retrieves the categories from the server.
 * @returns A promise that resolves to an array of CategoryDTO objects.
 */
export async function getCategories(): Promise<CategoryDTO[]> {
  const response = await apiFetch(`${apiUrl}/categories`);

  if (!response.ok) {
    throw new Error('Error fetching categories');
  }

  const data = await response.json();
  return data;
}

/**
 * Retrieves the budget for a user.
 * @param userId - The ID of the user.
 * @returns A Promise that resolves to the user's budget, or undefined if the ID is not provided or an error occurs.
 */
export async function getUserBudget(userId: string): Promise<Budget> {
  const response = await apiFetch(`${apiUrl}/budgets?userId=${userId}`);

  if (!response.ok) {
    throw new Error('Error fetching budget');
  }

  const data = await response.json();
  return data;
}
