'use client';

import { useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { CreateUpdateDeleteType, CategoryDTO, ExpenseTypes, ExpenseDTO } from '@/lib/types';

import Box from '../../../../components/Box';
import Button from '../../../../components/Button';
import Column from '../../../../components/Column';
import Divider from '../../../../components/Divider';
import Grid from '../../../../components/Grid';
import TextField from '../../../../components/Textfield';
import { FormControl } from '../../../../components/FormControl/FormControl';
import { Label } from '../../../../components/FormControl/Label';

import ExpenseTypeCat from '../ExpenseTypeCat';
import DatePickerWrapper from '../DatePickerWrapper';
import { saveExpense } from './actions';

type AddExpenseType = {
  reqType: CreateUpdateDeleteType;
  categories: CategoryDTO[];
};

export const AddExpenseView: React.FunctionComponent<AddExpenseType> = ({
  reqType,
  categories,
}) => {
  const searchParams = useSearchParams();
  const selectedUserId = searchParams.get('id') ?? undefined;
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function clientAction(formData: FormData) {
    setIsLoading(true);

    const newExpense: ExpenseDTO = {
      id: Number(formData.get('id')),
      date: formData.get('date') as string,
      sum: Number(formData.get('sum')),
      comment: formData.get('comment') as string,
      userId: formData.get('userId') as string,
      categoryId:
        categories.find((cat) => cat.name && cat.name === formData.get('category'))?.id ?? NaN,
      expenseType: ExpenseTypes.Expense,
    };

    const result = await saveExpense(newExpense);

    if (result?.status === 200) {
      toast.success(`Expense succesfully ${reqType}d!`);
      if (selectedUserId) {
        router.push(`/budget/user?id=${selectedUserId}`);
      }
    } else {
      console.error(result.message);
      toast.error(result.message);
    }

    setIsLoading(false);
  }

  return (
    <>
      <Divider spacing="m" color="transparent" />
      <form action={clientAction} ref={formRef}>
        <input type="hidden" name="reqType" value={reqType === 'update' ? 'PUT' : 'POST'} />
        <input type="hidden" name="userId" value={selectedUserId} />
        <input type="hidden" name="expenseType" value={ExpenseTypes.Expense} />
        <Grid spacing="l">
          <Column lg="6" md="6" sm="6" xs="12">
            <FormControl fullWidth>
              <Label htmlFor="date">Date of expense *</Label>
              <DatePickerWrapper name="date" id="date" />
            </FormControl>
          </Column>
          <Column lg="6" md="6" sm="6" xs="12">
            <TextField required label="Amount" id="sum" name="sum" type="number" />
          </Column>
        </Grid>
        <Divider spacing="m" />
        <ExpenseTypeCat categories={categories} />
        <Divider spacing="m" />
        <FormControl fullWidth>
          <TextField label="Name" name="name" id="name" type="text" />
        </FormControl>

        <Divider spacing="m" />
        <FormControl fullWidth>
          <Label htmlFor="comment">Comment</Label>
          <textarea id="comment" name="comment"></textarea>
        </FormControl>
        <Box topSpacing="l" alignItems="flex-end">
          <Button type="submit" loading={isLoading}>
            {reqType === 'update' ? 'Update' : 'Add'} expense
          </Button>
        </Box>
      </form>
    </>
  );
};
