import { useRef } from 'react';
import ButtonWithRipple from '../../../../Pages/Dashboard/Components/DashboardBody/Shared/ButtonWithRipple/ButtonWithRipple';
import useToast from '../../../../Utils/Hooks/useToast';
import DiscountPriceWithPercent from '../../../DiscountPriceWithPercent/DiscountPriceWithPercent';
import UploadIcon from '../../../Icons/UploadIcon/UploadIcon';
import Image from '../../../Image/Image/Image';
import ImageWithHover from '../../../ImageWithHover/ImageWithHover';
import RippleEffect from '../../../RippleEffect/RippleEffect';
import TextField from '../../../TextField/TextField/TextField';
import styles from './AdaptiveCard.module.css';

function AdaptiveCard({
	data,
	length,
	isEditing,
	htmlFor,
	editingHeader,
	onImageUpload,
	onFieldChange,
	cardHover,
	innerIndex,
}) {
	const { title, image, footer, description, link, isGame } = data;

	const cardRef = useRef(null);

	const imageContainer = isGame ? (
		<ImageWithHover
			cardHover={cardHover}
			data={image}
			alt={title}
			container={cardRef}
			aspectRatioClassName={styles.imageAspectRatio}
		/>
	) : (
		<Image data={image} aspectRatioClassName={styles.imageAspectRatio} />
	);

	const imageElement = <a href={link}>{imageContainer}</a>;

	const inputRef = useRef(null);
	const eventRefs = useRef(null);

	const setToast = useToast();

	if (!eventRefs.current) {
		eventRefs.current = {
			onImageClick: () => {
				inputRef.current.click();
			},
			handleImageUpload: e => {
				if (e.target.files[0]) {
					const { name: fileName } = e.target.files[0] || {};

					// reject if file is not an image
					if (!fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
						setToast({
							title: 'Invalid File',
							message: 'Please select an image file',
							type: 'error',
						});
						return;
					}

					onImageUpload(e.target.files[0]);
				}
			},
		};
	}

	return (
		<li className={styles.adaptiveGameCard} ref={cardRef}>
			{editingHeader &&
				editingHeader(htmlFor, link, onFieldChange, cardRef, data, innerIndex, length)}
			<div
				className={`${length === 1 ? styles.onlyOne : styles.multiple} ${styles.adaptiveGameCardContainer}`}
			>
				<div className={`${styles.imageContainer} hover-shadow`}>
					{isEditing ? (
						<>
							<ButtonWithRipple
								containerClassName={`${styles.fullWidth} ${styles.imageAspectRatio} ${styles.addImageBtnContainer}`}
								className={`${styles.fullWidth} ${styles.addImageBtn}${image ? ` ${styles.containerNoPadding}` : ''}`}
								onClick={eventRefs.current.onImageClick}
								long
							>
								{image ? imageContainer : <span className={styles.plus} />}
								<UploadIcon />
							</ButtonWithRipple>
							<input
								ref={inputRef}
								type='file'
								accept='image/*'
								onChange={eventRefs.current.handleImageUpload}
								className={styles.hiddenInput}
							/>
						</>
					) : (
						imageElement
					)}
				</div>
				<div>
					{isEditing
						? (!!title || title === '') && (
								<div className={styles.titleContainer}>
									<TextField
										field='input'
										placeholder='Title'
										setState={value => onFieldChange('title', value)}
										htmlFor={`title${htmlFor}`}
										defaultValue={title}
									/>
								</div>
							)
						: !!title && (
								<h3 className={styles.title}>
									{link ? <a href={link}>{title}</a> : title}
								</h3>
							)}
					{isEditing
						? (!!description || description === '') && (
								<div className={styles.descriptionContainer}>
									<TextField
										setState={value => onFieldChange('description', value)}
										field='textarea'
										htmlFor={`description${htmlFor}`}
										placeholder='Description'
										defaultValue={description}
									/>
								</div>
							)
						: !!description && <p className={styles.cardDescription}>{description}</p>}
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
													index % 2
														? 'rgb(0, 0, 0)'
														: 'rgb(255, 255, 255)'
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
			</div>
		</li>
	);
}
export default AdaptiveCard;
