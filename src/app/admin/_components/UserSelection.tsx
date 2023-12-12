'use client';

import ComboBox from '@/components/ComboBox';
import { User } from '@/lib/types';
import { useRouter } from 'next/navigation';

type UserSelectionProps = {
  users: User[];
  selectedUser?: User;
};

const UserSelection = ({ users, selectedUser }: UserSelectionProps) => {
  const router = useRouter();
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
        router.push(`/admin?userId=${val?.id ?? ''}`);
      }}
    />
  );
};

export default UserSelection;
