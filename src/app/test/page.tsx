import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { redirect } from 'next/navigation';
import { getMe } from '@/data/UserDal';
import { isCurrentUserAdmin } from '@/data/AdminDal';
import { getCurrentUserBudget } from '@/data/BudgetDal';
import { getCurrentUserExpenses } from '@/data/ExpenseDal';


export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect('/api/auth/signin');

  const me = await getMe();
  const budget = await getCurrentUserBudget();
  const expenses = await getCurrentUserExpenses();
  if (!await isCurrentUserAdmin()) {
    redirect('/api/auth/signin');
  }

  return <>{JSON.stringify({ expenses })}</>;
}
