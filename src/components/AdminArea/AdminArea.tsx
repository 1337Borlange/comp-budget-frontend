import UserSelection from '@/app/admin/_components/UserSelection';
import '../../styles/components/adminArea.scss';
import Box from '../Box';
import { User } from '@/lib/types';
import { getMe, getUsers } from './actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Grid from '../Grid';
import Column from '../Column';
import Link from 'next/link';
import { StatsIcon } from '../Icons/StatsIcon';
import { PenIcon } from '../Icons/PenIcon';
import { ModalButton } from '../ModalButton';
import { UserIcon } from '../Icons/UserIcon';

interface AdminAreaProps {
  isAdmin: boolean;
  defaultUserId?: number;
}

export const AdminArea = async ({ isAdmin, defaultUserId }: AdminAreaProps) => {
  if (!isAdmin) return null;

  const session = await getServerSession(authOptions);
  let users: User[] = [];
  let me: User | undefined;
  let selectedUser: User | undefined;
  let userName: string | undefined;

  try {
    me = await getMe((session as any).id_token);
    users = await getUsers((session as any).id_token);
    selectedUser = users.find((user: User) => user.id === (defaultUserId ?? me?.id));
    userName = selectedUser?.name.split(' ')[0];
  } catch (e) {
    console.error(e);
  }

  return (
    <Box spacing="l" flexDirection="column">
      <Grid spacing="l" direction="row" justifyContent="space-between">
        <Column
          lg="12"
          md="12"
          sm="12"
          xs="12"
          className="col"
          flexGrow="0"
          justifyContent="flex-end">
          <Grid spacing="s">
            <Column
              lg="2"
              md="3"
              sm="4"
              xs="12"
              className="col"
              flexGrow="0"
              justifyContent="flex-start">
              <ModalButton text="Show statistics" icon={<StatsIcon />} modalName="showStatistics" />
            </Column>
            <Column
              lg="2"
              md="3"
              sm="4"
              xs="12"
              className="col"
              flexGrow="0"
              justifyContent="flex-end">
              <ModalButton text="Add user" icon={<UserIcon />} modalName="showAddUser" />
            </Column>
          </Grid>
        </Column>
        <Column lg="10" md="9" sm="8" xs="12" flexGrow="1" justifyContent="flex-end">
          <UserSelection users={users} selectedUser={selectedUser} />
        </Column>
        <Column lg="2" md="3" sm="4" xs="12" className="col" flexGrow="0" justifyContent="flex-end">
          <ModalButton text="Edit user" icon={<PenIcon />} modalName="showEditUser" />
        </Column>
      </Grid>
    </Box>
  );
};
