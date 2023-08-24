'use client';
import Modal from '@/components/Modal';
import { useAdminContext } from './AdminContext';
import { UserProfile } from '@/components/UserProfile';

const UserModal = ({}) => {
  const { user, showUserModal, setShowUserModal, userExpenses } =
    useAdminContext();
  const budget = undefined;
  return (
    <Modal
      id="user-profile-modal"
      blur
      onClose={() => setShowUserModal(false)}
      visible={showUserModal}
    >
      {user && budget && (
        <UserProfile
          budget={budget}
          title={user.name}
          expenses={userExpenses || []}
        />
      )}
    </Modal>
  );
};

export default UserModal;
