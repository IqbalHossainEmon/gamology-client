import DiscountPriceWithPercent from '../../../../../../../../Shared/DiscountPriceWithPercent/DiscountPriceWithPercent';
import Image from '../../../../../../../../Shared/Image/Image/Image';
import styles from './MixEventGameCard.module.css';

function MixEventGameCard({ data }) {
	const { title, image, footer, description } = data;

	return (
		<li className={`${styles.mixEventGameCard} hover-shadow`}>
			<div className={styles.imageContainer}>
				<Image data={image} aspectRatioClassName={styles.imageAspectRatio} />
			</div>
			<div className={styles.cardBody}>
				{!!title && <h3 className={styles.title}>{title}</h3>}
				{!!description && <p className={styles.cardDescription}>{description}</p>}
				{!!footer && (
					<div className={styles.cardFooter}>
						{Array.isArray(footer) ? (
							footer.map(text => (
								<button key={text} type='button'>
									{text}
								</button>
							))
						) : (
							<DiscountPriceWithPercent price={footer} />
						)}
					</div>
				)}
			</div>
		</li>
	);
}
export default MixEventGameCard;
