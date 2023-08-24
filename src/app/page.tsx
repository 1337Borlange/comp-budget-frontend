import Image from 'next/image';
// import styles from './page.module.css';
import Divider from '@/components/Divider';
import SignIn from '@/components/SignIn';
import '../styles/components/signin.scss';

export default function Home() {
  return (
    <main>
      <div className="signin">
        <Image
          src="/comp-logo.svg"
          alt="Competence budget"
          width="200"
          height="200"
        />
        <Divider spacing="s" color="transparent" />
        <h1>My competence budget</h1>
        <Divider spacing="l" color="transparent" />
        <SignIn />
      </div>
    </main>
  );
}
