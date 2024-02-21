import { getMe } from '../budget/_actions/actions';
import { getBudget, getCategories, getExpenses, getUser, getUsers } from '../budget/user/actions';
import { auth } from '@/lib/auth';

export default async function Page() {
  const session = await auth();
  const me = await getMe();

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
