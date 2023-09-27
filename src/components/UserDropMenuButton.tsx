'use client';

import { useSession } from 'next-auth/react';
import DropMenuButton from './DropMenuButton';
import UserImage from './UserImage';
import Link from 'next/link';
import ToggleDarkMode from './ToggleDarkMode';

const UserDropMenuButton = () => {
  const { data } = useSession();

  return (
    <DropMenuButton
      fromRight
      id="user-menu"
      label={
        <div className="user-button">
          <span className="user-name">{(data as any)?.user?.name}</span>
          <UserImage
            url={(data as any)?.user?.image}
            size={50}
            alt={(data as any)?.user?.name}
          />
        </div>
      }
    >
      {(data as any)?.isAdmin ? (
        <>
          <Link href="/admin">Admin</Link>
          <Link href="/admin/stats">Stats</Link>
          <Link href="/admin/newuser">Add user</Link>
        </>
      ) : null}

      <ToggleDarkMode />
      <a href="/api/auth/signout">Log out</a>
    </DropMenuButton>
  );
};

export default UserDropMenuButton;
