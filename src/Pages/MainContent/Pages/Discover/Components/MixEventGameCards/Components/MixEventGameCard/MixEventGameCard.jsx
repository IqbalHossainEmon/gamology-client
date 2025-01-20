import DiscountPriceWithPercent from '../../../../../../../../Shared/DiscountPriceWithPercent/DiscountPriceWithPercent';
import Image from '../../../../../../../../Shared/Image/Image/Image';
import styles from './MixEventGameCard.module.css';

function MixEventGameCard({ data }) {
	const { title, image, footer, description } = data;
	console.log(footer);

	return (
		<li className={styles.mixEventGameCard}>
			<div className={styles.imageContainer}>
				<Image data={image} aspectRatioClassName={styles.imageAspectRatio} />
			</div>
			<div>
				{!!title && <h3>{title}</h3>}
				{!!description && <p>{description}</p>}
				{!!footer &&
					(Array.isArray(footer) ? (
						<div>
							{footer.map(text => (
								<button key={text} type='button'>
									{text}
								</button>
							))}
						</div>
					) : (
						<div>
							<DiscountPriceWithPercent price={footer} />
						</div>
					))}
			</div>
		</li>
	);
}
export default MixEventGameCard;
