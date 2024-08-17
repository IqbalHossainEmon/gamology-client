import { useEffect, useState } from 'react';
import CardDotContainer from '../../../../Shared/CardDotContainer/CardDotContainer/CardDotContainer';
import useDashboardModalHook from '../../../useDashboardModalHook/useDashboardModalHook';
import UserCard from '../../UserCard/UserCard';
import UserDeleteModalBody from '../Components/UserDeleteModalBody/UserDeleteModalBody';
import UserInfo from '../Components/UserInfo/UserInfo';
import styles from './UserContainer.module.css';

const userDetail = [];
for (let i = 0; i < 96; i++) {
	const user = {
		id: i,
		img: '/assets/images/user-1.png',
		name: `User ${i}`,
		email: `user${i}@example.com`,
	};
	userDetail.push(user);
}

const UserContainer = () => {
	const [users, setUsers] = useState([]);

	const { setDashboardContent, setDashboardModal } = useDashboardModalHook();

	useEffect(() => {
		setUsers(userDetail);
	}, []);

	return (
		<div className={styles.userContainer}>
			{users.map(user => (
				<UserCard key={user.id} data={user}>
					{props => (
						<CardDotContainer
							parentRef={props}
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
									event: detail => {
										setDashboardModal(true);
										setDashboardContent({
											modalTitle: 'Delete User',
											modalBody: (
												<div>
													<p>
														Are you sure you want to delete{' '}
														<span className={styles.nameContainer}>
															{user.name}
														</span>
														?
													</p>
													<UserInfo user={user} />
												</div>
											),
											modalFooter: (
												<UserDeleteModalBody
													type='delete'
													detail={detail}
												/>
											),
										});
									},
								},
								{
									id: 3,
									name: 'Make Admin',
									event: detail => {
										setDashboardModal(true);
										setDashboardContent({
											modalTitle: 'Make Admin',
											modalBody: (
												<div>
													<p>
														Are you sure you want to make{' '}
														<span className={styles.nameContainer}>
															{user.name}
														</span>{' '}
														an admin?
													</p>
													<UserInfo user={user} />
												</div>
											),
											modalFooter: (
												<UserDeleteModalBody
													type='makeAdmin'
													detail={detail}
												/>
											),
										});
									},
								},
							]}
						/>
					)}
				</UserCard>
			))}
		</div>
	);
};
export default UserContainer;
