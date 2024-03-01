import { Budgets } from '@prisma/client';
import { db } from '@/lib/PrismaClient';
import { getMe } from '@/data/UserDal';


export async function getCurrentUserBudget(): Promise<Budgets | null> {
  try {
    // Fetch all expenses
    const user = await getMe();
    if(user === null ) {
      throw new Error('Failed to get current user');
    }
    return await db.budgets.findUnique({
      where: {
        UserId: user.Id
      }
    });
  } catch (error) {
    // Handle exceptions here
    console.error(`Error getting budget: ${error}`);
    throw new Error('Failed to get budget.');
  }
}
