import styles from './CardDotList.module.css';

function CardDotList({ lists, item, setHide }) {
	return (
		<ul className={`${styles.listContainer}`}>
			{lists.map(
				list =>
					list.name && (
						<li key={list.name}>
							<button
								onClick={() => {
									list.event(item);
									if (setHide) setHide();
								}}
								type='button'
							>
								{list.name}
							</button>
						</li>
					)
			)}
		</ul>
	);
}
export default CardDotList;
