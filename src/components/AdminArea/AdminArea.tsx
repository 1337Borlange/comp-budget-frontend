import UserSelection from '@/app/budget/_components/UserSelection';
import '../../styles/components/adminArea.scss';
import Box from '../Box';
import { User } from '@/lib/types';
import Grid from '../Grid';
import Column from '../Column';
import { StatsIcon } from '../Icons/StatsIcon';
import { PenIcon } from '../Icons/PenIcon';
import { ModalButton } from '../ModalButton';
import { UserIcon } from '../Icons/UserIcon';
import { getMe } from '@/app/budget/_actions/actions';
import { getUsers } from '@/app/budget/user/actions';

interface AdminAreaProps {
  isAdmin: boolean;
  defaultUserId?: number;
}

export const AdminArea = async ({ isAdmin, defaultUserId }: AdminAreaProps) => {
  if (!isAdmin) return null;

  let users: User[] | undefined = [] as User[];
  let me: User | undefined;
  let selectedUser: User | undefined;
  let userName: string | undefined;

  try {
    me = await getMe();
    users = await getUsers();
    selectedUser = users?.find((user: User) => user.id === (defaultUserId ?? me?.id));
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
          <UserSelection me={me} users={users} />
        </Column>
        <Column lg="2" md="3" sm="4" xs="12" className="col" flexGrow="0" justifyContent="flex-end">
          <ModalButton text="Edit user" icon={<PenIcon />} modalName="showEditUser" />
        </Column>
      </Grid>
    </Box>
  );
};
