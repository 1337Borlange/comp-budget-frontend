'use client';

import Column from '@/components/Column';
import ComboBox, { ComboOption } from '@/components/ComboBox';
import Grid from '@/components/Grid';
import { CategoryDTO } from '@/lib/types';
import { useMemo } from 'react';
import AddCategory from './AddCategory/AddCategory';

type ExpenseTypeCatProps = {
  categories: CategoryDTO[];
};

const ExpenseTypeCat = ({ categories }: ExpenseTypeCatProps) => {
  const data: ComboOption[] = useMemo(() => {
    return categories.map((category: CategoryDTO) => ({
      id: String(category.id),
      title: category.name,
    }));
  }, [categories]);

  return (
    <Grid spacing="l">
      <Column lg="6" md="6" sm="6" xs="12">
        <ComboBox
          fullWidth
          label="Select category"
          disabled={data.length === 0}
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
