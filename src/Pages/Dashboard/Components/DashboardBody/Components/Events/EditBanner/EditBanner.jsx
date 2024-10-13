import { useEffect, useRef, useState } from 'react';
import FileUploadButton from '../../../../../../../Shared/FileUploadButton/FileUploadButton/FileUploadButton';
import TypeableSelectionField from '../../../../../../../Shared/TypeableSelectionField/TypeableSelectionField';
import InfoFieldActionButton from '../../../Shared/InfoFieldActionButton/InfoFieldActionButton';
import styles from './EditBanner.module.css';

const data = [
	{
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/CarouselInfo/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/CarouselCoverMobile/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		name: 'UNCHARTED™: Legacy of Thieves Collection',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
		logoImg: '/assets/images/CarouselInfo/fortnite-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/CarouselCoverMobile/uncharted-carousel-mobile.jpg',
		price: { regular: 49.99, discount: 15.99 },
	},
	{
		name: 'Fall Guy',
		coverImg: '/assets/images/CarouselCoverDesktop/fall-guy.png',
		logoImg: '/assets/images/CarouselInfo/fall-guy-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
		coverMobile: '/assets/images/CarouselCoverMobile/fall-guys-carousel-mobile.jpg',
		price: 0,
	},
	{
		name: 'Fortnite',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
		coverMobile: '/assets/images/CarouselCoverMobile/fortnite-carousel-mobile.jpg',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
		logoImg: '/assets/images/CarouselInfo/fortnite-carousel-logo.png',
		price: 0,
	},
	{
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

	const bannerData = useRef(items);
	bannerData.current = items;

	useEffect(() => {
		setItems(data);
	}, []);

	return (
		<div className={styles.editBanner}>
			<h2 className={styles.editBannerHeader}>Edit Banner</h2>
			{items.map((item, index) => (
				<div key={item.name}>
					<h3 className={`${styles.marginTop} ${styles.subHeader}`}>
						Upload Image #{index + 1}
					</h3>
					<FileUploadButton
						className={styles.marginTop}
						placeholder={`Upload The banner Cover #${index + 1}`}
						name='coverImg'
						htmlFor={`cover#${index}`}
						defaultValue={item.coverImg}
						accept={'image/*'}
						setState={(object, name) => {
							bannerData.current[index][name] = object;
						}}
					/>
					<FileUploadButton
						className={styles.marginTop}
						placeholder={`Upload The banner Cover Mobile #${index + 1}`}
						name='coverMobile'
						htmlFor={`coverMobile#${index}`}
						defaultValue={item.coverMobile}
						accept={'image/*'}
						setState={(object, name) => {
							bannerData.current[index][name] = object;
						}}
					/>
					<FileUploadButton
						className={styles.marginTop}
						placeholder={`Upload The banner Carousel Thumb #${index + 1}`}
						name='carouselThumb'
						htmlFor={`carouselThumb#${index}`}
						defaultValue={item.carouselThumb}
						accept={'image/*'}
						setState={(object, name) => {
							bannerData.current[index][name] = object;
						}}
					/>
					<FileUploadButton
						className={styles.marginTop}
						placeholder={`Upload The banner Logo #${index + 1}`}
						name='logoImg'
						htmlFor={`logo#${index}`}
						defaultValue={item.logoImg}
						accept={'image/*'}
						setState={(object, name) => {
							bannerData.current[index][name] = object;
						}}
					/>
					<TypeableSelectionField
						className={styles.marginTop}
						name='name'
						htmlFor={`gameName#${index}`}
						defaultValue={item.name}
						setState={(object, name) => {
							bannerData.current[index][name] = object.name;
						}}
					/>
				</div>
			))}
			<div className={styles.btnContainer}>
				<InfoFieldActionButton
					text='Save'
					onClick={() => console.log(bannerData.current)}
				/>
			</div>
		</div>
	);
}
export default EditBanner;
