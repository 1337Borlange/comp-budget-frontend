import { getServerSession } from 'next-auth';
import { getMe } from '../budget/_actions/actions';
import { getBudget, getCategories, getExpenses, getUser, getUsers } from '../budget/user/actions';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) redirect('/api/auth/signin');

  const me = await getMe();
  console.log(me);

  if (!me.isAdmin) {
    return null;
  }

  const user = await getUser(me.id);
  const users = await getUsers();
  const expenses = await getExpenses(me.id);
  const budget = await getBudget(me.id);
  const categories = await getCategories();
  const userBudget = await getBudget(me.id);

  return <>{JSON.stringify({ me, user, users, expenses, budget, categories, userBudget })}</>;
}
