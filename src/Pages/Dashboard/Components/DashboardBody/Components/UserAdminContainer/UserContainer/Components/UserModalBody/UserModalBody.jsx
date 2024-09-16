import UserDeleteConfirmModal from '../UserDeleteConfirmModal/UserDeleteConfirmModal';
import UserMakeAdminModal from '../UserMakeAdminModal/UserMakeAdminModal';

function UserModalBody({ type, data, handleRemoveUser }) {
	return type === 'delete' ? (
		<UserDeleteConfirmModal data={data} handleRemove={handleRemoveUser} />
	) : (
		<UserMakeAdminModal data={data} handleRemove={handleRemoveUser} />
	);
}
export default UserModalBody;
