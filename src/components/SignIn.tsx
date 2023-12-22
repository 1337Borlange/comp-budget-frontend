import { redirect } from 'next/navigation';
import '../styles/components/button.scss';
import { User, getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getMe } from '@/app/budget/actions';

const SignIn = async () => {
  const session = await getServerSession(authOptions);
  let me: User | undefined = undefined;

  try {
    me = await getMe((session as any).id_token);
  } catch (e) {
    console.error(e);
  }

  if (session && me?.id) {
    redirect(`/budget/user?id=${me?.id}`);
  }

  return (
    <a className="button primary" href="/api/auth/signin">
      Sign in
    </a>
  );
};

export default SignIn;
