import UserDeleteConfirmModal from '../UserDeleteConfirmModal/UserDeleteConfirmModal';
import UserMakeAdminModal from '../UserMakeAdminModal/UserMakeAdminModal';

const UserDeleteModalBody = ({ handleHide, type }) =>
    type === 'delete' ? <UserDeleteConfirmModal handleHide={handleHide} /> : <UserMakeAdminModal handleHide={handleHide} />;
export default UserDeleteModalBody;
