'use client';

import Box from '@/components/Box';
import Column from '@/components/Column';
import Divider from '@/components/Divider';
import Grid from '@/components/Grid';
import { ValueContent, ValueHeader } from '@/components/Values';
import { barColors } from '@/lib/helpers';
import { Category, Expense } from '@/lib/types';
import { useCallback, useMemo } from 'react';
import BarChart from './BarChart';

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

const Stats = () => {
  const allExpenses: Expense[] = [];
  const categories: Category[] = [];
  const allUsers: any = [];

  const timeExpenses = useMemo(() => {
    return allExpenses?.filter((exp) => exp.type === 'time') || [];
  }, [allExpenses]);

  const moneyExpenses = useMemo(() => {
    return allExpenses?.filter((exp) => exp.type === 'money') || [];
  }, [allExpenses]);

  const getAverageValue = useCallback(
    (expenseArr: Expense[]) => {
      const noUsers = Array.isArray(allUsers) ? allUsers?.length : 0;
      const totalValue = expenseArr?.reduce((acc, curr) => {
        return (acc += curr.sum);
      }, 0);

      return Math.round(totalValue / noUsers);
    },
    [allUsers]
  );

  const averageTimePerUser = useMemo(() => {
    return getAverageValue(timeExpenses);
  }, [getAverageValue, timeExpenses]);

  const averageMoneyPerUser = useMemo(() => {
    return getAverageValue(moneyExpenses);
  }, [getAverageValue, moneyExpenses]);
  const averageHardwarePerUser = useMemo(() => {
    return getAverageValue(moneyExpenses.filter((exp) => exp.isHardware));
  }, [getAverageValue, moneyExpenses]);

  const getCategoryByExpenseType = useCallback(
    (expenseArr: Expense[]) => {
      const numOfInstances = categories?.map(
        (c) => expenseArr?.filter((exp) => exp.category === c.name).length
      );
      return numOfInstances;
    },
    [categories]
  );

  const barTimeData = useMemo(() => {
    return {
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
  }, [categories, getCategoryByExpenseType, timeExpenses]);
  const barMoneyData = useMemo(() => {
    return {
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
  }, [categories, getCategoryByExpenseType, moneyExpenses]);
  return (
    <>
      <Grid spacing="l">
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor="var(--colors-silver)" spacing="m">
            <ValueHeader>Time used per employee</ValueHeader>
            <ValueContent>{averageTimePerUser}h</ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor="var(--colors-silver)" spacing="m">
            <ValueHeader>Money used per employee</ValueHeader>
            <ValueContent>{averageMoneyPerUser} kr</ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor="var(--colors-silver)" spacing="m">
            <ValueHeader>Hardware spent per employee</ValueHeader>
            <ValueContent>{averageHardwarePerUser} kr</ValueContent>
          </Box>
        </Column>
      </Grid>
      <Divider spacing="l" />
      <h3>Categories</h3>
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
