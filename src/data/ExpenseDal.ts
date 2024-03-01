import { Expenses } from '@prisma/client';
import { getMe } from '@/data/UserDal';
import { db } from '@/lib/PrismaClient';

export async function getCurrentUserExpenses(): Promise<Expenses[] | null> {
  try {
    // Fetch all expenses
    const user = await getMe();
    if(user === null ) {
      throw new Error('Failed to get current user');
    }
    return await db.expenses.findMany({
      where: {
        UserId: user.Id
      }
    });
  } catch (error) {
    // Handle exceptions here
    console.error(`Error getting expenses: ${error}`);
    throw new Error('Failed to get expenses.');
  }
}
