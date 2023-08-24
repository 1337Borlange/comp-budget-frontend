'use client';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Button from './Button';
import '../styles/components/button.scss';

const SignIn = () => {
  const { data: session } = useSession();
  if (session && session?.user) {
    redirect('/mybudget');
  }
  return (
    <a className="button primary" href="/api/auth/signin">
      Sign in
    </a>
  );
  // return <Button onClick={() => signIn()}>Sign in</Button>;
};

export default SignIn;
