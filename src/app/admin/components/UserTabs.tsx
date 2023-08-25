'use client';

import { TabItem, Tabs } from '@/components/Tabs';
import { useAdminContext } from './AdminContext';
import { AddExpense } from './AddExpense';
import { UserIcon } from '@/components/Icons/UserIcon';
import { UpdateUser } from './UpdateUser';
import { Category } from '@/lib/types';

type UserTabsProps = {
  categories: Category[];
};

const UserTabs = ({ categories }: UserTabsProps) => {
  const { user } = useAdminContext();
  return user ? (
    <Tabs spaceEvenly>
      <TabItem eventKey="expense" title="Add expense">
        <AddExpense reqType="create" categories={categories} />
      </TabItem>
      <TabItem eventKey="updateuser" title="Update user">
        <UpdateUser />
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
