import { useEffect, useState } from 'react';
import Pagination from '../../../../../../../Shared/Pagination/Pagination/Pagination';
import useToast from '../../../../../../../Utils/Hooks/useToast';
import CardDot from '../../../Shared/CardDot/CardDot/CardDot';
import useDashboardModal from '../../useDashboardModal/useDashboardModal';
import UserCard from '../Components/UserCard/UserCard';
import UserDeleteConfirmModal from '../UserContainer/Components/UserDeleteConfirmModal/UserDeleteConfirmModal';
import UserInfo from '../UserContainer/Components/UserInfo/UserInfo';
import styles from './AdminContainer.module.css';

const adminDetail = [];
for (let i = 0; i < 96; i++) {
	const user = {
		id: i,
		profileImage: '/assets/images/user-1.svg',
		name: { firstName: 'User', lastName: `Name${i}`, middleName: 'Middle' },
		email: `user${i}@example.com`,
	};
	adminDetail.push(user);
}

function AdminContainer() {
	const [admins, setAdmins] = useState([]);
	const { setDashboardModalContent, setDashboardModal } = useDashboardModal();

	const [page, setPage] = useState({ totalPage: 69, active: 1 });

	useEffect(() => {
		setAdmins(adminDetail);
	}, []);

	const { setToast } = useToast();

	return (
		<>
			<div className={styles.adminContainer}>
				{admins.map(admin => (
					<UserCard admin data={admin} key={admin.id}>
						{props => (
							<CardDot
								item={admin}
								lists={[
									{
										id: 0,
										name: 'Remove Admin',
										event: () => {
											setDashboardModal(true);
											setDashboardModalContent({
												title: 'Remove Admin',
												body: (
													<div>
														<p>
															Are you sure you want to remove{' '}
															<span className={styles.nameContainer}>
																{admin.name.lastName} from admin
															</span>
															?
														</p>
														<UserInfo user={admin} />
													</div>
												),
												footer: (
													<UserDeleteConfirmModal
														btnText='Remove Admin'
														textConfirm='REMOVE'
														handleRemove={() => {
															const newUsers = admins.filter(
																item => item.id !== admin.id
															);
															setToast({
																title: 'User Deleted',
																message: `${admin.name.lastName} has been deleted successfully`,
																type: 'success',
															});
															setAdmins(newUsers);
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
export default AdminContainer;
