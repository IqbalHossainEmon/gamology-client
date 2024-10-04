import { useEffect, useState } from 'react';
import FileUploadButton from '../../../../../../../Shared/FileUploadButton/FileUploadButton/FileUploadButton';
import TypeableSelectionField from '../../../../../../../Shared/TypeableSelectionField/TypeableSelectionField';
import styles from './EditBanner.module.css';

const data = [
	{
		id: 1000,
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/CarouselInfo/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/CarouselCoverMobile/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 1001,
		name: 'UNCHARTED™: Legacy of Thieves Collection',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
		logoImg: '/assets/images/CarouselInfo/fortnite-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/CarouselCoverMobile/uncharted-carousel-mobile.jpg',
		price: { regular: 49.99, discount: 15.99 },
	},
	{
		id: 1010,
		name: 'Fall Guy',
		coverImg: '/assets/images/CarouselCoverDesktop/fall-guy.png',
		logoImg: '/assets/images/CarouselInfo/fall-guy-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
		coverMobile: '/assets/images/CarouselCoverMobile/fall-guys-carousel-mobile.jpg',
		price: 0,
	},
	{
		id: 1011,
		name: 'Fortnite',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
		coverMobile: '/assets/images/CarouselCoverMobile/fortnite-carousel-mobile.jpg',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
		logoImg: '/assets/images/CarouselInfo/fortnite-carousel-logo.png',
		price: 0,
	},
	{
		id: 1100,
		name: 'A Plague Tale Requiem',
		logoImg: '/assets/images/CarouselInfo/a-plague-tale-requiem-logo.png',
		coverImg: '/assets/images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
		coverMobile: '/assets/images/CarouselCoverMobile/a-plague-tale-requiem-carousel-mobile.jpg',
		price: 69,
	},
];

function EditBanner() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(data);
	}, []);

	return (
		<div className={styles.editBanner}>
			<h2 className={styles.editBannerHeader}>Edit Banner</h2>
			{items.map((item, index) => (
				<div key={item.id + 1}>
					<h3 className={`${styles.marginTop} ${styles.subHeader}`}>
						Upload Image #{index + 1}
					</h3>
					<FileUploadButton
						className={styles.marginTop}
						placeholder={`Upload The banner Cover #${index + 1}`}
						name={`cover#${index}`}
						htmlFor={`cover#${index}`}
						defaultValue={item.coverImg}
						accept={'image/*'}
					/>
					<FileUploadButton
						className={styles.marginTop}
						placeholder={`Upload The banner Cover Mobile #${index + 1}`}
						name={`coverMobile#${index}`}
						htmlFor={`coverMobile#${index}`}
						defaultValue={item.coverMobile}
						accept={'image/*'}
					/>
					<FileUploadButton
						className={styles.marginTop}
						placeholder={`Upload The banner Carousel Thumb #${index + 1}`}
						name={`carouselThumb#${index}`}
						htmlFor={`carouselThumb#${index}`}
						defaultValue={item.carouselThumb}
						accept={'image/*'}
					/>
					<FileUploadButton
						className={styles.marginTop}
						placeholder={`Upload The banner Logo #${index + 1}`}
						name={`logo#${index}`}
						htmlFor={`logo#${index}`}
						defaultValue={item.logoImg}
						accept={'image/*'}
					/>
					<TypeableSelectionField
						className={styles.marginTop}
						name={`gameName#${index}`}
						htmlFor={`gameName#${index}`}
						defaultValue={item.name}
					/>
				</div>
			))}
		</div>
	);
}
export default EditBanner;
