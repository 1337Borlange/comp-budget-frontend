'use client';

import { getErrorMessage } from '@/lib/helpers';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { User } from '@/lib/types';
import Grid from '@/components/Grid';
import Column from '@/components/Column';
import TextField from '@/components/Textfield';
import Divider from '@/components/Divider';
import Select from '@/components/Select';
import { offices, shirtSizes } from '@/lib/settings';
import ComboBox from '@/components/ComboBox';
import Box from '@/components/Box';
import Button from '@/components/Button';
import { addUser } from './actions';
import { getUsers } from '../../user/actions';

const NewUserForm = () => {
  const [users, setUsers] = useState<User[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      if (users) {
        setUsers(users);
      }
    };

    fetchUsers();
  }, []);

  async function clientSaveUserAction(formData: FormData) {
    const result = await addUser(formData);
    // @ts-ignore
    if (result?.error) {
      // @ts-ignore
      const msg = getErrorMessage(result.error);
      console.log(result);
      toast.error(msg);
    } else {
      formRef?.current?.reset();
      toast.success(`User succesfully added! Redirecting in 2 seconds...`);
      setTimeout(() => {
        router.push(`/budget/user?id=${(result as unknown as User)?.id}`);
      }, 2000);
    }
  }

  return (
    <form action={clientSaveUserAction} ref={formRef}>
      <Grid spacing="l">
        <Column lg="6" md="6" sm="6" xs="12">
          <TextField label="Name" name="name" id="name" required />
        </Column>
        <Column lg="6" md="6" sm="6" xs="12">
          <TextField label="Email" name="email" id="email" required />
        </Column>
      </Grid>
      <Divider spacing="s" />
      <Grid spacing="l">
        <Column lg="6" md="6" sm="6" xs="12">
          <TextField label="Employee number" name="employeeNumber" id="employeeNumber" required />
        </Column>
        <Column lg="6" md="6" sm="6" xs="12">
          <TextField label="Department number" name="departmentNumber" id="departmentNumber" />
        </Column>
      </Grid>
      <Divider spacing="s" />

      <Grid spacing="l">
        <Column lg="6" md="6" sm="6" xs="12">
          <TextField
            label="Personal number (six digits, eg. XXXXXX)"
            name="personalNumber"
            id="personalNumber"
            type="number"
          />
        </Column>
        <Column lg="6" md="6" sm="6" xs="12">
          <TextField label="Phone number" name="phoneNumber" id="phoneNumber" type="tel" />
        </Column>
      </Grid>
      <Divider spacing="s" />
      <Grid spacing="l">
        <Column lg="6" md="6" sm="6" xs="12">
          <TextField label="Address" name="address" id="address" />
        </Column>
        <Column lg="6" md="6" sm="6" xs="12">
          {/* <TextField label="Email" name="email" id="email" type="email" /> */}
          <Select label="Shirt size" name="shirtSize">
            {shirtSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
        </Column>
      </Grid>
      <Divider spacing="s" />
      <Grid spacing="l">
        <Column lg="6" md="6" sm="6" xs="12">
          <TextField label="Allergies" name="allergies" id="allergies" />
        </Column>
        <Column lg="6" md="6" sm="6" xs="12">
          <Select label="Office" name="office">
            {offices.map((office) => (
              <option key={office} value={office}>
                {office}
              </option>
            ))}
          </Select>
        </Column>
      </Grid>
      <Divider spacing="s" />
      <Grid spacing="l">
        <Column lg="6" md="6" sm="6" xs="12">
          {/* <TextField label="Manager" name="manager" id="manager" /> */}
          <ComboBox
            fullWidth
            label="Select manager"
            name="manager"
            data={users.map((user) => ({
              id: user.id,
              title: user.name,
            }))}
          />
        </Column>
      </Grid>
      <Box topSpacing="l" alignItems="flex-end">
        <Button type="submit">Add user</Button>
      </Box>
    </form>
  );
};

export default NewUserForm;
