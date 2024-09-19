import UserDeleteConfirmModal from '../UserDeleteConfirmModal/UserDeleteConfirmModal';
import UserMakeAdminModal from '../UserMakeAdminModal/UserMakeAdminModal';

function UserModalBody({ type, data, handleEvent }) {
	return type === 'delete' ? (
		<UserDeleteConfirmModal data={data} handleRemove={handleEvent} />
	) : (
		<UserMakeAdminModal data={data} handleMakeAdmin={handleEvent} />
	);
}
export default UserModalBody;
