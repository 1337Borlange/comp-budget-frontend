'use client';
import Modal from '@/components/Modal';
import { useAdminContext } from './AdminContext';
import { UserProfile } from '@/components/UserProfile';

const UserModal = ({}) => {
  const { user, showUserModal, setShowUserModal, userExpenses, userBudget } =
    useAdminContext();
  return (
    <Modal
      id="user-profile-modal"
      blur
      onClose={() => setShowUserModal(false)}
      visible={showUserModal}
    >
      {user && userBudget && (
        <UserProfile
          budget={userBudget}
          title={user.name}
          expenses={userExpenses ?? []}
          showEdit
        />
      )}
    </Modal>
  );
};

export default UserModal;
