import UserDeleteConfirmModal from '../UserDeleteConfirmModal/UserDeleteConfirmModal';
import UserMakeAdminModal from '../UserMakeAdminModal/UserMakeAdminModal';

const UserDeleteModalBody = ({ type }) => (type === 'delete' ? <UserDeleteConfirmModal /> : <UserMakeAdminModal />);
export default UserDeleteModalBody;
