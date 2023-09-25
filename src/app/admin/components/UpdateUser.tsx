import { Budget, User } from '@/lib/types';
import Divider from '@/components/Divider';
import Grid from '@/components/Grid';
import Column from '@/components/Column';
import { FormControl } from '@/components/FormControl/FormControl';
import { Label } from '@/components/FormControl/Label';
import TextField from '@/components/Textfield';
import Box from '@/components/Box';
import Button from '@/components/Button';
import { saveBudget } from './actions';
import DatePickerWrapper from './DatePickerWrapper';
import Select from '@/components/Select';

type UpdateUserProps = {
  user?: User;
  budget?: Budget;
};

const shirtSizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];

const offices = ['Lund', 'Helsingborg', 'Stockholm', 'Borlänge', 'Ljublijana'];

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

export const UpdateUser = ({ user, budget }: UpdateUserProps) => {
  return (
    <div>
      <h2>Update user</h2>
      <Divider spacing="m" color="transparent" />

      <>
        <form action={saveBudget}>
          <input type="hidden" name="userId" value={user?.userId} />
          <input type="hidden" name="id" value={budget?.id} />
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
                label="Personal number"
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
              <TextField label="Manager" name="manager" id="manager" />
            </Column>
          </Grid>
          <Divider spacing="s" />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <FormControl fullWidth>
                <Label htmlFor="start">Start date</Label>
                <DatePickerWrapper
                  date={budget?.start}
                  name="start"
                  id="start"
                />
              </FormControl>
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                required
                label="Hardware budget"
                id="hardwareBudget"
                name="hardwareBudget"
                type="number"
                defaultValue={budget?.hardwareBudget ?? 0}
              />
            </Column>
          </Grid>
          <Divider spacing="s" />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                required
                label="Opening balance money"
                id="openingBalanceMoney"
                name="openingBalanceMoney"
                type="number"
                defaultValue={budget?.openingBalanceMoney ?? 0}
              />
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                required
                label="Opening balance time"
                id="openingBalanceTime"
                name="openingBalanceTime"
                type="number"
                defaultValue={budget?.openingBalanceTime ?? 0}
              />
            </Column>
          </Grid>
          <Divider spacing="m" />
          <TextField
            label="Yearly refill"
            id="yearlyRefill"
            name="yearlyRefill"
            type="number"
            defaultValue={budget?.yearlyRefill ?? 0}
            fullWidth
          />
          <Divider spacing="m" />
          <FormControl fullWidth>
            <Label htmlFor="comment">Comment</Label>
            <textarea
              id="comment"
              name="comment"
              defaultValue={budget?.comment}
            ></textarea>
          </FormControl>
          <Box topSpacing="l" alignItems="flex-end">
            <Button type="submit">Update user</Button>
          </Box>
        </form>
      </>
    </div>
  );
};
