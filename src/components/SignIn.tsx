import { redirect } from 'next/navigation';
import '../styles/components/button.scss';
import { User } from 'next-auth';
import { getMe } from '@/app/budget/_actions/actions';

const SignIn = async () => {
  let me: User | undefined;

  try {
    me = await getMe();
  } catch (e) {
    console.error(e);
  }

  if (me?.id) {
    redirect(`/budget/user?id=${me?.id}`);
  }

  return (
    <a className="button primary" href="/api/auth/signin">
      Sign in
    </a>
  );
};

export default SignIn;
