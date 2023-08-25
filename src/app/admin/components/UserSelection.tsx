'use client';

import ComboBox from '@/components/ComboBox';
import { User } from '@/lib/types';
import { useAdminContext } from './AdminContext';
import { useRouter } from 'next/navigation';

type UserSelectionProps = {
  users: User[];
};

const UserSelection = ({ users }: UserSelectionProps) => {
  // const router = useRouter();
  const { setUser } = useAdminContext();

  const switchUser = (id: string) => {
    const user = users.find((u) => u.userId === id);
    if (user) {
      setUser(user);
    }
  };
  return (
    <ComboBox
      fullWidth
      label="Select user"
      data={users.map((user) => ({
        id: user.userId,
        title: user.name,
      }))}
      handleChange={(val) => switchUser(val?.id ?? '')}
    />
  );
};

export default UserSelection;
