import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { useState } from 'react';

export const addUserModal = () => {
  const [showUserModal, setShowUserModal] = useState(false);
  return (
    <>
      <Button priority="outline" onClick={() => setShowUserModal(true)}>
        Add user
      </Button>
      <Modal
        id="add-user-modal"
        blur
        onClose={() => setShowUserModal(false)}
        visible={showUserModal}></Modal>
    </>
  );
};
