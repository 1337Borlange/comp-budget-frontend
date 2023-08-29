import Link from 'next/link';
import Column from './Column';
import Grid from './Grid';
import Image from 'next/image';
import Button from './Button';
import { Label } from './FormControl/Label';
import { signOut } from 'next-auth/react';
import DropMenuButton from './DropMenuButton';

import '../styles/components/header.scss';
import UserImage from './UserImage';

type HeaderProps = {
  user: any;
  isAdmin: boolean;
};

const Header = ({ user, isAdmin }: HeaderProps) => {
  return (
    <header>
      <Grid spacing="l">
        <Column lg="6" md="6" sm="6" xs="12" className="logo-col">
          <h1>
            <Link href="/mybudget">
              <Image
                src="/comp-logo.svg"
                alt="Competence budget"
                width="60"
                height="60"
              />
              Competence budget
            </Link>
          </h1>
        </Column>
        <Column lg="6" md="6" sm="6" xs="12" alignItems="flex-end">
          <div className="profile-wrapper">
            {user && (
              <DropMenuButton
                fromRight
                id="user-menu"
                label={
                  <div className="user-button">
                    <span className="user-name">{user.name}</span>
                    <UserImage url={user.image} size={50} alt={user.name} />
                  </div>
                }
              >
                {/* <div className="list-switch">
                  <Label htmlFor="is-darkmode">Darkmode</Label> */}
                {/* <ToggleSwitch
                    id="is-darkmode"
                    name="is-darkmode"
                    checked={Boolean(storedSettings?.darkTheme)}
                    onChange={(val) => switchTheme(val)}
                  /> */}
                {/* </div> */}
                {isAdmin && <Link href="/admin">Admin</Link>}
                {isAdmin && <Link href="/admin/stats">Stats</Link>}
                <Link href="/api/auth/signout">Log out</Link>
              </DropMenuButton>
            )}
          </div>
        </Column>
      </Grid>
    </header>
  );
};

export default Header;
