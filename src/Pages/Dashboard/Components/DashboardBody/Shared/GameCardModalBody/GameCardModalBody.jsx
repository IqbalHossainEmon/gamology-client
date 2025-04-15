import { useEffect, useRef, useState } from 'react';

import TypeableSelectionField from '../../../../../../Shared/TypeableSelectionField/TypeableSelectionField';
import useModal from '../../../../../../Utils/Hooks/useModal';

import styles from './GameCardModalBody.module.css';

function GameCardModalBody({ handleClick, btnRef }) {
	const [height, setHeight] = useState(0);
	const [errorChange, setErrorChange] = useState(0);

	const gameSelectedRef = useRef(null);
	const errorMessage = useRef('');
	const { hideModal } = useModal();

	const evenRefs = useRef(null);

	if (!evenRefs.current) {
		evenRefs.current = {
			onclick: () => {
				if (!gameSelectedRef.current) {
					errorMessage.current = 'Please select a game';
					setErrorChange(prev => prev + 1);
					return;
				}
				if (errorMessage.current) {
					errorMessage.current = '';
				}
				// actual function to be called
				// onClick(gameSelectedRef.current);

				// for dev purposes
				handleClick({
					id: new Date().getTime(),
					category: {
						card: 'Base game',
					},
					name: 'FortniteX',
					carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
					coverMobile: '/assets/images/6X04C8f/fortnite-carousel-mobile.jpg',
					coverImg: '/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
					logoImg: '/assets/images/SyGvndD/fortnite-carousel-logo.png',
					price: { regular: 34.99, discount: 25.99 },
				});

				hideModal();
			},
		};
	}

	useEffect(() => {
		const btn = btnRef.current;
		if (btn) {
			btn.addEventListener('click', evenRefs.current.onclick);
			return () => {
				btn.removeEventListener('click', evenRefs.current);
			};
		}
	}, [btnRef]);

	return (
		<div
			style={{
				height: `${height ? height + 2.3 : 4}rem`,
			}}
			className={styles.addGameCardContainer}
		>
			<TypeableSelectionField
				setHeight={setHeight}
				htmlFor='addGameCard'
				placeholder='Search for a game'
				propertyName='name'
				setState={val => {
					gameSelectedRef.current = val;
				}}
				errorMessage={errorMessage.current}
				errorChange={errorChange}
			/>
		</div>
	);
}
export default GameCardModalBody;
