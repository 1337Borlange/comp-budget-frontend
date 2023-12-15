import Divider from '@/components/Divider';
import Box from '@/components/Box';
import { apiFetch } from '@/lib/helpers';
import { apiUrl, offices, shirtSizes } from '@/lib/settings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Metadata } from 'next';
import { User } from '@/lib/types';
import NewUserForm from '../_components/NewUserForm';
import Link from 'next/link';
import { ArrowLeftIcon } from '@/components/Icons/ArrowLeftIcon';

export const metadata: Metadata = {
  title: 'Add a new user',
};

async function getUsers(token: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/adm/users`).then((res) => {
    return res.json();
  });
}

export default async function NewUser() {
  const session = await getServerSession(authOptions);
  const token = (session as any).id_token;

  let allUsers: User[] = [];
  try {
    allUsers = await getUsers(token);
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <Box topSpacing="m" leftSpacing="l" rightSpacing="l" bottomSpacing="m">
        <Link className="button outline icon-left" href="/admin">
          <ArrowLeftIcon /> Back
        </Link>
      </Box>
      <Divider spacing="none" color="var(--colors-silver)" />
      <Box spacing="l" alignItems="stretch">
        <Divider spacing="none" color="var(--colors-silver)" />
        <h2>Add a new user</h2>
        <Divider spacing="m" color="transparent" />
        <NewUserForm allUsers={allUsers} />
      </Box>
    </div>
  );
}
