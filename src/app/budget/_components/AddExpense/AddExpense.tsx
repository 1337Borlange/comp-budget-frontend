'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Category, CategoryType, CreateUpdateDeleteType, User, Expense } from '@/lib/types';
import { getErrorMessage } from '@/lib/helpers';

import Box from '../../../../components/Box';
import Button from '../../../../components/Button';
import Column from '../../../../components/Column';
import Divider from '../../../../components/Divider';
import Grid from '../../../../components/Grid';
import TextField from '../../../../components/Textfield';
import ToggleSwitch from '../../../../components/ToggleSwitch';
import { FormControl } from '../../../../components/FormControl/FormControl';
import { Label } from '../../../../components/FormControl/Label';

import ExpenseTypeCat from '../ExpenseTypeCat';
import DatePickerWrapper from '../DatePickerWrapper';
import { saveExpense } from './actions';

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
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  async function clientAction(formData: FormData) {
    const result = await saveExpense(formData);

    if (result?.error) {
      const msg = getErrorMessage(result.error);
      toast.error(msg);
    } else {
      toast.success(
        `Expense succesfully ${reqType}d! ${
          reqType === 'update' ? 'Redirecting to admin in 2 seconds.' : ''
        }`,
      );

      if (reqType === 'update') {
        setTimeout(() => {
          router.push(`/admin?userId=${expense?.userId}`);
        }, 2000);
      } else {
        formRef?.current?.reset();
      }
    }
  }

  return (
    <>
      <Divider spacing="m" color="transparent" />
      <form action={clientAction} ref={formRef}>
        <input type="hidden" name="reqType" value={reqType === 'update' ? 'PUT' : 'POST'} />
        <input type="hidden" name="userId" value={expense?.userId || user?.id} />
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
        <ExpenseTypeCat expense={expense} categories={categories} categoryTypes={categoryTypes} />
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
            <Label htmlFor="is-hardware">Is hardware</Label>
            <ToggleSwitch
              id="is-hardware"
              name="isHardware"
              defaultChecked={expense?.isHardware ?? false}
            />
          </Column>
        </Grid>
        <Divider spacing="m" />
        <FormControl fullWidth>
          <Label htmlFor="comment">Comment</Label>
          <textarea id="comment" name="comment" defaultValue={expense?.comment}></textarea>
        </FormControl>
        <Box topSpacing="l" alignItems="flex-end">
          <Button type="submit">{reqType === 'update' ? 'Update' : 'Add'} expense</Button>
        </Box>
      </form>
    </>
  );
};
