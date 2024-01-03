import { TabItem, Tabs } from '@/components/Tabs';
import { AddExpense } from './AddExpense';
import { UserIcon } from '@/components/Icons/UserIcon';
import { UpdateBudget } from './UpdateBudget';
import { Budget, Category, CategoryType, User } from '@/lib/types';
import { UpdateUser } from './UpdateUser';

type UserTabsProps = {
  me?: User;
  categories: Category[];
  user?: User;
  allUsers?: User[];
  budget?: Budget;
  categoryTypes: CategoryType[];
};

const UserTabs = ({
  me,
  categories,
  user,
  budget,
  categoryTypes,
  allUsers = [],
}: UserTabsProps) => {
  return user ? (
    <Tabs spaceEvenly>
      <TabItem eventKey="expense" title="Add expense">
        <AddExpense
          categoryTypes={categoryTypes}
          reqType="create"
          categories={categories}
          user={user}
        />
      </TabItem>
      <TabItem eventKey="updatebudget" title="Update budget">
        <UpdateBudget budget={budget} user={user} allUsers={allUsers} />
      </TabItem>
      <TabItem eventKey="updateuser" title="Update user">
        <UpdateUser me={me} user={user} allUsers={allUsers} />
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
