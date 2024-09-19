import { useEffect, useState } from 'react';
import CardDot from '../../../../Shared/CardDot/CardDot/CardDot';
import useDashboardModal from '../../../useDashboardModal/useDashboardModal';
import UserCard from '../../Components/UserCard/UserCard';
import UserInfo from '../Components/UserInfo/UserInfo';
import UserModalBody from '../Components/UserModalBody/UserModalBody';
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
	const { setDashboardModalContent, setDashboardModal } = useDashboardModal();

	useEffect(() => {
		setUsers(userDetail);
	}, []);

	return (
		<div className={styles.userContainer}>
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
									event: detail => {
										setDashboardModal(true);
										setDashboardModalContent({
											title: 'Delete User',
											body: (
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
											footer: (
												<UserModalBody
													detail={detail}
													type='delete'
													data={user}
													handleEvent={() => {
														const newUsers = users.filter(
															item => item.id !== user.id
														);
														setUsers(newUsers);
													}}
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
										setDashboardModalContent({
											title: 'Make Admin',
											body: (
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
											footer: (
												<UserModalBody
													detail={detail}
													type='makeAdmin'
													data={user}
													handleEvent={() => {
														const newUsers = users.filter(
															item => item.id !== user.id
														);
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
		</div>
	);
}
export default UserContainer;
