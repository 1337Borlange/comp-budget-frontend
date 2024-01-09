'use client';
import Column from '@/components/Column';
import ComboBox, { ComboOption } from '@/components/ComboBox';
import Grid from '@/components/Grid';
import Select from '@/components/Select';
import { CategoryDTO, CategoryType, CategoryUnit, Expense } from '@/lib/types';
import { useMemo, useState } from 'react';
import AddCategory from './AddCategory/AddCategory';

type ExpenseTypeCatProps = {
  expense?: Expense;
  categories: CategoryDTO[];
  categoryTypes: CategoryType[];
};

const ExpenseTypeCat = ({ expense, categories }: ExpenseTypeCatProps) => {
  const [expenseType, setExpenseType] = useState<string | undefined>(expense?.type ?? undefined);

  const expenseTypes = Object.keys(CategoryUnit)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({ key: CategoryUnit[key as keyof typeof CategoryUnit], value: key }));

  const data: ComboOption[] = useMemo(() => {
    return categories.map((category: CategoryDTO) => ({
      id: String(category.id),
      title: category.name,
    }));
  }, [categories]);

  return (
    <Grid spacing="l">
      <Column xs="12">
        <Select
          required
          id="expense-type"
          name="type"
          label="Expense type"
          defaultValue={expense?.type}
          onChange={(e) => setExpenseType(e.currentTarget.value)}>
          <option value="-1">- Select expense type -</option>
          {expenseTypes?.map((type) => (
            <option value={type.value} key={type.key}>
              {type.value}
            </option>
          ))}
        </Select>
      </Column>

      <Column lg="6" md="6" sm="6" xs="12">
        <ComboBox
          fullWidth
          label="Select category"
          disabled={data.length === 0}
          defaultValue={expense?.category}
          name="category"
          data={data}
        />
      </Column>
      <Column lg="6" md="6" sm="6" xs="12" alignItems="baseline" justifyContent="flex-end">
        <AddCategory />
      </Column>
    </Grid>
  );
};

export default ExpenseTypeCat;
