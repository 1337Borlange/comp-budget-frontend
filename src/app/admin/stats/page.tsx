import React from 'react';
import { ArrowLeftIcon } from '@/components/Icons/ArrowLeftIcon';
import Divider from '@/components/Divider';
import Link from 'next/link';
import Stats from '../_components/Stats';
import Box from '@/components/Box';
import { apiFetch } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Category, Expense, User } from '@/lib/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Statistics',
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

export default async function AdminStats() {
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
  return (
    <div>
      <Box topSpacing="m" leftSpacing="l" rightSpacing="l" bottomSpacing="m">
        <Link className="button outline icon-left" href="/admin">
          <ArrowLeftIcon /> Back
        </Link>
      </Box>
      <Divider spacing="none" color="var(--colors-silver)" />
      <Box spacing="l">
        <h2>Statistics</h2>
        <Divider spacing="l" color="var(--colors-silver)" />
        <h3>Average usage of budget per employee (past year)</h3>
        <Divider spacing="s" color="transparent" />
        <Stats
          allExpenses={allExpenses}
          allUsers={allUsers}
          categories={categories}
        />
      </Box>
    </div>
  );
}
