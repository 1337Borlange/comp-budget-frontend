import Divider from '@/components/Divider';
import Box from '@/components/Box';
import { apiFetch } from '@/lib/helpers';
import { apiUrl, offices, shirtSizes } from '@/lib/settings';
import { Metadata } from 'next';
import Grid from '@/components/Grid';
import Column from '@/components/Column';
import TextField from '@/components/Textfield';
import Select from '@/components/Select';
import ComboBox from '@/components/ComboBox';
import Button from '@/components/Button';
import { User } from '@/lib/types';
import { addUser } from '../_actions/user';
import NewUserForm from '../_components/NewUserForm';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Add a new user',
};

async function getUsers(token: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/adm/users`).then((res) => {
    return res.json();
  });
}

export default async function NewUser() {
  const session = await auth();
  const token = session.id_token;

  let allUsers: User[] = [];
  try {
    allUsers = await getUsers(token);
  } catch (error) {
    console.error(error);
  }

  return (
    <Box spacing="l" alignItems="stretch">
      <h2>Add a new user</h2>
      <Divider spacing="m" color="transparent" />
      <NewUserForm allUsers={allUsers} />
    </Box>
  );
}
