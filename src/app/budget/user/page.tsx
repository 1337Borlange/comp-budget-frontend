import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Budget, Expense, User } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { getUsers } from './actions';
import { UserProfile } from '@/components/UserProfile';
import { getBudget, getExpenses, getMe } from '../actions';
import Modal from '@/components/Modal';
import NewUserForm from '@/app/admin/_components/NewUserForm';
import { UpdateUser } from '@/app/admin/_components/UpdateUser';
import Stats from '@/app/admin/_components/Stats';

type SearchParams = Record<string, string> | null | undefined;

interface BudgetPageProps {
  searchParams: SearchParams;
}

export default async function Page({ searchParams }: BudgetPageProps) {
  const id = searchParams?.id ? String(searchParams.id) : undefined;
  const showAddUser = searchParams?.showAddUser === 'true';
  const showEditUser = searchParams?.showEditUser === 'true';
  const showStatistics = searchParams?.showStatistics === 'true';
  const session = await getServerSession(authOptions);
  const isAdmin = session && (session as any).isAdmin;

  if (!isAdmin) {
    notFound();
  }

  let users: User[] = [];
  let me: User | undefined;
  let selectedUser: User | undefined = undefined;
  let budget: Budget | undefined = undefined;
  let expenses: Expense[] = [];

  if (!id) {
    return <>No user found.</>;
  }

  try {
    users = await getUsers((session as any).id_token);
    me = await getMe((session as any).id_token);
    selectedUser = users.find((user: User) => String(user.id) === id);
    budget = await getBudget((session as any).id_token, id);
    expenses = await getExpenses((session as any).id_token, id);
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <UserProfile
        user={selectedUser}
        showEdit={false}
        title={`${selectedUser?.name || 'User'}`}
        budget={budget}
        expenses={expenses}
      />

      {showAddUser && (
        <Modal id="user-add-modal" blur visible={true}>
          <NewUserForm allUsers={users} />
        </Modal>
      )}

      {showEditUser && (
        <Modal id="user-edit-modal" blur visible={true}>
          <UpdateUser me={me} user={selectedUser} allUsers={users} />
        </Modal>
      )}

      {showStatistics && (
        <Modal id="statistics-modal" blur visible={true}>
          <Stats />
        </Modal>
      )}
    </>
  );
}
