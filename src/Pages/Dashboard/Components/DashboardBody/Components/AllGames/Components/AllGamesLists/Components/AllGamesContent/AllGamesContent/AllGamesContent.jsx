import Card from '../../../../../../../../../../../Shared/Card/Card';
import useModal from '../../../../../../../../../../../Utils/Hooks/useModal';
import CardDot from '../../../../../../../Shared/CardDot/CardDot/CardDot';
import AllGamesModalBodySelect from '../Components/AllGamesModalBodyEvents/AllGamesModalBodySelect/AllGamesModalBodySelect';
import styles from './AllGamesContent.module.css';

const handleEdit = (item, setModal) => {
	const lists = [
		{
			name: 'Edit',
			event: () => console.log('Edit'),
		},
		{
			name: 'Price',
			event: detail => {
				setModal({
					title: 'Edit Price',
					body: (
						<h3 className={styles.priceChangeHeader}>
							What price you want to set for
							<span className={styles.nameContainer}>{item.name}</span>?
						</h3>
					),
					footer: <AllGamesModalBodySelect detail={detail} type='price' />,
				});
			},
		},
		{
			name: 'Delete',
			event: detail => {
				setModal({
					title: 'Delete Game',
					body: (
						<h3 className={styles.priceChangeHeader}>
							Are you sure you want to delete
							<span className={styles.nameContainer}>{item.name}</span>?
						</h3>
					),
					footer: <AllGamesModalBodySelect detail={detail} type='delete' />,
				});
			},
		},
	];

	if (typeof item.price !== 'object' && item.price !== 0) {
		lists.splice(1, 0, {
			name: 'Sales',
			event: detail => {
				setModal({
					title: 'Edit Sales',
					body: (
						<h3 className={styles.priceChangeHeader}>
							What price you want to set for{' '}
							<span className={styles.nameContainer}>{item.name}</span>?
						</h3>
					),
					footer: <AllGamesModalBodySelect detail={detail} type='sales' />,
				});
			},
		});
	}
	return function inner(prop) {
		return <CardDot item={item} lists={lists} parentRef={prop} />;
	};
};

function AllGamesContent({ items }) {
	const setModal = useModal();

	return (
		<div className={styles.allGamesContent}>
			<ul className={styles.cardsContainer}>
				{items.map(item => (
					<Card
						alt={item.title}
						cardInfo={{
							id: item.id,
							name: item.name,
							img: item.carouselThumb,
							price: item.price,
						}}
						className={styles.list}
						key={item.id}
						dotMenu={handleEdit(item, setModal)}
					/>
				))}
			</ul>
		</div>
	);
}
export default AllGamesContent;
