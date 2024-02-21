import { CategoryDTO } from '@/lib/types';
import { getCategories } from '../../user/actions';
import { AddExpenseView } from './AddExpenseView';

export default async function AddExpense() {
  let categories: CategoryDTO[] = [];

  try {
    categories = await getCategories();
  } catch (e) {
    console.error(e);
  }

  return <AddExpenseView categories={categories} reqType={'create'} />;
}
