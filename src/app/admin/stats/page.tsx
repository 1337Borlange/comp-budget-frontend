import React from 'react';
import { ArrowLeftIcon } from '@/components/Icons/ArrowLeftIcon';
import Divider from '@/components/Divider';
import Link from 'next/link';
import Stats from '../_components/Stats';
import Box from '@/components/Box';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Statistics',
};

export default async function AdminStats() {
  return (
    <div>
      <Box topSpacing="m" leftSpacing="l" rightSpacing="l" bottomSpacing="m">
        <Link className="button outline icon-left" href="/admin">
          <ArrowLeftIcon /> Back
        </Link>
      </Box>
      <Divider spacing="none" color="var(--colors-silver)" />
      <Box spacing="l">
        <h2>Statistics</h2>
        <Divider spacing="l" color="var(--colors-silver)" />
        <h3>Average usage of budget per employee (past year)</h3>
        <Divider spacing="s" color="transparent" />
        <Stats />
      </Box>
    </div>
  );
}
