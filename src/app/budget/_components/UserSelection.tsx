'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import ComboBox from '@/components/ComboBox';
import { User } from '@/lib/types';

type UserSelectionProps = {
  users: User[] | undefined;
  me: User | undefined;
};

const UserSelection = ({ users, me }: UserSelectionProps) => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('id');

  const data = useMemo(() => {
    if (!users) return [];

    return users.map((user) => ({
      id: user.id,
      title: user.name,
    }));
  }, []);

  const defaultValue = useMemo(() => {
    if (!users || !me) return undefined;

    const selectedUser = users.find((user) => String(user.id) === id) ?? me;
    return selectedUser.name;
  }, [me, users, id]);

  return (
    <ComboBox
      fullWidth
      defaultValue={defaultValue}
      label="Select user"
      data={data}
      handleChange={(val) => {
        router.push(`/budget/user?id=${val?.id ?? ''}`);
      }}
    />
  );
};

export default UserSelection;
