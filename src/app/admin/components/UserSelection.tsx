'use client';

import ComboBox from '@/components/ComboBox';
import { User } from '@/lib/types';
import { useRouter } from 'next/navigation';

type UserSelectionProps = {
  users: User[];
};

const UserSelection = ({ users }: UserSelectionProps) => {
  const router = useRouter();
  return (
    <ComboBox
      fullWidth
      label="Select user"
      data={users.map((user) => ({
        id: user.userId,
        title: user.name,
      }))}
      handleChange={(val) => router.push(`/admin?userId=${val?.id ?? ''}`)}
    />
  );
};

export default UserSelection;
