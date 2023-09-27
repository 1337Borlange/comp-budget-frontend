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

type UpdateBudgetProps = {
  user?: User;
  budget?: Budget;
  allUsers: User[];
};

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

export const UpdateBudget = ({ user, budget, allUsers }: UpdateBudgetProps) => {
  return (
    <div>
      <h2>Update budget</h2>
      <Divider spacing="m" color="transparent" />

      <>
        <form action={saveBudget}>
          <input type="hidden" name="userId" value={user?.userId} />
          <input type="hidden" name="id" value={budget?.id} />

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
            <Button type="submit">Update budget</Button>
          </Box>
        </form>
      </>
    </div>
  );
};
