import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { apiFetch } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { Budget, CategoryDTO, Expense, ExpenseDTO, User } from '@/lib/types';
import { getServerSession } from 'next-auth';

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
export async function getExpenses(id: string): Promise<ExpenseDTO[]> {
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
 * Retrieves the categories from the server.
 * @returns A promise that resolves to an array of CategoryDTO objects.
 */
export async function getCategories(): Promise<CategoryDTO[]> {
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
