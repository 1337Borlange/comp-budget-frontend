'use client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
// import { useAdminContext } from './AdminContext';
import { BudgetRequestBody } from '@/lib/types';
import { getFormValue } from '@/lib/helpers';
import Divider from '@/components/Divider';
import Grid from '@/components/Grid';
import Column from '@/components/Column';
import { FormControl } from '@/components/FormControl/FormControl';
import { Label } from '@/components/FormControl/Label';
import TextField from '@/components/Textfield';
import Box from '@/components/Box';
import Button from '@/components/Button';

export const UpdateUser = () => {
  //   const [currentUser, setCurrentUser] = useState<User | undefined>();
  //   const { user } = useAdminContext();

  const budget: any = {};
  const [startDate, setStartDate] = useState(
    budget?.start ? new Date(budget.start) : new Date()
  );

  const responseBody = {} as BudgetRequestBody;

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.forEach((value, property: string) => {
      if (typeof value !== 'undefined') {
        const newVal = getFormValue(value);
        responseBody[property as keyof BudgetRequestBody] = newVal as never;
      }
    });

    console.log(responseBody);
    // updateBudget(responseBody);
  };

  //   useEffect(() => {
  //     setStartDate(budget?.start ? new Date(budget.start) : new Date());
  //   }, [budget]);

  return (
    <div>
      <h2>Update user</h2>
      <Divider spacing="m" color="transparent" />

      <>
        <form onSubmit={onSubmitHandler}>
          {/* <input type="hidden" name="userId" value={user?.userId} /> */}
          <input type="hidden" name="id" value={budget?.id} />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <FormControl fullWidth>
                <Label htmlFor="start">Start date</Label>
                <DatePicker
                  required
                  name="start"
                  id="start"
                  selected={new Date(budget.start)}
                  dateFormat="yyyy-MM-dd"
                  onChange={(date: Date) => setStartDate(date)}
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
                defaultValue={budget?.hardwareBudget || 0}
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
                defaultValue={budget?.openingBalanceMoney || 0}
              />
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                required
                label="Opening balance time"
                id="openingBalanceTime"
                name="openingBalanceTime"
                type="number"
                defaultValue={budget?.openingBalanceTime || 0}
              />
            </Column>
          </Grid>
          <Divider spacing="m" />
          <TextField
            label="Yearly refill"
            id="yearlyRefill"
            name="yearlyRefill"
            type="number"
            defaultValue={budget?.yearlyRefill || 0}
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
