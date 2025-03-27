import { useEffect, useRef } from 'react';
import styles from './CardDotList.module.css';

function CardDotList({
	lists,
	onAppear,
	item,
	fadeIn,
	setHide,
	btnRef,
	parentRef,
	setParentShow,
	setListShow,
	onHide,
}) {
	const listContainerRef = useRef([]);

	const isSet = useRef(false);
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			onTabDown: e => {
				setTimeout(() => {
					if (e.key === 'Tab') {
						if (
							!(
								btnRef.current?.contains(document.activeElement) ||
								parentRef.current?.contains(document.activeElement)
							)
						) {
							setParentShow(false);
							setListShow(false);
							onHide();
						}
					}
				}, 0);
			},
		};
	}

	useEffect(() => {
		if (!isSet.current) {
			onAppear(listContainerRef.current);
			isSet.current = true;
		}
		document.addEventListener('keydown', eventRefs.current.onTabDown);
		return () => document.removeEventListener('keydown', eventRefs.current.onTabDown);
	}, [onAppear]);

	return (
		<ul
			ref={ref => listContainerRef.current.push(ref)}
			className={`${styles.listContainer}${fadeIn ? ` ${styles.zoomIn}` : ''}`}
		>
			{lists.map(
				list =>
					list.name && (
						<li key={list.name} ref={ref => listContainerRef.current.push(ref)}>
							<button
								onClick={e => {
									list.event(item, e);
									if (setHide && list.shouldHide) setHide();
									if (list.shouldCardDotHide) {
										setListShow(false);
										setParentShow(false);
									}
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
