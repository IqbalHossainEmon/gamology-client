import ButtonWithRipple from '../../../../Pages/Dashboard/Components/DashboardBody/Shared/ButtonWithRipple/ButtonWithRipple';
import DiscountPriceWithPercent from '../../../DiscountPriceWithPercent/DiscountPriceWithPercent';
import Image from '../../../Image/Image/Image';
import ImageWithHover from '../../../ImageWithHover/ImageWithHover';
import RippleEffect from '../../../RippleEffect/RippleEffect';
import TextField from '../../../TextField/TextField/TextField';
import styles from './AdaptiveGameCard.module.css';

function AdaptiveGameCard({ data, isOnlyOne, link, isEditing, htmlFor }) {
	const { title, image, footer, description, id } = data;

	const isGame = Array.isArray(footer);

	const imageContainer = isGame ? (
		<Image data={image} aspectRatioClassName={styles.imageAspectRatio} />
	) : (
		<ImageWithHover
			cardHover={null}
			data={image}
			alt={title}
			aspectRatioClassName={styles.imageAspectRatio}
		/>
	);

	const imageElement = link ? (
		<a href={isGame ? id : `${link}/${id}`}>{imageContainer}</a>
	) : (
		imageContainer
	);

	return (
		<li
			className={`${styles.adaptiveGameCard} ${isOnlyOne ? styles.onlyOne : styles.multiple}`}
		>
			<div className={`${styles.imageContainer} hover-shadow`}>
				{isEditing ? (
					<ButtonWithRipple
						containerClassName={`${styles.fullWidth} ${styles.imageAspectRatio} ${styles.addImageBtnContainer}`}
						className={`${styles.fullWidth} ${styles.addImageBtn}${image ? ` ${styles.containerNoPadding}` : ''}`}
					>
						{image ? imageElement : <span className={styles.plus} />}
					</ButtonWithRipple>
				) : (
					imageElement
				)}
			</div>
			<div>
				{isEditing ? (
					<div className={styles.titleContainer}>
						<TextField
							field='input'
							placeholder='Title'
							setState={value => console.log(value)}
							htmlFor={`title${htmlFor}`}
							defaultValue={title}
						/>
					</div>
				) : (
					!!title && (
						<h3 className={styles.title}>
							{link ? <a href={isGame ? id : `${link}/${id}`}>{title}</a> : title}
						</h3>
					)
				)}
				{isEditing ? (
					<div className={styles.descriptionContainer}>
						<TextField
							setState={value => console.log(value)}
							field='textarea'
							htmlFor={`description${htmlFor}`}
							placeholder='Description'
							defaultValue={description}
						/>
					</div>
				) : (
					!!description && <p className={styles.cardDescription}>{description}</p>
				)}
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
										<RippleEffect
											background={
												index % 2 ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)'
											}
											long
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
export default AdaptiveGameCard;
