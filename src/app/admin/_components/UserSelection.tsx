'use client';

import ComboBox from '@/components/ComboBox';
import { Employee } from '@/lib/types';
import { useRouter } from 'next/navigation';

type UserSelectionProps = {
  users: Employee[];
};

const UserSelection = ({ users }: UserSelectionProps) => {
  const router = useRouter();
  return (
    <ComboBox
      fullWidth
      label="Select user"
      data={users.map((user) => ({
        id: user.id,
        title: user.name,
      }))}
      handleChange={(val) => router.push(`/admin?userId=${val?.id ?? ''}`)}
    />
  );
};

export default UserSelection;
