import { PropsWithChildren } from 'react';
import '../styles/components/modalcontent.scss';

export const ModalContent = (props: PropsWithChildren) => {
  return <div className="modal-content" {...props} />;
};
