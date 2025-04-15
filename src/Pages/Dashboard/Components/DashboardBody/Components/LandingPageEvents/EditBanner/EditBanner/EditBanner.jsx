import { useEffect, useRef, useState } from 'react';

import StyledButtonWithEffects from '../../../../../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import useObjectUtilities from '../../../../../../../../Utils/Hooks/useObjectUtilities';
import OuterErrorMessage from '../../../../Shared/OuterErrorMessage/OuterErrorMessage';
import EditBannerSingleSection from '../EditBannerSingleSection/EditBannerSingleSection';

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
	const [errorChange, setErrorChange] = useState(0);

	const bannerData = useRef([]);

	const errorMessages = useRef(new Array(6).fill().map(() => ({})));

	const { areObjectsEqual, cloneObject } = useObjectUtilities();

	const handleSubmit = e => {
		e.preventDefault();

		let error = false;
		if (areObjectsEqual(items, bannerData.current)) {
			errorMessages.current[5] = 'No changes were made';
			error = true;
		} else if (errorMessages.current[5]) {
			errorMessages.current[5] = '';
			error = true;
		}

		bannerData.current.forEach((item, index) => {
			Object.keys(item).forEach(key => {
				if (item[key] === '') {
					errorMessages.current[index][key] = 'This field is required';
					error = true;
				} else if (errorMessages.current[index][key]) {
					delete errorMessages.current[index][key];
				}
			});

			// upload to server
		});

		if (error) {
			setErrorChange(prev => prev + 1);
			return;
		}
		console.log(bannerData.current);
	};

	useEffect(() => {
		setItems(data);
		bannerData.current = cloneObject(data);
	}, [cloneObject, items]);

	return (
		<form className={styles.editBanner}>
			<h2 className={styles.editBannerHeader}>Edit Banner</h2>
			{items.map((item, index) => (
				<EditBannerSingleSection
					key={item.name}
					index={index}
					item={item}
					bannerData={bannerData}
					errorChange={errorChange}
					errorMessages={errorMessages}
				/>
			))}
			<div className={styles.outErrorMessageContainer}>
				<OuterErrorMessage
					errorMessage={errorMessages.current[5]}
					errorChange={errorChange}
				/>
			</div>
			<div className={styles.btnContainer}>
				<StyledButtonWithEffects text='Save' onClick={handleSubmit} />
			</div>
		</form>
	);
}
export default EditBanner;
