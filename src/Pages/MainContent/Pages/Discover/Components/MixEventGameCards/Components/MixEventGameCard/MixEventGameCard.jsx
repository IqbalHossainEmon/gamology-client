import ButtonWaterEffect from '../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import DiscountPriceWithPercent from '../../../../../../../../Shared/DiscountPriceWithPercent/DiscountPriceWithPercent';
import Image from '../../../../../../../../Shared/Image/Image/Image';
import ImageWithHover from '../../../../../../../../Shared/ImageWithHover/ImageWithHover';
import styles from './MixEventGameCard.module.css';

function MixEventGameCard({ data, isOnlyOne }) {
	const { title, image, footer, description } = data;

	return (
		<li
			className={`${styles.mixEventGameCard} ${isOnlyOne ? styles.onlyOne : styles.multiPle}`}
		>
			<div className={`${styles.imageContainer} hover-shadow`}>
				<a href='#!'>
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
				</a>
			</div>
			<div>
				{!!title && (
					<h3 className={styles.title}>
						<a href='#!'>{title} </a>
					</h3>
				)}
				{!!description && <p className={styles.cardDescription}>{description}</p>}
				{!!footer && (
					<div className={styles.cardFooter}>
						{Array.isArray(footer) ? (
							<div className={styles.btnContainer}>
								{footer.map((text, index) => (
									<a key={text} className={styles.btn} href='#!'>
										{text}
										<ButtonWaterEffect
											backGround={
												index % 2 ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)'
											}
										/>
									</a>
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
