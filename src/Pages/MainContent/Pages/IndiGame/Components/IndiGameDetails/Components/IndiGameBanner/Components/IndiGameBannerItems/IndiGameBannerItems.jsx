import { useRef } from 'react';
import ArrowButton from '../../../../../../../../../../Shared/ArrowButton/ArrowButton';
import useHandleDebouncing from '../../../../../../../../../../Utils/Hooks/useHandleDebouncing';
import IndiGameBannerItem from '../IndiGameBannerItem/IndiGameBannerItem';
import styles from './IndiGameBannerItems.module.css';

export default function IndiGameBannerItems({
	active,
	items,
	dispatch,
	transition,
	timerFunction,
}) {
	const containerRef = useRef(null);
	const handleDebounce = useHandleDebouncing(300);

	return (
		<div className={styles.individualGameBannerItemsContainer}>
			<ArrowButton
				className={[styles.prev, styles.arrowButton].join(' ')}
				handleClick={() =>
					handleDebounce(() => {
						dispatch({ type: 'prevBanner' });
						timerFunction(null, dispatch, 300);
					})
				}
			/>
			<ul
				className={styles.individualGameBannerItems}
				ref={containerRef}
				style={
					transition
						? {
								translate: containerRef.current
									? `calc(-${active * 100}% - ${active * 20}px)`
									: '0px',
								transition: 'translate 250ms ease-in-out',
							}
						: {
								translate: containerRef.current
									? `calc(-${active * 100}% - ${active * 20}px)`
									: '0px',
							}
				}
			>
				{items.map((item, index) => (
					<IndiGameBannerItem
						active={active}
						data={item}
						index={index}
						key={item.id}
						transition={transition}
					/>
				))}
			</ul>
			<ArrowButton
				className={[styles.next, styles.arrowButton].join(' ')}
				handleClick={() =>
					handleDebounce(() => {
						dispatch({ type: 'nextBanner' });
						timerFunction(null, dispatch, 300);
					})
				}
			/>
		</div>
	);
}
