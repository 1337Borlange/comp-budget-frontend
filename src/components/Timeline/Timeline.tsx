'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import format from 'date-fns/format';
import { AnimatePresence, motion, useAnimation, useInView } from 'framer-motion';

import { ExpenseDTO } from '@/lib/types';

import { DeleteIcon } from '../Icons/DeleteIcon';
import { HardwareIcon } from '../Icons/HardwareIcon';
import { MoneyIcon } from '../Icons/MoneyIcon';
import { PenIcon } from '../Icons/PenIcon';
import { TimeIcon } from '../Icons/TimeIcon';

import Button from '../Button';
import Column from '../Column';
import Divider from '../Divider';
import Grid from '../Grid';
import { deleteExpense } from './actions';
import { InlineStack } from '../InlineStack';
import { ConfirmDialog } from '../ConfirmDialog';

import '../../styles/components/timeline.scss';

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
  expenses: ExpenseDTO[];
  showEdit: boolean;
};

const listItem = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

const TimeLineItem = ({
  expense,
  setShowConfirmDelete,
  setExpenseToDelete,
  showEdit,
}: {
  expense: ExpenseDTO;
  setShowConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setExpenseToDelete: React.Dispatch<React.SetStateAction<ExpenseDTO | undefined>>;
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
    <motion.li ref={ref} initial="initial" animate={controls} exit="exit" variants={listItem}>
      <div className="expense-wrapper">
        {/* //TODO: */}
        {/* <div className="expense-icon">{getIcon(getExpenseType(expense))}</div> */}
        <div className="expense-content">
          <Grid spacing="l">
            <Column lg="8" md="8" sm="8" xs="12">
              <div>
                <strong>{format(new Date(expense.date), 'yyyy-MM-dd')}</strong>
              </div>
              <Divider spacing="s" color="transparent" />
              <div>
                <strong>Type: </strong> {expense.expenseType}
              </div>
              <div>
                <strong>Category: </strong> {expense.categoryId}
              </div>

              <div>
                <strong>Comment: </strong> {expense.comment}
              </div>
            </Column>
            <Column lg="4" md="4" sm="4" xs="12" alignItems="flex-end">
              <span className="expense-sum">{expense.sum} SEK  </span>
            </Column>
          </Grid>
          {showEdit && (
            <div className="expense-buttons">
              <Link className="button outline icon-only" href={`/admin/edit/${expense.id}`}>
                <PenIcon />
              </Link>
              <Button
                priority="outline"
                onClick={() => {
                  setShowConfirmDelete(true);
                  setExpenseToDelete(expense);
                }}
                iconOnly>
                <DeleteIcon />
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.li>
  );
};

const sortByDate = (a: ExpenseDTO, b: ExpenseDTO) => {
  return new Date(b.date).valueOf() - new Date(a.date).valueOf();
};

export const Timeline: React.FunctionComponent<TimelineProps> = ({ expenses, showEdit }) => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [expenseToDelete, setExpenseToDelete] = useState<ExpenseDTO | undefined>();

  const sortedExpenses = expenses.sort(sortByDate);

  const allYears: number[] = useMemo(() => {
    return sortedExpenses.reduce((acc: number[], curr: ExpenseDTO) => {
      const year = new Date(curr.date).getFullYear();
      return [...new Set([...acc, year])];
    }, []);
  }, [sortedExpenses]);

  const filteredExpenses = useMemo(() => {
    return sortedExpenses.filter((exp) => new Date(exp.date).getFullYear() === selectedYear);
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
            onClick={() => setSelectedYear(year)}>
            {year}
          </Button>
        ))}
      </InlineStack>
      <ul className="timeline-wrapper">
        <AnimatePresence>
          {filteredExpenses.map((expense) => (
            <TimeLineItem
              key={expense.id}
              setExpenseToDelete={setExpenseToDelete}
              expense={expense}
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
        width="30rem"
        action={deleteExpense}
        title="Delete expense">
        <p>Are you sure you want to delete this expense?</p>
        <input type="hidden" name="expenseId" id="expenseId" value={expenseToDelete?.id} />
      </ConfirmDialog>
    </>
  );
};
