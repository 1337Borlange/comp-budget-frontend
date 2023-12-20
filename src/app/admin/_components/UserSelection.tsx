'use client';

import ComboBox from '@/components/ComboBox';
import { User } from '@/lib/types';
import { usePathname, useRouter } from 'next/navigation';
import { useLocalStorage } from '@/lib/hooks';

type UserSelectionProps = {
  users: User[];
  selectedUser?: User;
};

const UserSelection = ({ users, selectedUser }: UserSelectionProps) => {
  const [storedValue, setValue] = useLocalStorage('selectedUser', selectedUser?.id);
  const router = useRouter();
  const path = usePathname();
  const isOnBudgetPage = path === '/budget';

  if (!isOnBudgetPage && storedValue) {
    selectedUser = users.find((user: User) => user.id === storedValue);
  }

  console.log({ isOnBudgetPage, selectedUser });

  return (
    <ComboBox
      fullWidth
      defaultValue={selectedUser?.name}
      label="Select user"
      data={users.map((user) => ({
        id: user.id,
        title: user.name,
      }))}
      handleChange={(val) => {
        router.push(`/budget/user?id=${val?.id ?? ''}`);
        setValue(val?.id);
      }}
    />
  );
};

export default UserSelection;
