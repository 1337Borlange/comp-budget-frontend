import Box from '@/components/Box';
import Column from '@/components/Column';
import Divider from '@/components/Divider';
import Grid from '@/components/Grid';
import { StatsIcon } from '@/components/Icons/StatsIcon';
import Link from 'next/link';
import { UserCard } from './components/UserCard';
import UserTabs from './components/UserTabs';
import UserModal from './components/UserModal';
import UserSelection from './components/UserSelection';
import { apiFetch } from '@/lib/helpers';
import { Category, User } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { apiUrl } from '@/lib/settings';

async function getUsers(token: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/adm/users`).then((res) => {
    return res.json();
  });
}

async function getCategories(token: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/categories`).then((res) => {
    return res.json();
  });
}

export default async function Admin() {
  const session = await getServerSession(authOptions);
  let users: User[] = [];
  let categories: Category[] = [];
  try {
    users = await getUsers((session as any).id_token);
    categories = await getCategories((session as any).id_token);
  } catch (e) {
    console.error(e);
  }

  return (
    <div>
      <Box
        topSpacing="m"
        leftSpacing="m"
        rightSpacing="m"
        alignItems="flex-end"
      >
        <Link className="button icon-right" href="/admin/stats">
          Show statistics <StatsIcon />
        </Link>
      </Box>
      <Divider spacing="m" color="var(--colors-silver)" />
      <Box spacing="m">
        <Grid spacing="l">
          <Column lg="6" md="6" sm="6" xs="12" alignItems="flex-start">
            <UserSelection users={users} />
          </Column>
          <Column lg="6" md="6" sm="6" xs="12">
            <UserCard />
          </Column>
        </Grid>
      </Box>
      <Divider spacing="2xl" />
      <Box spacing="m" alignItems="stretch">
        <UserTabs categories={categories} />
      </Box>
      <UserModal />
    </div>
  );
}
