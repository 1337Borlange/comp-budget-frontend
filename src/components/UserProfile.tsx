import { Budget, ExpenseDTO, User } from '@/lib/types';
import { Timeline } from './Timeline/Timeline';
import Box from './Box';
import Divider from './Divider';
import Grid from './Grid';
import Column from './Column';
import { ValueContent, ValueHeader } from './Values';
import Counter from './Counter';
import UserImage from './UserImage';
import { leetImgUrl } from '@/lib/settings';
import { getValueStatus } from '@/lib/helpers';
import { ModalButton } from './ModalButton';
import { PenIcon } from './Icons/PenIcon';
import { getBudget, getExpenses, getUser } from '@/app/budget/user/actions';

type UserProfileProps = {
  selectedUserId: string;
  showEdit: boolean;
};

export const UserProfile: React.FunctionComponent<UserProfileProps> = async ({
  showEdit,
  selectedUserId,
}) => {
  const [user, budget, expenses] = await Promise.all([
    getUser(selectedUserId),
    getBudget(selectedUserId),
    getExpenses(selectedUserId),
  ] as const);

  return (
    <Box spacing="l" alignItems="stretch">
      <Box topSpacing="l" leftSpacing="l" rightSpacing="l" alignItems="center" width="100%">
        {user?.name && (
          <UserImage
            size={100}
            width={490}
            height={653}
            url={`${leetImgUrl}/${user?.name?.toLocaleLowerCase().replace(' ', '-')}`}
            alt={user.name}
          />
        )}
        <Divider spacing="xs" color="transparent" />
        <h3>{user?.name ?? 'User'}</h3>
      </Box>
      <Divider spacing="l" color="var(--colors-silver)" />
      <h3>Balance</h3>
      <Divider spacing="s" />
      <Grid spacing="l">
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor="var(--colors-silver)" spacing="m" className="value-wrapper">
            <ValueHeader>Time (h)</ValueHeader>
            <ValueContent
              className={`${getValueStatus(
                budget?.openingBalanceTime ?? 0,
                budget?.currentTimeBalance ?? 0,
              )}`}>
              <Counter from={0} to={budget?.currentTimeBalance ?? 0} /> /{' '}
              {budget?.openingBalanceTime ?? 0}
            </ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor="var(--colors-silver)" spacing="m" className="value-wrapper">
            <ValueHeader>Money (SEK)</ValueHeader>
            <ValueContent
              className={`${getValueStatus(
                budget?.openingBalanceMoney ?? 0,
                budget?.currentMoneyBalance ?? 0,
              )}`}>
              <Counter from={0} to={budget?.currentMoneyBalance ?? 0} /> /{' '}
              {budget?.openingBalanceMoney ?? 0}
            </ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor="var(--colors-silver)" spacing="m" className="value-wrapper">
            <ValueHeader>Hardware (SEK)</ValueHeader>
            <ValueContent
              className={`${getValueStatus(
                budget?.hardwareBudget ?? 0,
                budget?.currentHardwareBalance ?? 0,
              )}`}>
              <Counter from={0} to={budget?.currentHardwareBalance ?? 0} /> /{' '}
              {budget?.hardwareBudget ?? 0}
            </ValueContent>
          </Box>
        </Column>
      </Grid>
      <Divider spacing="l" color="var(--colors-silver)" />
      <Grid spacing="s">
        <Column lg="6" md="6" sm="6" xs="12">
          <h3>Expenses</h3>
        </Column>
        <Column lg="6" md="6" sm="6" xs="12" justifyContent="flex-end" alignItems="flex-end">
          {user?.isAdmin && (
            <ModalButton text="Add expense" icon={<PenIcon />} modalName="showAddExpense" />
          )}
        </Column>
      </Grid>

      <Divider spacing="l" color="var(--colors-silver)" />
      {expenses && <Timeline expenses={expenses} showEdit={showEdit} />}
    </Box>
  );
};
