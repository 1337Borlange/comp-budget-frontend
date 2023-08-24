import React from 'react';
import { ArrowLeftIcon } from '@/components/Icons/ArrowLeftIcon';
import Divider from '@/components/Divider';
import Link from 'next/link';
import Stats from '../components/Stats';
import Box from '@/components/Box';

export default function AdminStats() {
  return (
    <div>
      <Box topSpacing="m" leftSpacing="m" rightSpacing="m">
        <Link className="button outline icon-left" href="/admin">
          <ArrowLeftIcon /> Back
        </Link>
      </Box>
      <Divider spacing="m" />
      <Box spacing="m">
        <h2>Statistics</h2>
        <Divider spacing="l" />
        <h3>Average usage of budget</h3>
        <Divider spacing="s" color="transparent" />
        <Stats />
      </Box>
    </div>
  );
}
