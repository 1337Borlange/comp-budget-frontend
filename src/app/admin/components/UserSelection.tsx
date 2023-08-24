'use client';

import ComboBox from '@/components/ComboBox';

const UserSelection = () => {
  const users: any[] = [];
  return (
    <ComboBox
      fullWidth
      label="Select user"
      data={users.map((user) => ({
        id: user.userId,
        title: user.name,
      }))}
      handleChange={(val) => console.log(val)}
    />
  );
};

export default UserSelection;
