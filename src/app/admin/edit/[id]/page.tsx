import { ArrowLeftIcon } from '@/components/Icons/ArrowLeftIcon';
import Divider from '@/components/Divider';
import { AddExpense } from '../../components/AddExpense';
import Box from '@/components/Box';
import Link from 'next/link';
import { apiFetch } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit expense',
};

async function getCategories(token: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/categories`).then((res) => {
    return res.json();
  });
}
async function getCategoryTypes(token: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/categories/types`).then((res) => {
    return res.json();
  });
}
async function getExpense(token: string, id: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/adm/expenses?expenseId=${id}`).then(
    (res) => {
      return res.json();
    }
  );
}

export default async function Edit({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const token = (session as any).id_token;
  const categories = await getCategories(token);
  const expense = await getExpense(token, params.id);
  const categoryTypes = await getCategoryTypes(token);
  return (
    <div>
      <Box topSpacing="m" leftSpacing="m" rightSpacing="m">
        <Link className="button outline icon-left" href="/admin">
          <ArrowLeftIcon /> Back
        </Link>
      </Box>
      <Divider spacing="s" />
      <Box spacing="m" alignItems="stretch">
        <AddExpense
          reqType="update"
          categoryTypes={categoryTypes}
          categories={categories}
          expense={expense?.[0]}
        />
      </Box>
    </div>
  );
}
