import ButtonWaterEffect from '../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import DiscountPriceWithPercent from '../../../../../../../../Shared/DiscountPriceWithPercent/DiscountPriceWithPercent';
import Image from '../../../../../../../../Shared/Image/Image/Image';
import ImageWithHover from '../../../../../../../../Shared/ImageWithHover/ImageWithHover';
import styles from './MixEventGameCard.module.css';

function MixEventGameCard({ data, isOnlyOne }) {
	const { title, image, footer, description } = data;

	return (
		<li className={`${styles.mixEventGameCard}${isOnlyOne ? ` ${styles.onlyOne}` : ''}`}>
			<div className={`${styles.imageContainer} hover-shadow`}>
				{Array.isArray(footer) ? (
					<Image data={image} aspectRatioClassName={styles.imageAspectRatio} />
				) : (
					<ImageWithHover
						cardHover={null}
						data={image}
						alt={title}
						aspectRatioClassName={styles.imageAspectRatio}
					/>
				)}
			</div>
			<div>
				{!!title && <h3 className={styles.title}>{title}</h3>}
				{!!description && <p className={styles.cardDescription}>{description}</p>}
				{!!footer && (
					<div className={styles.cardFooter}>
						{Array.isArray(footer) ? (
							<div className={styles.btnContainer}>
								{footer.map(text => (
									<button key={text} type='button' className={styles.btn}>
										{text}
										<ButtonWaterEffect />
									</button>
								))}
							</div>
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
