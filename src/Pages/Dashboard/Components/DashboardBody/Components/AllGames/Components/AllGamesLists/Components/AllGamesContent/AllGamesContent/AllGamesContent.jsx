import Card from '../../../../../../../../../../../Shared/Card/Card';
import useModal from '../../../../../../../../../../../Utils/Hooks/useModal';
import CardDot from '../../../../../../../Shared/CardDot/CardDot/CardDot';
import AllGamesModalBodySelect from '../Components/AllGamesModalBodyEvents/AllGamesModalBodySelect/AllGamesModalBodySelect';

import styles from './AllGamesContent.module.css';

const handleEdit = (item, setContent) => {
	const lists = [
		{
			name: 'Edit',
			event: () => console.log('Edit'),
		},
		{
			name: 'Price',
			event: detail => {
				setContent({
					title: 'Edit Price',
					body: (
						<p>
							What price you want to set for
							<span className={styles.nameContainer}>{item.name}</span>?
						</p>
					),
					footer: <AllGamesModalBodySelect detail={detail} type='price' />,
				});
			},
			shouldCardDotHide: true,
		},
		{
			name: 'Delete',
			event: detail => {
				setContent({
					title: 'Delete Game',
					body: (
						<p>
							Are you sure you want to delete
							<span className={styles.nameContainer}>{item.name}</span>?
						</p>
					),
					footer: <AllGamesModalBodySelect detail={detail} type='delete' />,
				});
			},
			shouldCardDotHide: true,
		},
	];

	if (typeof item.price !== 'object' && item.price !== 0) {
		lists.splice(1, 0, {
			name: 'Sales',
			event: detail => {
				setContent({
					title: 'Edit Sales',
					body: (
						<p>
							What price you want to set for{' '}
							<span className={styles.nameContainer}>{item.name}</span>?
						</p>
					),
					footer: <AllGamesModalBodySelect detail={detail} type='sales' />,
				});
			},
			shouldCardDotHide: true,
		});
	}
	return function inner(prop) {
		return <CardDot item={item} lists={lists} parentRef={prop} />;
	};
};

function AllGamesContent({ items }) {
	const { setContent } = useModal();

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
						dotMenu={handleEdit(item, setContent)}
					/>
				))}
			</ul>
		</div>
	);
}
export default AllGamesContent;
