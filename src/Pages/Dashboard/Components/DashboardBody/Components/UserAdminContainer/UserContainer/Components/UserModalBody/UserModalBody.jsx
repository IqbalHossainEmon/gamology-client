import UserDeleteConfirmModal from '../UserDeleteConfirmModal/UserDeleteConfirmModal';
import UserMakeAdminModal from '../UserMakeAdminModal/UserMakeAdminModal';

function UserModalBody({ type, handleEvent }) {
	return type === 'delete' ? (
		<UserDeleteConfirmModal handleRemove={handleEvent} />
	) : (
		<UserMakeAdminModal handleMakeAdmin={handleEvent} />
	);
}
export default UserModalBody;
