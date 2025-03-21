import { useEffect, useState } from 'react';
import Pagination from '../../../../../../../../Shared/Pagination/Pagination/Pagination';
import useModal from '../../../../../../../../Utils/Hooks/useModal';
import useToast from '../../../../../../../../Utils/Hooks/useToast';
import CardDot from '../../../../Shared/CardDot/CardDot/CardDot';
import UserCard from '../../Components/UserCard/UserCard';
import UserDeleteConfirmModal from '../../Components/UserDeleteConfirmModal/UserDeleteConfirmModal';
import UserInfo from '../Components/UserInfo/UserInfo';
import UserMakeAdminModal from '../Components/UserMakeAdminModal/UserMakeAdminModal';
import styles from './Users.module.css';

const userDetail = [];
for (let i = 0; i < 96; i++) {
	const user = {
		id: i,
		profileImage: '/assets/images/user-1.svg',
		name: { firstName: 'User', lastName: `Name${i}`, middleName: 'Middle' },
		email: `user${i}@example.com`,
	};
	userDetail.push(user);
}

function Users() {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState({ totalPage: 69, active: 1 });

	const { setContent } = useModal();

	const { setToast } = useToast();

	useEffect(() => {
		setUsers(userDetail);
	}, []);

	return (
		<>
			<h2 className={styles.userContainerHeader}>Users</h2>
			<div className={styles.userContainer}>
				{users.map(user => (
					<UserCard data={user} key={user.id}>
						{props => (
							<CardDot
								item={user}
								lists={[
									{
										name: 'Edit',
										event: () => console.log('Edit'),
									},
									{
										name: 'Delete',
										event: (_, e) => {
											setContent({
												title: 'Delete User',
												body: (
													<div>
														<p>
															Are you sure you want to delete{' '}
															<span className={styles.nameContainer}>
																{user.name.lastName}
															</span>
															?
														</p>
														<UserInfo user={user} />
													</div>
												),
												footer: (
													<UserDeleteConfirmModal
														handleRemove={confirmText => {
															if (
																confirmText.toUpperCase() !==
																'DELETE'
															) {
																return true;
															}
															const newUsers = users.filter(
																item => item.id !== user.id
															);
															setUsers(newUsers);
															setToast({
																title: 'User Deleted',
																message: `${user.name.lastName} has been deleted successfully`,
																type: 'success',
															});
														}}
														btnText='Delete User'
														placeHolder='Type "DELETE" to confirm'
														errorMessage="Please type 'DELETE' to confirm"
													/>
												),
												e,
											});
										},
									},
									{
										name: 'Make Admin',
										event: (_, e) => {
											setContent({
												title: 'Make Admin',
												body: (
													<>
														<p>
															Are you sure you want to make{' '}
															<span className={styles.nameContainer}>
																{user.name.lastName}
															</span>{' '}
															an admin?
														</p>
														<UserInfo user={user} />
													</>
												),
												footer: (
													<UserMakeAdminModal
														handleMakeAdmin={() => {
															const newUsers = users.filter(
																item => item.id !== user.id
															);
															setToast({
																title: 'Admin Made',
																message: `${user.name.lastName} has been made admin successfully`,
																type: 'success',
															});
															setUsers(newUsers);
														}}
													/>
												),
												e,
											});
										},
									},
								]}
								parentRef={props}
							/>
						)}
					</UserCard>
				))}
			</div>
			<div className={styles.paginationContainer}>
				<Pagination
					activePage={page.active}
					setActivePage={newPage => setPage(prev => ({ ...prev, active: newPage }))}
					totalPage={page.totalPage}
				/>
			</div>
		</>
	);
}
export default Users;
