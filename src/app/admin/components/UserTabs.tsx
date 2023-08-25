import { TabItem, Tabs } from '@/components/Tabs';
import { AddExpense } from './AddExpense';
import { UserIcon } from '@/components/Icons/UserIcon';
import { UpdateUser } from './UpdateUser';
import { Budget, Category, User } from '@/lib/types';

type UserTabsProps = {
  categories: Category[];
  user?: User;
  budget?: Budget;
};

const UserTabs = ({ categories, user, budget }: UserTabsProps) => {
  return user ? (
    <Tabs spaceEvenly>
      <TabItem eventKey="expense" title="Add expense">
        <AddExpense reqType="create" categories={categories} user={user} />
      </TabItem>
      <TabItem eventKey="updateuser" title="Update user">
        <UpdateUser budget={budget} user={user} />
      </TabItem>
    </Tabs>
  ) : (
    <div className="no-user">
      <UserIcon />
      <div>Please select a user.</div>
    </div>
  );
};

export default UserTabs;
