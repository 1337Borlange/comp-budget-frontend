import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="not-found">
      <Image
        src="/comp-logo-notfound.svg"
        alt="Competence budget"
        width="120"
        height="120"
      />
      <h1>Not found – 404!</h1>
      <div>
        <Link href="/" className="button">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
