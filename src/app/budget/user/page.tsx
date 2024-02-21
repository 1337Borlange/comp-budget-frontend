import { User } from '@/lib/types';
import { UserProfile } from '@/components/UserProfile';
import Modal from '@/components/Modal';
import NewUserForm from '../_components/NewUserForm/NewUserForm';
import { getMe } from '../_actions/actions';
import Stats from '@/app/budget/_components/Stats';
import UpdateUser from '../_components/UpdateUser/UpdateUser';
import AddExpense from '../_components/AddExpense/AddExpense';
import { Suspense } from 'react';

type SearchParams = Record<string, string> | null | undefined;

interface BudgetPageProps {
  searchParams: SearchParams;
}

export default async function Page({ searchParams }: BudgetPageProps) {
  const selectedUserId = searchParams?.id ? String(searchParams.id) : undefined;
  const showAddUser = searchParams?.showAddUser === 'true';
  const showEditUser = searchParams?.showEditUser === 'true';
  const showStatistics = searchParams?.showStatistics === 'true';
  const showAddExpense = searchParams?.showAddExpense === 'true';

  let me = {} as User;

  if (!selectedUserId) {
    return <>No user found.</>;
  }

  try {
    me = await getMe();
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile selectedUserId={selectedUserId} showEdit={false} />
      </Suspense>

      {showAddUser && me?.isAdmin && (
        <Modal id="user-add-modal" blur visible={true}>
          <Suspense fallback={<div>Loading...</div>}>
             <NewUserForm />
          </Suspense>
        </Modal>
      )}

      {showEditUser && me?.isAdmin && (
        <Modal id="user-edit-modal" blur visible={true}>
          <Suspense fallback={<div>Loading...</div>}>
            <UpdateUser selectedUserId={selectedUserId} />
          </Suspense>
        </Modal>
      )}

      {showStatistics && me?.isAdmin && (
        <Modal id="statistics-modal" blur visible={true}>
          <Suspense fallback={<div>Loading...</div>}>
            <Stats selectedUserId={selectedUserId} />
          </Suspense>
        </Modal>
      )}

      {showAddExpense && me?.isAdmin && (
        <Modal id="statistics-modal" blur visible={true}>
          <AddExpense />
        </Modal>
      )}
    </>
  );
}
