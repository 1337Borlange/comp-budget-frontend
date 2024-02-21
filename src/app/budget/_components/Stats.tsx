import Box from '@/components/Box';
import Column from '@/components/Column';
import Divider from '@/components/Divider';
import Grid from '@/components/Grid';
import { ValueContent, ValueHeader } from '@/components/Values';
import { barColors } from '@/lib/helpers';
import { CategoryDTO, CategoryUnit, ExpenseDTO, User } from '@/lib/types';
import BarChart from './BarChart';
import { getCategories, getExpenses, getUsers } from '../user/actions';

interface IStatsProps {
  selectedUserId: string;
}


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const thisYear = new Date().getFullYear();
const lastYearFilter = (exp: ExpenseDTO) => new Date(exp.date).getFullYear() < thisYear;

const Stats = async ({selectedUserId}: IStatsProps) => {
  const usersReq = getUsers();
  const expensesReq = getExpenses(selectedUserId);
  const categoriesReq = getCategories();

  const [allUsers, allExpenses, categories] = await Promise.all([usersReq, expensesReq, categoriesReq]);

  const categoriesWithTimeUnit = categories?.filter((cat) => cat.unit === CategoryUnit.Time) || [];
  const timeExpenses =
    allExpenses?.filter((exp) => categoriesWithTimeUnit.some((cat) => cat.id === exp.categoryId)) ||
    [];
  const moneyExpenses =
    allExpenses?.filter((exp) => categoriesWithTimeUnit.some((cat) => cat.id !== exp.categoryId)) ||
    [];

  const getAverageValue = (expenseArr: ExpenseDTO[]) => {
    const noUsers = Array.isArray(allUsers) ? allUsers?.length : 0;
    const totalValue = expenseArr?.reduce((acc, curr) => {
      return (acc += curr.sum);
    }, 0);

    return Math.round(totalValue / noUsers);
  };

  const averageTimePerUser = getAverageValue(timeExpenses.filter(lastYearFilter));

  const averageMoneyPerUser = getAverageValue(moneyExpenses.filter(lastYearFilter));
  const categoriesWithHardwareUnit = categories?.filter((cat) => cat.isHardware) || [];
  const averageHardwarePerUser = getAverageValue(
    moneyExpenses
      .filter(lastYearFilter)
      .filter((exp) => categoriesWithHardwareUnit.some((cat) => cat.id === exp.categoryId)),
  );

  const getNumberOfExpensesByCategory = (expenseArr: ExpenseDTO[]) => {
    const numOfInstances = categories?.map(
      (cat) => expenseArr?.filter((exp) => exp.categoryId === cat.id).length,
    );
    return numOfInstances;
  };

  const barTimeData = {
    labels: categories?.map((c) => c.name) || [],
    datasets: [
      {
        label: 'Time expenses by category',
        data: getNumberOfExpensesByCategory(timeExpenses),
        backgroundColor: barColors,
        borderWidth: 1,
      },
    ],
  };

  const barMoneyData = {
    labels: categories?.map((c) => c.name) || [],
    datasets: [
      {
        label: 'Money expenses by category',
        data: getNumberOfExpensesByCategory(moneyExpenses) || [],
        backgroundColor: barColors,
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Grid spacing="l">
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor="var(--colors-silver)" spacing="m" className="value-wrapper">
            <ValueHeader>Time used (hours)</ValueHeader>
            <ValueContent>{averageTimePerUser}</ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor="var(--colors-silver)" spacing="m" className="value-wrapper">
            <ValueHeader>Money used (SEK)</ValueHeader>
            <ValueContent>{averageMoneyPerUser}</ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor="var(--colors-silver)" spacing="m" className="value-wrapper">
            <ValueHeader>Hardware spent (SEK)</ValueHeader>
            <ValueContent>{averageHardwarePerUser}</ValueContent>
          </Box>
        </Column>
      </Grid>
      <Divider spacing="l" />
      <h3>Categories used in budget</h3>
      <Divider spacing="s" color="transparent" />
      <h4>Type: time</h4>
      <Divider spacing="s" color="transparent" />
      <BarChart
        options={{
          ...options,
          plugins: {
            ...options.plugins,
            title: { display: false, text: 'Categories used by type Time' },
          },
        }}
        barData={barTimeData}
        id="catByExp"
      />
      <Divider spacing="l" />
      <h4>Type: money</h4>
      <Divider spacing="s" color="transparent" />
      <BarChart
        options={{
          ...options,
          plugins: {
            ...options.plugins,
            title: { display: false, text: 'Categories used by type Money' },
          },
        }}
        barData={barMoneyData}
        id="catByExpMoney"
      />
    </>
  );
};

export default Stats;
