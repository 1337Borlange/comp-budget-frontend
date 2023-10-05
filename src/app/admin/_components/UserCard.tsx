import Divider from '@/components/Divider';
import Grid from '@/components/Grid';
import Column from '@/components/Column';
import { ValueHeader } from '@/components/Values';
import { Budget, User, Expense } from '@/lib/types';
import UserModal from './UserModal';
import '../../../styles/components/usercard.scss';

type UserCardProps = {
  budget?: Budget;
  user?: User;
  expenses?: Expense[];
};

export const UserCard: React.FunctionComponent<UserCardProps> = ({
  budget,
  user,
  expenses,
}) => {
  //   const { budget } = useGetBudgets(user.userId, false);
  if (!budget) return null;
  return (
    <div className="user-card">
      <h3>Current user</h3>
      <Divider spacing="2xs" color="transparent" />
      <h4>
        <span>
          {user?.name}
          {/* {user.name} ({user.userId}) */}
        </span>
        {/* <UserImage size={50} url={user.image} alt={user.name} /> */}
      </h4>
      <Divider spacing="xs" />
      <Grid spacing="m">
        <Column lg="6" md="6" sm="6" xs="6">
          <div>
            <ValueHeader>Time balance</ValueHeader>
            <strong>
              {budget?.currentTimeBalance} / {budget?.openingBalanceTime}
            </strong>
          </div>
        </Column>
        <Column lg="6" md="6" sm="6" xs="6">
          <div>
            <ValueHeader>Total money balance</ValueHeader>
            <strong>
              {budget?.currentMoneyBalance} / {budget?.openingBalanceMoney}
            </strong>
          </div>
        </Column>
      </Grid>
      <Divider spacing="xs" />
      <Grid spacing="m">
        <Column lg="6" md="6" sm="6" xs="6">
          <div>
            <ValueHeader>Hardware balance</ValueHeader>
            <strong>
              {budget?.currentHardwareBalance} / {budget?.hardwareBudget}
            </strong>
          </div>
        </Column>
        <Column lg="6" md="6" sm="6" xs="6">
          <UserModal budget={budget} user={user} expenses={expenses} />
        </Column>
      </Grid>
    </div>
  );
};
