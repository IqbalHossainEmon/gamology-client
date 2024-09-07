import Card from '../../../../../../../../../../../Shared/Card/Card';
import CardDot from '../../../../../../../Shared/CardDot/CardDot/CardDot';
import useDashboardModal from '../../../../../../useDashboardModal/useDashboardModal';
import AllGamesModalBodySelect from '../Components/AllGamesModalBodyEvents/AllGamesModalBodySelect/AllGamesModalBodySelect';
import styles from './AllGamesBody.module.css';

function AllGamesBody({ items }) {
	const { setDashboardContent, setDashboardModal } = useDashboardModal();

	return (
		<div className={styles.allGamesBody}>
			<ul className={styles.cardsContainer}>
				{items.map(item => (
					<Card
						alt={item.title}
						cardInfo={item}
						className={styles.list}
						image={item.image}
						key={item.id}
					>
						{prop => (
							<CardDot
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
														detail={detail}
														type='price'
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
														detail={detail}
														type='delete'
													/>
												),
											});
										},
									},
								]}
								parentRef={prop}
							/>
						)}
					</Card>
				))}
			</ul>
		</div>
	);
}
export default AllGamesBody;
