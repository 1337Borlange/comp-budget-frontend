import { Budget, Employee, User } from '@/lib/types';
import Divider from '@/components/Divider';
import Grid from '@/components/Grid';
import Column from '@/components/Column';
import TextField from '@/components/Textfield';
import Box from '@/components/Box';
import Button from '@/components/Button';
import { saveUser } from './actions';
import Select from '@/components/Select';
import ComboBox from '@/components/ComboBox';

type UpdateUserProps = {
  user?: Employee;
  allUsers: User[];
};

const shirtSizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];

const offices = ['Lund', 'Helsingborg', 'Stockholm', 'Borlänge', 'Ljubljana'];

/*
 * Employee number
 * departement number
 * 6 första siffrorna i personnumret
 * telefonnummer
 * adress
 * tröjstorlek
 * allergier
 * manager
 * kontor man tillhör

*/

export const UpdateUser = ({ user, allUsers }: UpdateUserProps) => {
  return (
    <div>
      <h2>Update user</h2>
      <Divider spacing="m" color="transparent" />

      <>
        <form action={saveUser}>
          <input type="hidden" name="userId" value={user?.userId} />

          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Employee number"
                name="employeeNumber"
                id="employeeNumber"
                defaultValue={user?.employeeNumber}
              />
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Departement number"
                name="departementNumber"
                id="departementNumber"
                defaultValue={user?.departementNumber}
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
                defaultValue={user?.personalNumber}
              />
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Phone number"
                name="phoneNumber"
                id="phoneNumber"
                type="tel"
                defaultValue={user?.phoneNumber}
              />
            </Column>
          </Grid>
          <Divider spacing="s" />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Address"
                name="address"
                id="address"
                defaultValue={user?.address}
              />
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Email"
                name="email"
                id="email"
                type="email"
                defaultValue={user?.email}
              />
            </Column>
          </Grid>
          <Divider spacing="s" />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <Select
                label="Shirt size"
                name="shirtSize"
                defaultValue={user?.shirtSize}
              >
                {shirtSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                label="Allergies"
                name="allergies"
                id="allergies"
                defaultValue={user?.allergies}
              />
            </Column>
          </Grid>
          <Divider spacing="s" />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <Select label="Office" name="office" defaultValue={user?.office}>
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
                defaultValue={user?.manager}
                data={allUsers.map((user) => ({
                  id: user.userId,
                  title: user.name,
                }))}
              />
            </Column>
          </Grid>
          <Box topSpacing="l" alignItems="flex-end">
            <Button type="submit">Update user</Button>
          </Box>
        </form>
      </>
    </div>
  );
};
