import UserDeleteConfirmModal from '../UserDeleteConfirmModal/UserDeleteConfirmModal';
import UserMakeAdminModal from '../UserMakeAdminModal/UserMakeAdminModal';

function UserDeleteModalBody({ type }) {
  return type === 'delete' ? <UserDeleteConfirmModal /> : <UserMakeAdminModal />
}
export default UserDeleteModalBody;
