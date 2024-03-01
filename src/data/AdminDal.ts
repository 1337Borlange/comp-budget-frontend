import { db } from '@/lib/PrismaClient';
import { Expenses, Prisma, Users } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { getUserByEmail } from '@/data/UserDal';

import UsersCreateInput = Prisma.UsersCreateInput;
import UsersUpdateInput = Prisma.UsersUpdateInput;
import BudgetsUpdateInput = Prisma.BudgetsUpdateInput;
import ExpensesCreateInput = Prisma.ExpensesCreateInput;
import ExpensesUpdateInput = Prisma.ExpensesUpdateInput;
import CategoriesCreateInput = Prisma.CategoriesCreateInput;



//Users have multiple roles, so this is always returned as an array,
// even admin users have the user role. so we can just check if there is a record where the given user id has the Admin role.

//TODO: maybe make users role included in server session, so we can avoid this.
export async function isCurrentUserAdmin():Promise<boolean> {
  const session = await getServerSession(authOptions);
  if(!session) return false;
  const currentUser = await getUserByEmail(session.user?.email as string);
  return !! await db.userRoles.findMany({
    where:{
      UserId: currentUser?.Id,
      Name: 'Admin'
    }
  })
}


export async function grantUserAdminRole(userId: number): Promise<void>{
  if(!await isCurrentUserAdmin()) return;

  await db.userRoles.create({
    data:{
      UserId: userId,
      Name: 'Admin'
    }
  })
}


export async function updateUser(userId: number, input: UsersUpdateInput): Promise<void> {
  try {
    // Check if the current user is an admin
    if (!await isCurrentUserAdmin()) {
      throw new Error('Permission denied. Only admins can update users.');
    }

    // Check if the user exists
    const existingUser = await db.users.findUnique({
      where: { Id: userId },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    // Update the user and handle related entities
    await db.users.update({
      where: { Id: userId },
      data: {
        ...input,
      },
    });
  } catch (error) {
    // Handle exceptions here
    console.error(`Error updating user: ${error}`);
    throw new Error('Failed to update user.');
  }
}

export async function deleteUser(userId: number): Promise<void> {
  try {
    // Check if the current user is an admin
    if (!await isCurrentUserAdmin()) {
      throw new Error('Permission denied. Only admins can delete users.');
    }

    // Check if the user exists
    const existingUser = await db.users.findUnique({
      where: { Id: userId },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    // Delete the user and roles
    await db.users.delete({
      where: { Id: userId },
    });

    await db.userRoles.deleteMany({
      where: { UserId: userId }
    })
  } catch (error) {

    console.error(`Error deleting user: ${error}`);
    throw new Error('Failed to delete user.');
  }
}


//will likely need to include default budget, the settings for which should come from .env
export async function addUser(user: UsersCreateInput): Promise<void> {
  try {
    // Check if the current user is an admin
    if (!await isCurrentUserAdmin()) {
      throw new Error('Permission denied. Only admins can add users.');
    }

    // Add the user and set default role
     await db.users.create({
      data: {
        ...user,
        UserRoles: {
          create: [
            {
              Name: 'User',
            },
          ],
        },

      Budgets:{
        create:
          {
            Start: new Date().toISOString().slice(0, 19).replace('T', ' '),
            HardwareBudget: 18.000,
            Comment: "Standard budget",
          },
      }
      },
    });
  } catch (error) {
    // Handle exceptions here
    console.error(`Error adding user: ${error}`);
    throw new Error('Failed to add user.');
  }
}

//TODO: paginate
export async function getAllUsers(): Promise<Users[]> {
  try {
    if (!await isCurrentUserAdmin()) {
      throw new Error('Permission denied. Only admins can fetch all users');
    }

    return await db.users.findMany();
  } catch (error) {
    // Handle exceptions here
    console.error(`Error getting all users: ${error}`);
    throw new Error('Failed to get users.');
  }
}


export async function updateUserBudget(userId: number, input: BudgetsUpdateInput): Promise<void> {
  try {
    // Check if the current user is an admin
    if (!await isCurrentUserAdmin()) {
      throw new Error('Permission denied. Only admins can update budgets.');
    }


    const existingBudget = await db.budgets.findUnique({
      where: { UserId: userId },
    });

    if (!existingBudget) {
      throw new Error('budget not found');
    }

    await db.budgets.update({
      where: { UserId: userId },
      data: {
        ...input,
      },
    });
  } catch (error) {
    // Handle exceptions here
    console.error(`Error updating user: ${error}`);
    throw new Error('Failed to update budget.');
  }
}



//Note: This gets all expenses in the system,
// I don't know why it's here. but it was in the old BE, so I ported it here too. -- Lewis Clarke
export async function getAllExpenses(): Promise<Expenses[] | null> {
  try {
    if (!await isCurrentUserAdmin()) {
      throw new Error('Permission denied. Only admins can fetch expenses.');
    }
    // Fetch all expenses
    return await db.expenses.findMany();
  } catch (error) {
    // Handle exceptions here
    console.error(`Error getting all expenses: ${error}`);
    throw new Error('Failed to get expenses.');
  }
}

export async function getAllExpensesForUserByUserId(userId: number): Promise<Expenses[] | null> {
  try {
    if (!await isCurrentUserAdmin()) {
      throw new Error('Permission denied. Only admins can see users expenses.');
    }
    // Fetch all expenses
    return await db.expenses.findMany({
      where: {
        UserId: userId
      }
    });
  } catch (error) {
    // Handle exceptions here
    console.error(`Error getting all expenses: ${error}`);
    throw new Error('Failed to get expenses.');
  }
}


export async function getExpenseById(expenseId: number): Promise<Expenses | null> {
  try {
    if (!await isCurrentUserAdmin()) {
      throw new Error('Permission denied. Only admins can see expenses.');
    }
    // Fetch all expenses
    return await db.expenses.findUnique({
      where: {
        Id: expenseId
      }
    });
  } catch (error) {
    // Handle exceptions here
    console.error(`Error getting expense: ${error}`);
    throw new Error('Failed to get expense.');
  }
}

export async function addExpense(expense: ExpensesCreateInput): Promise<void> {
  try {
    // Check if the current user is an admin
    if (!await isCurrentUserAdmin()) {
      throw new Error('Permission denied. Only admins can add expenses.');
    }

    // Add the user and set default role
     await db.expenses.create({
      data: {
        ...expense,
      },
    });
  } catch (error) {
    // Handle exceptions here
    console.error(`Error adding expense: ${error}`);
    throw new Error('Failed to add expense.');
  }
}


export async function updateUserExpense(expenseId: number, input: ExpensesUpdateInput): Promise<void> {
  try {
    // Check if the current user is an admin
    if (!await isCurrentUserAdmin()) {
      throw new Error('Permission denied. Only admins can update expenses.');
    }

    // Update the budget
    await db.expenses.update({
      where: { Id: expenseId },
      data: {
        ...input,
      },
    });
  } catch (error) {
    // Handle exceptions here
    console.error(`Error updating expense: ${error}`);
    throw new Error('Failed to update expense.');
  }
}


export async function deleteExpense(expenseId: number): Promise<void> {
  try {
    // Check if the current user is an admin
    if (!await isCurrentUserAdmin()) {
      throw new Error('Permission denied. Only admins can delete expenses.');
    }

    // Delete the user and roles
    await db.expenses.delete({
      where: { Id: expenseId },
    });

  } catch (error) {
    // Handle exceptions here
    console.error(`Error deleting expense: ${error}`);
    throw new Error('Failed to delete expense.');
  }
}


export async function addCategory(category: CategoriesCreateInput ): Promise<void> {
  try {
    // Check if the current user is an admin
    if (!await isCurrentUserAdmin()) {
      throw new Error('Permission denied. Only admins can add categories.');
    }

     await db.categories.create({
      data: {
        ...category,
      },
    });
  } catch (error) {
    // Handle exceptions here
    console.error(`Error adding category: ${error}`);
    throw new Error('Failed to add category.');
  }
}