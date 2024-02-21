import { getUsers } from '../../user/actions';
import { getMe } from '../../_actions/actions';
import { UpdateUserView } from './UpdateUserView';
import { User } from '@/lib/types';

interface UpdateUserProps {
  selectedUserId: string;
}

export default async function UpdateUser(
  { selectedUserId }: UpdateUserProps = { selectedUserId: '' },
) {
  let users: User[] | undefined;
  let me: User | undefined;

  try {
    users = await getUsers();
    me = await getMe();
  } catch (e) {
    console.error(e);
  }

  return <UpdateUserView me={me} users={users} selectedUserId={selectedUserId} />;
}
