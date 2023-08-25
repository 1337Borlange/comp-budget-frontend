import { ArrowLeftIcon } from '@/components/Icons/ArrowLeftIcon';
import Divider from '@/components/Divider';
import { AddExpense } from '../components/AddExpense';
import Box from '@/components/Box';
import Link from 'next/link';
import { apiFetch } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

async function getCategories(token: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/categories`).then((res) => {
    return res.json();
  });
}

export default async function Edit() {
  const session = await getServerSession(authOptions);
  const categories = await getCategories((session as any).id_token);

  return (
    <div>
      <Box topSpacing="m" leftSpacing="m" rightSpacing="m">
        <Link className="button outline icon-left" href="/admin">
          <ArrowLeftIcon /> Back
        </Link>
      </Box>
      <Divider spacing="s" />
      <Box spacing="m" alignItems="stretch">
        <AddExpense reqType="update" categories={categories} />
      </Box>
    </div>
  );
}
