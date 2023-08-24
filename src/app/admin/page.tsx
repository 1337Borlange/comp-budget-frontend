import Box from '@/components/Box';
import Column from '@/components/Column';
import Divider from '@/components/Divider';
import Grid from '@/components/Grid';
import { StatsIcon } from '@/components/Icons/StatsIcon';
import Link from 'next/link';
import { UserCard } from './components/UserCard';
import UserTabs from './components/UserTabs';
import UserModal from './components/UserModal';
import UserSelection from './components/UserSelection';

export default function Admin() {
  return (
    <div>
      <Box
        topSpacing="m"
        leftSpacing="m"
        rightSpacing="m"
        alignItems="flex-end"
      >
        <Link className="button icon-right" href="/admin/stats">
          Show statistics <StatsIcon />
        </Link>
      </Box>
      <Divider spacing="m" color="var(--colors-silver)" />
      <Box spacing="m">
        <Grid spacing="l">
          <Column lg="6" md="6" sm="6" xs="12" alignItems="flex-start">
            <UserSelection />
          </Column>
          <Column lg="6" md="6" sm="6" xs="12">
            <UserCard />
          </Column>
        </Grid>
      </Box>
      <Divider spacing="2xl" />
      <Box spacing="m" alignItems="stretch">
        <UserTabs />
      </Box>
      <UserModal />
    </div>
  );
}
