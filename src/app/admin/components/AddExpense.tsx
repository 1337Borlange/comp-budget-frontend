'use client';
import { useMemo, useState } from 'react';
import { FormControl } from '../../../components/FormControl/FormControl';
import { Label } from '../../../components/FormControl/Label';
import Select from '../../../components/Select';
import ComboBox from '../../../components/ComboBox';
import { InlineStack } from '../../../components/InlineStack';
import Checkbox from '../../../components/Checkbox';
import { Category, CreateUpdateDeleteType, Expense, User } from '@/lib/types';
import Divider from '../../../components/Divider';
import Grid from '../../../components/Grid';
import Column from '../../../components/Column';
import TextField from '../../../components/Textfield';
import Box from '../../../components/Box';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import ToggleSwitch from '../../../components/ToggleSwitch';
import { saveCategory, saveExpense } from './actions';
import DatePickerWrapper from './DatePickerWrapper';

const expenseTypes = ['time', 'money'];

type AddExpenseType = {
  reqType: CreateUpdateDeleteType;
  categories: Category[];
  expense?: Expense;
  user?: User;
};

export const AddExpense: React.FunctionComponent<AddExpenseType> = ({
  reqType,
  categories,
  expense,
  user,
}) => {
  console.log('EXPENSE: ', expense);

  const [expenseType, setExpenseType] = useState<string | undefined>(
    expense?.type ?? undefined
  );
  const [showAddCategory, setShowAddCategory] = useState(false);

  const filteredCategories = useMemo(() => {
    if (expenseType) {
      return categories.filter((cat) =>
        cat.categoryTypes.some((c) => c.name === expenseType)
      );
    }
    return [];
  }, [expenseType, categories]);

  return (
    <>
      <h2>{reqType === 'update' ? 'Update' : 'Add'} expense</h2>
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
          value={user?.userId || expense?.userId}
        />
        {expense && <input type="hidden" name="id" value={expense?.id} />}
        <Grid spacing="l">
          <Column lg="6" md="6" sm="6" xs="12">
            <FormControl fullWidth>
              <Label htmlFor="date">Date of expense *</Label>
              <DatePickerWrapper name="date" id="date" date={expense?.date} />
              {/* <DatePicker
                required
                selected={expenseDate}
                id="date"
                name="date"
                dateFormat="yyyy-MM-dd"
                onChange={(date: Date) => setExpenseDate(date)}
              /> */}
            </FormControl>
          </Column>
          <Column lg="6" md="6" sm="6" xs="12">
            <Select
              required
              id="expense-type"
              name="type"
              label="Expsense type"
              defaultValue={expense?.type}
              onChange={(e) => setExpenseType(e.currentTarget.value)}
            >
              <option value="-1">- Select expense type -</option>
              {expenseTypes.map((t) => (
                <option value={t} key={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Column>
        </Grid>
        <Divider spacing="m" />
        <Grid spacing="l">
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
          <Column lg="6" md="6" sm="6" xs="12">
            <TextField
              label="Name"
              name="name"
              id="name"
              type="text"
              defaultValue={expense?.name}
            />
          </Column>
        </Grid>
        <Divider spacing="m" />
        <Grid spacing="l">
          <Column lg="6" md="6" sm="6" xs="12">
            <Grid spacing="s">
              <Column lg="9" md="9" sm="9" xs="12">
                <ComboBox
                  fullWidth
                  label="Select category"
                  disabled={filteredCategories.length === 0}
                  defaultValue={expense?.category}
                  name="category"
                  data={filteredCategories.map((cat: Category) => ({
                    id: cat.id,
                    title: cat.name,
                  }))}
                  handleChange={(val) => console.log(val?.id || '')}
                />
              </Column>
              <Column lg="3" md="3" sm="3" xs="12">
                <Box topSpacing="m" alignItems="stretch">
                  <Button
                    priority="tertiary"
                    onClick={() => setShowAddCategory(true)}
                  >
                    Add new
                  </Button>
                </Box>
              </Column>
            </Grid>
          </Column>
          <Column lg="6" md="6" sm="6" xs="12" justifyContent="center">
            {expenseType !== 'time' && (
              <div>
                <ToggleSwitch
                  id="is-hardware"
                  name="isHardware"
                  defaultChecked={expense?.isHardware ?? false}
                  // onChange={onHardwarechange}
                />
                <Label htmlFor="is-hardware">Is hardware</Label>
              </div>
            )}
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
      <Modal
        id="add-category-modal"
        blur
        visible={showAddCategory}
        onClose={() => setShowAddCategory(false)}
      >
        <h2>Add a new category</h2>
        <Divider spacing="l" />
        <form action={saveCategory}>
          <TextField label="Category name" name="categoryName" fullWidth />
          <Divider spacing="s" color="transparent" />
          <Box bottomSpacing="xs">
            <Label>Category belongs to type *</Label>
          </Box>
          <InlineStack spacing="l">
            <Checkbox
              id="time-cat"
              name="categoryType"
              label="Time"
              value="time"
            />
            <Checkbox
              id="money-cat"
              name="categoryType"
              label="Money"
              value="money"
            />
          </InlineStack>
          <Divider spacing="l" />
          <Box alignItems="flex-end">
            <Button type="submit">Add category</Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};
