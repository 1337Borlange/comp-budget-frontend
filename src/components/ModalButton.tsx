'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface ModalButtonProps {
  text: string;
  icon: React.ReactNode;
  modalName: string;
}

export const ModalButton = ({ text, icon, modalName }: ModalButtonProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const fullUrl = `${pathname}${id ? `?id=${id}&${modalName}=true` : ''}`;
  const isDisabled = searchParams.get(modalName) === 'true';

  return (
    <Link className={'button outline icon-right'} href={fullUrl} aria-disabled={isDisabled}>
      {text} {icon}
    </Link>
  );
};
