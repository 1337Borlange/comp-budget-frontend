'use client';
import Modal from '@/components/Modal';
import { UserProfile } from '@/components/UserProfile';
import Button from '@/components/Button';
import { Budget, Expense, User } from '@/lib/types';
import { useState } from 'react';

type UserModalProps = {
  budget?: Budget;
  user?: User;
  expenses?: Expense[];
};

const UserModal = ({ user, budget, expenses }: UserModalProps) => {
  const [showUserModal, setShowUserModal] = useState(false);
  if (!user && !budget) return null;
  return (
    <>
      <Button priority="outline" onClick={() => setShowUserModal(true)}>
        Show all
      </Button>
      <Modal
        id="user-profile-modal"
        blur
        onClose={() => setShowUserModal(false)}
        visible={showUserModal}
      >
        <UserProfile
          budget={budget}
          title={user?.name ?? ''}
          expenses={expenses ?? []}
          showEdit
        />
      </Modal>
    </>
  );
};

export default UserModal;
