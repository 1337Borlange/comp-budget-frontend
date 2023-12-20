import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Budget, Expense, User } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { getUsers } from './actions';
import { UserProfile } from '@/components/UserProfile';
import { getBudget, getExpenses } from '../actions';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const { id } = searchParams;
  const session = await getServerSession(authOptions);
  const isAdmin = session && (session as any).isAdmin;

  if (!isAdmin) {
    notFound();
  }

  let users: User[] = [];
  let selectedUser: User | undefined = undefined;
  let budget: Budget | undefined = undefined;
  let expenses: Expense[] = [];

  try {
    users = await getUsers((session as any).id_token);
    selectedUser = users.find((user: User) => String(user.id) === id);
    budget = await getBudget((session as any).id_token, id);
    expenses = await getExpenses((session as any).id_token, id);
  } catch (e) {
    console.error(e);
  }

  return (
    <UserProfile
      user={selectedUser}
      showEdit={false}
      title={`${selectedUser?.name || 'User'}`}
      budget={budget}
      expenses={expenses}
    />
  );
}
