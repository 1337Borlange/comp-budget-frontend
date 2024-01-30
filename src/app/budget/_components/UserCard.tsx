import Divider from '@/components/Divider';
import Grid from '@/components/Grid';
import Column from '@/components/Column';
import { ValueHeader } from '@/components/Values';
import { Budget, ExpenseDTO, User } from '@/lib/types';
import UserModal from './UserModal';
import '../../../styles/components/usercard.scss';
import Box from '@/components/Box';

type UserCardProps = {
  budget?: Budget;
  user?: User;
  expenses?: ExpenseDTO[];
};

export const UserCard: React.FunctionComponent<UserCardProps> = ({ budget, user, expenses }) => {
  console.log('userCard: ', user);
  if (!budget) return null;

  return (
    <div className="user-card">
      <Grid spacing="l">
        <Column lg="4" md="4" sm="4" xs="12" alignItems="center">
          <div>
            <ValueHeader>Time balance</ValueHeader>
            <strong>
              {budget?.currentTimeBalance} / {budget?.openingBalanceTime}
            </strong>
          </div>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12" alignItems="center">
          <div>
            <ValueHeader>Total money balance</ValueHeader>
            <strong>
              {budget?.currentMoneyBalance} / {budget?.openingBalanceMoney}
            </strong>
          </div>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12" alignItems="center">
          <div>
            <ValueHeader>Hardware balance</ValueHeader>
            <strong>
              {budget?.currentHardwareBalance} / {budget?.hardwareBudget}
            </strong>
          </div>
        </Column>
      </Grid>
      <Divider spacing="xs" />
      <Box alignItems="stretch">
        <UserModal budget={budget} user={user} expenses={expenses} />
      </Box>
    </div>
  );
};
