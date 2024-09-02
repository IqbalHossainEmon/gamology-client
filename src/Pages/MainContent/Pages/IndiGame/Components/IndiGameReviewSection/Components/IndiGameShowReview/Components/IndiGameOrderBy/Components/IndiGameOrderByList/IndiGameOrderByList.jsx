import styles from './IndiGameOrderByList.module.css';

const IndiGameOrderByList = ({ orderBy, setOrderBy, setShow, handleSort }) =>
	orderBy.map((order, index) => (
		<li className={styles.orderOption} key={order.id}>
			<button
				className={
					orderBy[index].active
						? [styles.optionBtn, styles.activeBtn].join(' ')
						: styles.optionBtn
				}
				type='button'
				{...(orderBy[index].active || {
					onClick: () => {
						setOrderBy(prev => {
							const prevOrderBy = [...prev];
							for (let i = 0; i < 3; i++) {
								if (i === index) {
									prevOrderBy[i].active = true;
								} else {
									prevOrderBy[i].active = false;
								}
							}
							return prevOrderBy;
						});
						setShow(false);
						handleSort({ link: order.link, type: 'sort' });
					},
				})}
			>
				{order.name}
			</button>
		</li>
	));
export default IndiGameOrderByList;
