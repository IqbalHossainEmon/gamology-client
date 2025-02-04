import ButtonWaterEffect from '../../../ButtonWaterEffect/ButtonWaterEffect';
import DiscountPriceWithPercent from '../../../DiscountPriceWithPercent/DiscountPriceWithPercent';
import Image from '../../../Image/Image/Image';
import ImageWithHover from '../../../ImageWithHover/ImageWithHover';
import styles from './DynamicGameCard.module.css';

function DynamicGameCard({ data, isOnlyOne, link }) {
	const { title, image, footer, description, id } = data;

	const isGame = Array.isArray(footer);

	const imageContainer = isGame ? (
		<Image data={image} aspectRatio={16 / 9} />
	) : (
		<ImageWithHover cardHover={null} data={image} alt={title} aspectRatio={16 / 9} />
	);

	return (
		<li className={`${styles.dynamicGameCard} ${isOnlyOne ? styles.onlyOne : styles.multiPle}`}>
			<div className={`${styles.imageContainer} hover-shadow`}>
				{link ? (
					<a href={isGame ? id : `${link}/${id}`}>{imageContainer}</a>
				) : (
					imageContainer
				)}
			</div>
			<div>
				{!!title && (
					<h3 className={styles.title}>
						{link ? <a href={isGame ? id : `${link}/${id}`}>{title} </a> : title}
					</h3>
				)}
				{!!description && <p className={styles.cardDescription}>{description}</p>}
				{!!footer && (
					<div className={styles.cardFooter}>
						{isGame ? (
							<div className={styles.btnContainer}>
								{footer.map((footerItem, index) => (
									<a
										key={footerItem.text}
										className={styles.btn}
										href={footerItem.link}
									>
										{footerItem.text}
										<ButtonWaterEffect
											background={
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
export default DynamicGameCard;
