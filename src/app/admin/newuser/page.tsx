import Divider from '@/components/Divider';
import Box from '@/components/Box';
import { apiFetch } from '@/lib/helpers';
import { apiUrl, offices, shirtSizes } from '@/lib/settings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Metadata } from 'next';
import { saveUser } from '../_components/actions';
import Grid from '@/components/Grid';
import Column from '@/components/Column';
import TextField from '@/components/Textfield';
import Select from '@/components/Select';
import ComboBox from '@/components/ComboBox';
import Button from '@/components/Button';
import { User } from '@/lib/types';

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
    <Box spacing="l" alignItems="stretch">
      <h2>Add a new user</h2>
      <Divider spacing="m" color="transparent" />

      <>
        <form action={saveUser}>
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
              <TextField
                label="Employee number"
                name="employeeNumber"
                id="employeeNumber"
              />
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Departement number"
                name="departementNumber"
                id="departementNumber"
              />
            </Column>
          </Grid>
          <Divider spacing="s" />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Employee number"
                name="employeeNumber"
                id="employeeNumber"
              />
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Departement number"
                name="departementNumber"
                id="departementNumber"
              />
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
              <TextField
                label="Phone number"
                name="phoneNumber"
                id="phoneNumber"
                type="tel"
              />
            </Column>
          </Grid>
          <Divider spacing="s" />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField label="Address" name="address" id="address" />
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField label="Email" name="email" id="email" type="email" />
            </Column>
          </Grid>
          <Divider spacing="s" />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <Select label="Shirt size" name="shirtSize">
                {shirtSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField label="Allergies" name="allergies" id="allergies" />
            </Column>
          </Grid>
          <Divider spacing="s" />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <Select label="Office" name="office">
                {offices.map((office) => (
                  <option key={office} value={office}>
                    {office}
                  </option>
                ))}
              </Select>
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              {/* <TextField label="Manager" name="manager" id="manager" /> */}
              <ComboBox
                fullWidth
                label="Select manager"
                name="manager"
                data={allUsers.map((user) => ({
                  id: user.userId,
                  title: user.name,
                }))}
              />
            </Column>
          </Grid>
          <Box topSpacing="l" alignItems="flex-end">
            <Button type="submit">Save user</Button>
          </Box>
        </form>
      </>
    </Box>
  );
}
