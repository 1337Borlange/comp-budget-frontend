import { PropsWithChildren } from 'react';

export const ModalContent = (props: PropsWithChildren) => {
  return <div className="modal-content" {...props} />;
};
