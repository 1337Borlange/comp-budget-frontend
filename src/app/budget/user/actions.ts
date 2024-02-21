import { apiFetch } from '@/lib/apiFetch';
import { apiUrl } from '@/lib/settings';
import { Budget, CategoryDTO, ExpenseDTO, User } from '@/lib/types';

export async function getUser(id: string | undefined): Promise<User | undefined> {
  if (!id) {
    return Promise.resolve(undefined);
  }

  try {
    const response = await apiFetch(`${apiUrl}/users/${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching user with ID ${id}. Error: ${error}`);
    return;
  }
}

/**
 * Retrieves the list of users from the server.
 * @returns A Promise that resolves to the list of users.
 */
export async function getUsers(): Promise<User[] | undefined> {
  try {
    const response = await apiFetch(`${apiUrl}/adm/users`);

    if (!response.ok) {
      throw new Error('Error fetching users');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users. Error: ', error);
    return [] as User[];
  }
}

/**
 * Retrieves expenses for a specific user.
 * @param {string} id - The user ID.
 * @returns {Promise<any>} - A promise that resolves to the expenses data.
 */
export async function getExpenses(id: string): Promise<ExpenseDTO[] | undefined> {
  try {
    const response = await apiFetch(`${apiUrl}/expenses/${id}`);

    if (!response.ok) {
      throw new Error('Error fetching expenses');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching expenses. Error: ', error);
    return [] as ExpenseDTO[];
  }
}

/**
 * Retrieves the budget data for a specific user.
 * @param id - The user ID.
 * @returns A Promise that resolves to the budget data.
 */
export async function getBudget(id: string): Promise<Budget | undefined> {

  try {
    const response = await apiFetch(`${apiUrl}/budgets/${id}`);

    if (!response.ok) {
      throw new Error('Error fetching budget');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching budget. Error: ', error);
    return;
  }
}

/**
 * Retrieves the categories from the server.
 * @returns A promise that resolves to an array of CategoryDTO objects.
 */
export async function getCategories(): Promise<CategoryDTO[]> {
  try {
    const response = await apiFetch(`${apiUrl}/categories`);

    if (!response.ok) {
      throw new Error('Error fetching categories');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [] as CategoryDTO[];
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

  try {
    const response = await apiFetch(`${apiUrl}/budgets?userId=${id}`);

    if (!response.ok) {
      throw new Error('Error fetching budget');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching budget. Error: ', error);
    return;
  }
}
