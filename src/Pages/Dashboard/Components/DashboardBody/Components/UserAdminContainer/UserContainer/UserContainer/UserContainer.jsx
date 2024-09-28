import { useEffect, useState } from 'react';
import Pagination from '../../../../../../../../Shared/Pagination/Pagination/Pagination';
import useToast from '../../../../../../../../Utils/Hooks/useToast';
import CardDot from '../../../../Shared/CardDot/CardDot/CardDot';
import useDashboardModal from '../../../Utils/Hooks/useDashboardModal';
import UserCard from '../../Components/UserCard/UserCard';
import UserDeleteConfirmModal from '../Components/UserDeleteConfirmModal/UserDeleteConfirmModal';
import UserInfo from '../Components/UserInfo/UserInfo';
import UserMakeAdminModal from '../Components/UserMakeAdminModal/UserMakeAdminModal';
import styles from './UserContainer.module.css';

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

function UserContainer() {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState({ totalPage: 69, active: 1 });

	const { setDashboardModalContent, setDashboardModal } = useDashboardModal();

	const { setToast } = useToast();

	useEffect(() => {
		setUsers(userDetail);
	}, []);

	return (
		<>
			<div className={styles.userContainer}>
				<h2 className={styles.userContainerHeader}>Users</h2>
				{users.map(user => (
					<UserCard data={user} key={user.id}>
						{props => (
							<CardDot
								item={user}
								lists={[
									{
										id: 1,
										name: 'Edit',
										event: () => console.log('Edit'),
									},
									{
										id: 2,
										name: 'Delete',
										event: () => {
											setDashboardModal(true);
											setDashboardModalContent({
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
														placeHolder={'Type "DELETE" to confirm'}
														errorMessage={
															"Please type 'DELETE' to confirm"
														}
													/>
												),
											});
										},
									},
									{
										id: 3,
										name: 'Make Admin',
										event: () => {
											setDashboardModal(true);
											setDashboardModalContent({
												title: 'Make Admin',
												body: (
													<div>
														<p>
															Are you sure you want to make{' '}
															<span className={styles.nameContainer}>
																{user.name.lastName}
															</span>{' '}
															an admin?
														</p>

														<UserInfo user={user} />
													</div>
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
											});
										},
									},
								]}
								parentRef={props}
							/>
						)}
					</UserCard>
				))}
			</div>{' '}
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
export default UserContainer;
