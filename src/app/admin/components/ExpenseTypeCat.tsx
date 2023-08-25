'use client';
import Column from '@/components/Column';
import ComboBox from '@/components/ComboBox';
import Grid from '@/components/Grid';
import Select from '@/components/Select';
import { Category, Expense } from '@/lib/types';
import { useMemo, useState } from 'react';

type ExpenseTypeCatProps = {
  expense?: Expense;
  categories: Category[];
};

const expenseTypes = ['time', 'money'];

const ExpenseTypeCat = ({ expense, categories }: ExpenseTypeCatProps) => {
  const [expenseType, setExpenseType] = useState<string | undefined>(
    expense?.type ?? undefined
  );

  const filteredCategories = useMemo(() => {
    if (expenseType) {
      return categories.filter((cat) =>
        cat.categoryTypes.some((c) => c.name === expenseType)
      );
    }
    return [];
  }, [expenseType, categories]);
  return (
    <Grid spacing="m">
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
      <Column lg="6" md="6" sm="6" xs="12">
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
    </Grid>
  );
};

export default ExpenseTypeCat;