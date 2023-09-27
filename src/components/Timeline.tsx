'use client';

import { HardwareIcon } from './Icons/HardwareIcon';
import { TimeIcon } from './Icons/TimeIcon';
import { MoneyIcon } from './Icons/MoneyIcon';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PenIcon } from './Icons/PenIcon';
import { DeleteIcon } from './Icons/DeleteIcon';
import format from 'date-fns/format';
import { ConfirmDialog } from './ConfirmDialog';

import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
} from 'framer-motion';

import '../styles/components/timeline.scss';
import Grid from './Grid';
import Column from './Column';
import Divider from './Divider';
import Button from './Button';
import { Expense } from '@/lib/types';
import { InlineStack } from './InlineStack';
import { apiFetch, getExpenseType } from '@/lib/helpers';
import { useRouter } from 'next/navigation';
import { apiUrl } from '@/lib/settings';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { deleteExpense } from '@/app/admin/_components/actions';

const getIcon = (type: string) => {
  switch (type) {
    case 'hardware':
      return <HardwareIcon />;
    case 'time':
      return <TimeIcon />;
    default:
      return <MoneyIcon />;
  }
};

type TimelineProps = {
  expenses: Expense[];
  showEdit: boolean;
};

const listItem = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

const TimeLineItem = ({
  exp,
  setShowConfirmDelete,
  setExpenseToDelete,
  showEdit,
}: {
  exp: Expense;
  setShowConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setExpenseToDelete: React.Dispatch<React.SetStateAction<Expense | undefined>>;
  showEdit: boolean;
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref);
  useEffect(() => {
    if (inView) {
      controls.start('animate');
    }
  }, [controls, inView]);

  return (
    <motion.li
      ref={ref}
      initial="initial"
      animate={controls}
      exit="exit"
      variants={listItem}
    >
      <div className="expense-wrapper">
        <div className="expense-icon">{getIcon(getExpenseType(exp))}</div>
        <div className="expense-content">
          <Grid spacing="l">
            <Column lg="8" md="8" sm="8" xs="12">
              <div>
                <strong>{format(new Date(exp.date), 'yyyy-MM-dd')}</strong>
              </div>
              <Divider spacing="s" color="transparent" />
              <div>
                <strong>Type: </strong> {getExpenseType(exp)}
              </div>
              <div>
                <strong>Category: </strong> {exp.category}
              </div>
              <div>
                <strong>Name: </strong> {exp.name}
              </div>
              <div>
                <strong>Comment: </strong> {exp.comment}
              </div>
            </Column>
            <Column lg="4" md="4" sm="4" xs="12" alignItems="flex-end">
              <span className="expense-sum">
                {exp.sum} {exp.type === 'time' ? 'h' : 'SEK'}
              </span>
            </Column>
          </Grid>
          {/* {isAdmin && path.includes('admin') && ( */}
          {showEdit && (
            <div className="expense-buttons">
              <Link
                className="button outline icon-only"
                href={`/admin/edit/${exp.id}`}
              >
                <PenIcon />
              </Link>
              <Button
                priority="outline"
                onClick={() => {
                  setShowConfirmDelete(true);
                  setExpenseToDelete(exp);
                }}
                iconOnly
              >
                <DeleteIcon />
              </Button>
            </div>
          )}
          {/* )} */}
        </div>
      </div>
    </motion.li>
  );
};

const sortByDate = (a: Expense, b: Expense) => {
  return new Date(b.date).valueOf() - new Date(a.date).valueOf();
};

export const Timeline: React.FunctionComponent<TimelineProps> = ({
  expenses,
  showEdit,
}) => {
  const session = useSession();
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | undefined>();

  const sortedExpenses = expenses.sort(sortByDate);

  const allYears: number[] = useMemo(() => {
    return sortedExpenses.reduce((acc: number[], curr: Expense) => {
      const year = new Date(curr.date).getFullYear();
      return [...new Set([...acc, year])];
    }, []);
  }, [sortedExpenses]);

  // const deleteExpense = (id: string) => {
  //   fetch(`/api/admin/expense?id=${id}`, { method: 'DELETE' })
  //     .then(() => router.push('/admin'))
  //     .catch(console.error);
  // };
  const filteredExpenses = useMemo(() => {
    return sortedExpenses.filter(
      (exp) => new Date(exp.date).getFullYear() === selectedYear
    );
  }, [selectedYear, sortedExpenses]);

  return (
    <>
      <h5>By year</h5>
      <Divider spacing="2xs" color="transparent" />
      <InlineStack spacing="s">
        {allYears.map((year) => (
          <Button
            key={`filter-year-${year}`}
            priority={`${year === selectedYear ? 'primary' : 'outline'}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </Button>
        ))}
      </InlineStack>
      <ul className="timeline-wrapper">
        <AnimatePresence>
          {filteredExpenses.map((exp) => (
            <TimeLineItem
              key={exp.id}
              setExpenseToDelete={setExpenseToDelete}
              exp={exp}
              showEdit={showEdit}
              setShowConfirmDelete={setShowConfirmDelete}
            />
          ))}
        </AnimatePresence>
      </ul>
      <ConfirmDialog
        id="confirm-delete-dialog"
        visible={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        // onConfirm={() => {
        //   if (expenseToDelete?.id) {
        //     deleteExpense(expenseToDelete?.id);
        //   }
        //   setShowConfirmDelete(false);
        // }}
        width="30rem"
        action={deleteExpense}
        title="Delete expense"
      >
        <p>Are you sure you want to delete this expense?</p>
        <input
          type="hidden"
          name="expenseId"
          id="expenseId"
          value={expenseToDelete?.id}
        />
      </ConfirmDialog>
    </>
  );
};
