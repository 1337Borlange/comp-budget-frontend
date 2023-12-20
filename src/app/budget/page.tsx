import { UserProfile } from '@/components/UserProfile';
import { Budget, Expense, User } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Metadata } from 'next';
import { getBudget, getExpenses } from './actions';
import { useEffect } from 'react';

export const metadata: Metadata = {
  title: 'My budget',
};

export default async function Budget() {
  const session = await getServerSession(authOptions);
  let budget: Budget | undefined = undefined;
  let expenses: Expense[] = [];

  try {
    budget = await getBudget((session as any).id_token, (session as any).internalUserId);
    expenses = await getExpenses((session as any).id_token, (session as any).internalUserId);
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      {/* TODO: Show in a toast instead */}
      {/* <InfoBox>
        Expenses added within the last two months may not be visible in your list, or deducted from
        your balance, due to manual handling.
      </InfoBox> */}
      <UserProfile
        user={session?.user as User}
        showEdit={false}
        title="My budget"
        budget={budget}
        expenses={expenses}
      />
    </>
  );
}
