'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import '../styles/components/button.scss';

const SignIn = () => {
  const { data: session } = useSession();
  if (session && session?.user) {
    redirect('/budget');
  }
  return (
    <a className="button primary" href="/api/auth/signin">
      Sign in
    </a>
  );
};

export default SignIn;
