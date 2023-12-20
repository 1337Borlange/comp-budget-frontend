import UserSelection from '@/app/admin/_components/UserSelection';
import '../../styles/components/adminArea.scss';
import Box from '../Box';
import { User } from '@/lib/types';
import { getMe, getUsers } from './actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import { UserIcon } from '../Icons/UserIcon';
import Grid from '../Grid';
import Column from '../Column';

interface AdminAreaProps {
  isAdmin: boolean;
  defaultUserId?: number;
}

export const AdminArea = async ({ isAdmin, defaultUserId }: AdminAreaProps) => {
  if (!isAdmin) return null;

  const session = await getServerSession(authOptions);
  let users: User[] = [];
  let me: User | undefined = undefined;
  let selectedUser: User | undefined = undefined;

  try {
    me = await getMe((session as any).id_token);
    users = await getUsers((session as any).id_token);
    selectedUser = users.find((user: User) => user.id === (defaultUserId ?? me?.id));
  } catch (e) {
    console.error(e);
  }

  return (
    <Box spacing="l" flexDirection="column">
      <Grid spacing="l" direction="row" justifyContent="space-between">
        <Column lg="10" md="9" sm="8" xs="12" flexGrow="1" justifyContent="flex-end">
          <UserSelection users={users} selectedUser={selectedUser} />
        </Column>
        <Column lg="2" md="3" sm="4" xs="12" className="col" flexGrow="0" justifyContent="flex-end">
          <Link className="button outline icon-right" href="/admin/newuser">
            Add user <UserIcon />
          </Link>
        </Column>
      </Grid>
    </Box>
  );
};
