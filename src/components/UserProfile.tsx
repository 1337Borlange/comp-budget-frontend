import { Budget, Expense, User } from '@/lib/types';
import { Timeline } from './Timeline';
import Box from './Box';
import Divider from './Divider';
import Grid from './Grid';
import Column from './Column';
import { ValueContent, ValueHeader } from './Values';
import Counter from './Counter';
import UserImage from './UserImage';
import { leetImgUrl, maxValues } from '@/lib/settings';
import { getValueStatus } from '@/lib/helpers';
// import { UserImage } from './UserImage';
type UserProfileProps = {
  user?: User;
  budget?: Budget;
  expenses: Expense[];
  title: string;
  showEdit: boolean;
};
export const UserProfile: React.FunctionComponent<UserProfileProps> = ({
  title,
  budget,
  expenses,
  showEdit,
  user,
}) => {
  return (
    <div>
      <Box topSpacing="l" leftSpacing="l" rightSpacing="l" alignItems="center">
        {user && (
          <UserImage
            size={100}
            width={490}
            height={653}
            url={`${leetImgUrl}/${user.name
              .toLocaleLowerCase()
              .replace(' ', '-')}`}
            alt={user.name}
          />
        )}
        <Divider spacing="xs" color="transparent" />
        <h3>{title}</h3>
      </Box>
      <Divider spacing="l" color="var(--colors-silver)" />
      <Grid spacing="l">
        <Column lg="4" md="4" sm="4" xs="12">
          <Box
            backgroundColor="var(--colors-silver)"
            spacing="m"
            className="value-wrapper"
          >
            <ValueHeader>Time balance (hours)</ValueHeader>
            <ValueContent
              className={`${getValueStatus(
                budget?.openingBalanceTime ?? 0,
                budget?.currentTimeBalance ?? 0
              )}`}
            >
              <Counter from={0} to={budget?.currentTimeBalance ?? 0} /> /{' '}
              {budget?.openingBalanceTime ?? 0}
            </ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box
            backgroundColor="var(--colors-silver)"
            spacing="m"
            className="value-wrapper"
          >
            <ValueHeader>Money balance (SEK)</ValueHeader>
            <ValueContent
              className={`${getValueStatus(
                budget?.openingBalanceMoney ?? 0,
                budget?.currentMoneyBalance ?? 0
              )}`}
            >
              <Counter from={0} to={budget?.currentMoneyBalance ?? 0} /> /{' '}
              {budget?.openingBalanceMoney ?? 0}
            </ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box
            backgroundColor="var(--colors-silver)"
            spacing="m"
            className="value-wrapper"
          >
            <ValueHeader>Hardware balance (SEK)</ValueHeader>
            <ValueContent
              className={`${getValueStatus(
                budget?.hardwareBudget ?? 0,
                budget?.currentHardwareBalance ?? 0
              )}`}
            >
              <Counter from={0} to={budget?.currentHardwareBalance ?? 0} /> /{' '}
              {budget?.hardwareBudget ?? 0}
            </ValueContent>
          </Box>
        </Column>
      </Grid>
      <Divider spacing="l" color="var(--colors-silver)" />
      <h3>Expenses</h3>
      <Divider spacing="l" color="var(--colors-silver)" />
      {expenses && <Timeline expenses={expenses} showEdit={showEdit} />}
    </div>
  );
};
