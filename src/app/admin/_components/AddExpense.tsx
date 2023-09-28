import { FormControl } from '../../../components/FormControl/FormControl';
import { Label } from '../../../components/FormControl/Label';
import {
  Category,
  CategoryType,
  CreateUpdateDeleteType,
  Expense,
  User,
} from '@/lib/types';
import Divider from '../../../components/Divider';
import Grid from '../../../components/Grid';
import Column from '../../../components/Column';
import TextField from '../../../components/Textfield';
import Box from '../../../components/Box';
import Button from '../../../components/Button';
import ToggleSwitch from '../../../components/ToggleSwitch';
import DatePickerWrapper from './DatePickerWrapper';
import AddCategory from './AddCategory';
import ExpenseTypeCat from './ExpenseTypeCat';
import { saveExpense } from '../_actions/expense';

type AddExpenseType = {
  reqType: CreateUpdateDeleteType;
  categories: Category[];
  categoryTypes: CategoryType[];
  expense?: Expense;
  user?: User;
};

export const AddExpense: React.FunctionComponent<AddExpenseType> = ({
  reqType,
  categories,
  categoryTypes,
  expense,
  user,
}) => {
  return (
    <>
      <Grid spacing="m">
        <Column lg="9" md="9" sm="9" xs="6">
          <h2>{reqType === 'update' ? 'Update' : 'Add'} expense</h2>
        </Column>
        <Column lg="3" md="3" sm="3" xs="6">
          <AddCategory />
        </Column>
      </Grid>
      <Divider spacing="m" color="transparent" />
      <form action={saveExpense}>
        <input
          type="hidden"
          name="reqType"
          value={reqType === 'update' ? 'PUT' : 'POST'}
        />
        <input
          type="hidden"
          name="userId"
          value={expense?.userId || user?.userId}
        />
        {expense && <input type="hidden" name="id" value={expense?.id} />}
        <Grid spacing="l">
          <Column lg="6" md="6" sm="6" xs="12">
            <FormControl fullWidth>
              <Label htmlFor="date">Date of expense *</Label>
              <DatePickerWrapper name="date" id="date" date={expense?.date} />
            </FormControl>
          </Column>
          <Column lg="6" md="6" sm="6" xs="12">
            <TextField
              required
              label="Amount"
              id="sum"
              name="sum"
              type="number"
              defaultValue={expense?.sum}
            />
          </Column>
        </Grid>
        <Divider spacing="m" />
        <ExpenseTypeCat
          expense={expense}
          categories={categories}
          categoryTypes={categoryTypes}
        />
        <Divider spacing="m" />
        <Divider spacing="m" />
        <Grid spacing="l">
          <Column lg="6" md="6" sm="6" xs="12">
            <TextField
              label="Name"
              name="name"
              id="name"
              type="text"
              defaultValue={expense?.name}
            />
          </Column>
          <Column lg="6" md="6" sm="6" xs="12" justifyContent="center">
            <div>
              <ToggleSwitch
                id="is-hardware"
                name="isHardware"
                defaultChecked={expense?.isHardware ?? false}
              />
              <Label htmlFor="is-hardware">Is hardware</Label>
            </div>
          </Column>
        </Grid>
        <Divider spacing="m" />
        <FormControl fullWidth>
          <Label htmlFor="comment">Comment</Label>
          <textarea
            id="comment"
            name="comment"
            defaultValue={expense?.comment}
          ></textarea>
        </FormControl>
        <Box topSpacing="l" alignItems="flex-end">
          <Button type="submit">Save expense</Button>
        </Box>
      </form>
    </>
  );
};
