import { useEffect, useState } from 'react';
import CardDot from '../../../Shared/CardDot/CardDot/CardDot';
import useDashboardModal from '../../useDashboardModal/useDashboardModal';
import UserCard from '../Components/UserCard/UserCard';
import UserInfo from '../UserContainer/Components/UserInfo/UserInfo';
import UserModalBody from '../UserContainer/Components/UserModalBody/UserModalBody';
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

	useEffect(() => {
		setAdmins(adminDetail);
	}, []);

	return (
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
									event: detail => {
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
													<UserInfo
														user={{
															name: admin.lastName,
															img: admin.profileImage,
														}}
													/>
												</div>
											),
											footer: (
												<UserModalBody
													detail={detail}
													type='delete'
													data={admin}
													handleEvent={() => {
														const newUsers = admins.filter(
															item => item.id !== admin.id
														);
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
	);
}
export default AdminContainer;
