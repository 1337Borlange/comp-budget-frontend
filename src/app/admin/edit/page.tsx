'use client';

import { useRouter } from 'next/navigation';
import { useAdminContext } from '../components/AdminContext';
import Button from '@/components/Button';
import { ArrowLeftIcon } from '@/components/Icons/ArrowLeftIcon';
import Divider from '@/components/Divider';
import { AddExpense } from '../components/AddExpense';
import Box from '@/components/Box';

export default function Edit() {
  const { selectedExpense } = useAdminContext();
  const router = useRouter();
  return (
    <div>
      <Box topSpacing="m" leftSpacing="m" rightSpacing="m">
        <Button priority="outline" iconLeft onClick={() => router.back()}>
          <ArrowLeftIcon /> Back
        </Button>
      </Box>
      <Divider spacing="s" />
      <Box spacing="m" alignItems="stretch">
        <AddExpense reqType="update" expense={selectedExpense} />
      </Box>
    </div>
  );
}
