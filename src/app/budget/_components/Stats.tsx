import Box from '@/components/Box';
import Column from '@/components/Column';
import Divider from '@/components/Divider';
import Grid from '@/components/Grid';
import { ValueContent, ValueHeader } from '@/components/Values';
import { apiFetch, barColors } from '@/lib/helpers';
import { Category, Expense, User } from '@/lib/types';
import BarChart from './BarChart';
import addDays from 'date-fns/addDays';
import { getServerSession } from 'next-auth';
import { apiUrl } from '@/lib/settings';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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

async function getUsers(token: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/adm/users`).then((res) => {
    return res.json();
  });
}
async function getExpenses(token: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/adm/expenses`).then((res) => {
    return res.json();
  });
}
async function getCategories(token: string): Promise<any> {
  return apiFetch(token, `${apiUrl}/categories`).then((res) => {
    return res.json();
  });
}

const compDate = addDays(new Date(), -365);

const lastYearFilter = (exp: Expense) => new Date(exp.date) > compDate;

const Stats = async () => {
  const session = await getServerSession(authOptions);
  const token = (session as any).id_token;

  let allUsers: User[] = [];
  let allExpenses: Expense[] = [];
  let categories: Category[] = [];

  try {
    allUsers = await getUsers(token);
    allExpenses = await getExpenses(token);
    categories = await getCategories(token);
  } catch (e) {
    console.error(e);
  }

  const timeExpenses = allExpenses?.filter((exp) => exp.type === 'time') || [];

  const moneyExpenses = allExpenses?.filter((exp) => exp.type === 'money') || [];

  const getAverageValue = (expenseArr: Expense[]) => {
    const noUsers = Array.isArray(allUsers) ? allUsers?.length : 0;
    const totalValue = expenseArr?.reduce((acc, curr) => {
      return (acc += curr.sum);
    }, 0);

    return Math.round(totalValue / noUsers);
  };

  const averageTimePerUser = getAverageValue(timeExpenses.filter(lastYearFilter));

  const averageMoneyPerUser = getAverageValue(moneyExpenses.filter(lastYearFilter));
  const averageHardwarePerUser = getAverageValue(
    moneyExpenses.filter(lastYearFilter).filter((exp) => exp.isHardware),
  );

  const getCategoryByExpenseType = (expenseArr: Expense[]) => {
    const numOfInstances = categories?.map(
      (c) => expenseArr?.filter((exp) => exp.category === c.name).length,
    );
    return numOfInstances;
  };

  const barTimeData = {
    labels: categories?.map((c) => c.name) || [],
    datasets: [
      {
        label: 'Time expenses by category',
        data: getCategoryByExpenseType(timeExpenses) || [],
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
        data: getCategoryByExpenseType(moneyExpenses) || [],
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
