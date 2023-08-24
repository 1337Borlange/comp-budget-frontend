'use client';
import { Budget, Expense, User } from '@/lib/types';
import { Timeline } from './Timeline';
import Box from './Box';
import Divider from './Divider';
import Grid from './Grid';
import Column from './Column';
import { ValueContent, ValueHeader } from './Values';
import Counter from './Counter';
// import { UserImage } from './UserImage';
type UserProfileProps = {
  //   user?: User;
  budget?: Budget;
  expenses: Expense[];
  title: string;
};
export const UserProfile: React.FunctionComponent<UserProfileProps> = ({
  title,
  budget,
  expenses,
}) => {
  return (
    <div>
      <Box spacing="l" alignItems="center">
        {/* <UserImage size={100} url={user.image} alt={user.name} /> */}
        <Divider spacing="xs" color="transparent" />
        <h3>{title}</h3>
      </Box>
      <Divider spacing="l" />
      <Grid spacing="l">
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor="var(--colors-silver)" spacing="m">
            <ValueHeader>Time balance</ValueHeader>
            <ValueContent>
              <Counter from={0} to={budget?.currentTimeBalance ?? 0} />
            </ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor="var(--colors-silver)" spacing="m">
            <ValueHeader>Money balance</ValueHeader>
            <ValueContent>
              <Counter from={0} to={budget?.currentMoneyBalance ?? 0} />
            </ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor="var(--colors-silver)" spacing="m">
            <ValueHeader>Hardware balance</ValueHeader>
            <ValueContent>
              <Counter from={0} to={budget?.currentHardwareBalance ?? 0} />
            </ValueContent>
          </Box>
        </Column>
      </Grid>
      <Divider spacing="2xl" />
      <h3>Expenses</h3>
      <Divider spacing="m" />
      {expenses && <Timeline expenses={expenses} />}
    </div>
  );
};
