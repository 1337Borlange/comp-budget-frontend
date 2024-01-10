'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import ComboBox from '@/components/ComboBox';
import { User } from '@/lib/types';

type UserSelectionProps = {
  users: User[];
  selectedUser?: User;
  me: User | undefined;
};

const UserSelection = ({ users, selectedUser, me }: UserSelectionProps) => {
  const router = useRouter();

  const defaultValue = useMemo(() => {
    return selectedUser
      ? selectedUser.name
      : users.find((user) => String(user.id) === String(me?.id))?.name;
  }, [me, users, selectedUser]);

  return (
    <ComboBox
      fullWidth
      defaultValue={defaultValue}
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
