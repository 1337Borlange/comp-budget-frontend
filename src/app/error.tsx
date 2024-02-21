'use client';

import Box from '@/components/Box';
import Button from '@/components/Button';
import Link from 'next/link';
import { FC } from 'react';

interface IErrorProps {
  error: Error;
  retry?: () => void;
}

const error: FC<IErrorProps> = ({ error, retry }) => {
  const tryAgain = () => {
    if (retry) {
      retry();
    }
  };

  return (
    <Box spacing="m">
      <Box spacing="s">
        <h1 style={{ color: 'var(--colors-error)' }}>{error.name}</h1>
        <p>{error.message}</p>
      </Box>
      <Box spacing="s">{retry && <Button onClick={() => tryAgain()}>Retry</Button>}</Box>
      <Link href="/" className="button">
        Go back 
      </Link>
    </Box>
  );
};

export default error;
