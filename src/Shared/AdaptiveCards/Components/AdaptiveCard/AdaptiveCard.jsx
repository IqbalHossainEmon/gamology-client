import ButtonWithRipple from '../../../../Pages/Dashboard/Components/DashboardBody/Shared/ButtonWithRipple/ButtonWithRipple';
import DiscountPriceWithPercent from '../../../DiscountPriceWithPercent/DiscountPriceWithPercent';
import UploadIcon from '../../../Icons/UploadIcon/UploadIcon';
import Image from '../../../Image/Image/Image';
import ImageWithHover from '../../../ImageWithHover/ImageWithHover';
import RippleEffect from '../../../RippleEffect/RippleEffect';
import TextField from '../../../TextField/TextField/TextField';
import styles from './AdaptiveCard.module.css';

function AdaptiveCard({ data, isOnlyOne, isEditing, htmlFor, editingHeader }) {
	const { title, image, footer, description, link, isGame } = data;

	const imageContainer = isGame ? (
		<ImageWithHover
			cardHover={null}
			data={image}
			alt={title}
			aspectRatioClassName={styles.imageAspectRatio}
		/>
	) : (
		<Image data={image} aspectRatioClassName={styles.imageAspectRatio} />
	);

	const imageElement = <a href={link}>{imageContainer}</a>;

	return (
		<li
			className={`${styles.adaptiveGameCard} ${isOnlyOne ? styles.onlyOne : styles.multiple}`}
		>
			{editingHeader && editingHeader(htmlFor, link)}
			<div className={`${styles.imageContainer} hover-shadow`}>
				{isEditing ? (
					<ButtonWithRipple
						containerClassName={`${styles.fullWidth} ${styles.imageAspectRatio} ${styles.addImageBtnContainer}`}
						className={`${styles.fullWidth} ${styles.addImageBtn}${image ? ` ${styles.containerNoPadding}` : ''}`}
						long
					>
						{image ? imageContainer : <span className={styles.plus} />}
						<UploadIcon />
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
							{link ? <a href={link}>{title}</a> : title}
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
						{Array.isArray(footer) ? (
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
export default AdaptiveCard;
