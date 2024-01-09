'use client';

import ComboBox from '@/components/ComboBox';
import { User } from '@/lib/types';
import { useRouter } from 'next/navigation';

type UserSelectionProps = {
  users: User[];
  selectedUser?: User;
  me: User | undefined;
};

const UserSelection = ({ users, selectedUser, me }: UserSelectionProps) => {
  const router = useRouter();
  const defaultSelectedUser = me
    ? users.find((user) => String(user.id) === String(me.id))
    : selectedUser;

  return (
    <ComboBox
      fullWidth
      defaultValue={defaultSelectedUser?.name}
      label="Select user"
      data={users.map((user) => ({
        id: user.id,
        title: user.name,
      }))}
      handleChange={(val) => {
        router.push(`/budget/user?id=${val?.id ?? ''}`);
      }}
    />
  );
};

export default UserSelection;
