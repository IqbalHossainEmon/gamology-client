import Card from '../../../../../../../../../../../Shared/Card/Card';
import CardDotContainer from '../../../../../../../Shared/CardDotContainer/CardDotContainer/CardDotContainer';
import useDashboardModalHook from '../../../../../../useDashboardModalHook/useDashboardModalHook';
import AllGamesModalBodySelect from '../Components/AllGamesModalBodyEvents/AllGamesModalBodySelect/AllGamesModalBodySelect';
import styles from './AllGamesBody.module.css';

const AllGamesBody = ({ items }) => {
	const { setDashboardContent, setDashboardModal } = useDashboardModalHook();

	return (
		<div className={styles.allGamesBody}>
			<ul className={styles.cardsContainer}>
				{items.map(item => (
					<Card
						className={styles.list}
						key={item.id}
						cardInfo={item}
						image={item.image}
						alt={item.title}
					>
						{prop => (
							<CardDotContainer
								parentRef={prop}
								hoverClassName={styles.dots}
								item={item}
								lists={[
									{
										id: 1,
										name: 'Edit',
										event: () => console.log('Edit'),
									},
									{
										id: 2,
										name: 'Price',
										event: detail => {
											setDashboardModal(true);
											setDashboardContent({
												modalTitle: 'Edit Price',
												modalBody: (
													<h3 className={styles.priceChangeHeader}>
														What price you want to set for
														<span className={styles.nameContainer}>
															{item.name}
														</span>
													</h3>
												),
												modalFooter: (
													<AllGamesModalBodySelect
														type='price'
														detail={detail}
													/>
												),
											});
										},
									},
									{
										id: 3,
										name: 'Delete',
										event: detail => {
											setDashboardModal(true);
											setDashboardContent({
												modalTitle: 'Delete Game',
												modalBody: (
													<h3 className={styles.priceChangeHeader}>
														Are you sure you want to delete
														<span className={styles.nameContainer}>
															{item.name}
														</span>
														?
													</h3>
												),
												modalFooter: (
													<AllGamesModalBodySelect
														type='delete'
														detail={detail}
													/>
												),
											});
										},
									},
								]}
							/>
						)}
					</Card>
				))}
			</ul>
		</div>
	);
};
export default AllGamesBody;
