import Image from '../../../../../../../../../../Shared/Image/Image/Image';
import styles from './IndiGameBannerCard.module.css';

export default function IndiGameBannerCard({ data, active, dispatch, index, timerFunction }) {
	return (
		<li className={styles.individualGameBannerCard}>
			<button
				className={`${styles.button}${active === index ? ` ${styles.active}` : ''}`}
				type='button'
				{...(active !== index && {
					onClick: () => {
						dispatch({ type: 'setBanner', active: index });
						timerFunction('cover', dispatch, 300);
					},
				})}
			>
				{data.type === 'video' && (
					<div className={styles.videoLogo}>
						<svg viewBox='0 0 11 14' xmlns='http://www.w3.org/2000/svg'>
							<path d='M0 0v14l11-7z' fill='white' fillRule='nonzero' />
						</svg>
					</div>
				)}
				<Image data={data.thumb} alt={`cover number-${index + 1}`} aspectRatio={16 / 9} />
			</button>
		</li>
	);
}
