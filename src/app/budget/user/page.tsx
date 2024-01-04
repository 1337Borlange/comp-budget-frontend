import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Budget, CategoryDTO, Expense, User } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import {
  getUsers,
  getCategories,
  getCategoryTypes,
  getUserBudget,
  getUserExpenses,
  getBudget,
  getExpenses,
} from './actions';
import { UserProfile } from '@/components/UserProfile';
import Modal from '@/components/Modal';
import NewUserForm from '../_components/NewUserForm/NewUserForm';
import { getMe } from '../_actions/actions';

import { UpdateUser } from '@/app/budget/_components/UpdateUser/UpdateUser';
import Stats from '@/app/budget/_components/Stats';
import { AddExpense } from '@/app/budget/_components/AddExpense/AddExpense';

type SearchParams = Record<string, string> | null | undefined;

interface BudgetPageProps {
  searchParams: SearchParams;
}

export default async function Page({ searchParams }: BudgetPageProps) {
  const id = searchParams?.id ? String(searchParams.id) : undefined;
  const showAddUser = searchParams?.showAddUser === 'true';
  const showEditUser = searchParams?.showEditUser === 'true';
  const showStatistics = searchParams?.showStatistics === 'true';
  const showAddExpense = searchParams?.showAddExpense === 'true';
  const session = await getServerSession(authOptions);
  const isAdmin = session && (session as any).isAdmin;

  if (!isAdmin) {
    notFound();
  }

  let users: User[] = [];
  let me = {} as User;
  let selectedUser: User | undefined = undefined;
  let budget: Budget | undefined = undefined;
  let expenses: Expense[] = [];
  let userExpenses: Expense[] = [];
  let userBudget: Budget | undefined = undefined;
  let categoryTypes;
  let categories: CategoryDTO[] = [];

  if (!id) {
    return <>No user found.</>;
  }

  try {
    users = await getUsers();
    me = await getMe();
    selectedUser = users.find((user: User) => String(user.id) === id);
    budget = await getBudget(id);
    expenses = await getExpenses(id);
    userExpenses = await getUserExpenses(id);
    userBudget = await getUserBudget(id);
    categoryTypes = await getCategoryTypes();
    categories = await getCategories();
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      {categories}
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

      {showAddExpense && (
        <Modal id="statistics-modal" blur visible={true}>
          <AddExpense
            categoryTypes={categoryTypes}
            reqType="create"
            categories={categories}
            user={selectedUser}
          />
        </Modal>
      )}
    </>
  );
}
