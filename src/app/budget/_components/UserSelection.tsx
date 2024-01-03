'use client';

import ComboBox from '@/components/ComboBox';
import { User } from '@/lib/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type UserSelectionProps = {
  users: User[];
  selectedUser?: User;
};

const UserSelection = ({ users, selectedUser }: UserSelectionProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const internalUserId = (session as any)?.internalUserId;
  const defaultSelectedUser = internalUserId
    ? users.find((user) => String(user.id) === internalUserId)
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
