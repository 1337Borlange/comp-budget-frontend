import Divider from '@/components/Divider';
import { InfoBox } from '@/components/InfoBox';
import { UserProfile } from '@/components/UserProfile';
import { Budget, Expense, Employee } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { apiFetch } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My budget',
};

async function getExpenses(token: string, id: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/expenses?userId=${id}`).then((res) => {
    return res.json();
  });
}
async function getBudget(token: string, id: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/budgets?userId=${id}`).then((res) => {
    return res.json();
  });
}

export default async function MyBudget() {
  const session = await getServerSession(authOptions);
  let budget: Budget | undefined = undefined;
  let expenses: Expense[] = [];
  try {
    budget = await getBudget(
      (session as any).id_token,
      (session as any).userId
    );
    expenses = await getExpenses(
      (session as any).id_token,
      (session as any).userId
    );
  } catch (e) {
    console.error(e);
  }
  // console.log('Session: ', session);
  console.log(budget);
  return (
    <div className="content-wrapper">
      <h2 style={{ lineHeight: 1 }}>My budget</h2>
      <Divider spacing="m" />
      <InfoBox>
        Expenses added within the last two months may not be visible in your
        list, or deducted from your balance, due to manual handling.
      </InfoBox>
      <UserProfile
        user={session?.user as Employee}
        showEdit={false}
        title="My expenses"
        budget={budget}
        expenses={expenses}
      />
    </div>
  );
}
