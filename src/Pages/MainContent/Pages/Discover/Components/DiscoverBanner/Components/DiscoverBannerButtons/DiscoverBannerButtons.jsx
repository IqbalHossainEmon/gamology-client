import ArrowButton from '../../../../../../../../Shared/ArrowButton/ArrowButton';
import useHandleDebouncing from '../../../../../../../../Utils/Hooks/useHandleDebouncing';
import styles from './DiscoverBannerButtons.module.css';

export default function DiscoverBannerButtons({ handleClick }) {
	const handleDebouncing = useHandleDebouncing(400);
	return (
		<>
			<ArrowButton
				className={[styles.btn, styles.nextBtn].join(' ')}
				handleClick={() => handleDebouncing(() => handleClick({ type: 'next' }))}
				name='Next Button'
			/>
			<ArrowButton
				className={[styles.btn, styles.prevBtn].join(' ')}
				handleClick={() => handleDebouncing(() => handleClick({ type: 'prev' }))}
				name='Previous Button'
			/>
		</>
	);
}
