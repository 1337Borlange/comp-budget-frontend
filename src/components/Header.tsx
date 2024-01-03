import Link from 'next/link';
import Column from './Column';
import Grid from './Grid';
import Image from 'next/image';

import '../styles/components/header.scss';
import TempDebugComponent from './TempDebugComponent';
import UserDropMenuButton from './UserDropMenuButton';
import Box from './Box';

type HeaderProps = {
  isAdmin: boolean;
};

const Header = ({ isAdmin }: HeaderProps) => {
  return (
    <header>
      <TempDebugComponent />
      <Box spacing="l">
        <Grid spacing="l">
          <Column lg="6" md="6" sm="6" xs="12" className="logo-col">
            <h1>
              <Link href="/">
                <Image src="/comp-logo.svg" alt="Competence budget" width="60" height="60" />
                Competence budget
              </Link>
            </h1>
          </Column>
          <Column lg="6" md="6" sm="6" xs="12" alignItems="flex-end">
            <div className="profile-wrapper">
              <UserDropMenuButton />
            </div>
          </Column>
        </Grid>
      </Box>
    </header>
  );
};

export default Header;
