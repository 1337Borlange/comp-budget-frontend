'use client';

import { useAdminContext } from './AdminContext';

import Divider from '@/components/Divider';
import Grid from '@/components/Grid';
import Column from '@/components/Column';
import { ValueHeader } from '@/components/Values';
import Button from '@/components/Button';
import '../../../styles/components/usercard.scss';

export const UserCard: React.FunctionComponent = () => {
  const { user, setShowUserModal, userBudget: budget } = useAdminContext();
  //   const { budget } = useGetBudgets(user.userId, false);
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
            <strong>{budget?.currentTimeBalance}</strong>
          </div>
        </Column>
        <Column lg="6" md="6" sm="6" xs="6">
          <div>
            <ValueHeader>Total money balance</ValueHeader>
            <strong>{budget?.currentMoneyBalance}</strong>
          </div>
        </Column>
      </Grid>
      <Divider spacing="xs" />
      <Grid spacing="m">
        <Column lg="6" md="6" sm="6" xs="6">
          <div>
            <ValueHeader>Hardware balance</ValueHeader>
            <strong>{budget?.currentHardwareBalance}</strong>
          </div>
        </Column>
        <Column lg="6" md="6" sm="6" xs="6">
          <Button priority="outline" onClick={() => setShowUserModal(true)}>
            Show all
          </Button>
          {/* <div>
            <ValueHeader>Money balance</ValueHeader>
            <strong>{user.currentTimeBalance}</strong>
          </div> */}
        </Column>
      </Grid>
    </div>
  );
};
