'use client';

import { Sora } from 'next/font/google';

import { Toaster } from 'react-hot-toast';
import { useDarkMode } from '@/lib/hooks';
import { useEffect, useMemo, useState } from 'react';

const sora = Sora({ subsets: ['latin'] });

interface IProps {
  children: React.ReactNode;
}

export const Main = ({ children }: IProps) => {
  const { isDarkMode } = useDarkMode();

  const theme = useMemo(() => {
    return isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  return (
    <html lang="en" className={theme}>
      <body className={sora.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
};
