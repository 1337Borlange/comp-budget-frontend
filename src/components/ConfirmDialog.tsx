'use client';

import { PropsWithChildren } from 'react';
import Button from './Button';
import Column from './Column';
import Divider from './Divider';
import Grid from './Grid';
import Modal, { ModalProps } from './Modal';

interface ConfirmDialogProps extends ModalProps {
  title: string;
  action: any;
}

export const ConfirmDialog: React.FunctionComponent<ConfirmDialogProps & PropsWithChildren> = ({
  children,
  action,
  title,
  onClose,
  width,
  id,
  visible,
}) => {
  const handleOnClose = () => {
    if (!onClose) {
      return;
    }

    onClose();
  };

  return (
    <Modal id={id} blur onClose={onClose} visible={visible} width={width} disableClick>
      <h3>{title}</h3>
      <Divider spacing="l" />
      <form action={action}>
        {children}
        <Divider spacing="l" />
        <Grid spacing="l">
          <Column lg="6" md="6" sm="6" xs="6">
            <Button priority="secondary" onClick={() => handleOnClose()}>
              Cancel
            </Button>
          </Column>
          <Column lg="6" md="6" sm="6" xs="6">
            <Button priority="primary" type="submit">
              Confirm
            </Button>
          </Column>
        </Grid>
      </form>
    </Modal>
  );
};
