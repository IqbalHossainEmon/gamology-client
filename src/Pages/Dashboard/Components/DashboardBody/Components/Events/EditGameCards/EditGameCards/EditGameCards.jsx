import { useEffect, useRef, useState } from 'react';
import useModal from '../../../../../../../../Utils/Hooks/useModal';
import useObjectUtilities from '../../../../../../../../Utils/Hooks/useObjectUtilities';
import NormalButtonWithEffects from '../../../../Shared/NormalButtonWithEffects/NormalButtonWithEffects';
import EditGameCardFirstPart from '../Components/EditGameCardFirstPart/EditGameCardFirstPart';
import EditGameCardOtherPart from '../Components/EditGameCardOtherPart/EditGameCardOtherPart';
import styles from './EditGameCards.module.css';

const items = [
	{
		id: 'marvels-spiderman-remastered',
		category: { card: 'Base game' },
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 'uncharted-legacy-of-thieves-collection',
		category: { card: 'Base game' },
		name: 'UNCHARTED™: Legacy of Thieves Collection',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
		logoImg: '/assets/images/n7cSm73/fortnite-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/CPyXG7n/uncharted-carousel-mobile.jpg',
		price: { regular: 64.99, discount: 18.99 },
	},
	{
		id: 'fall-guy',
		category: { card: 'Base game' },
		name: 'Fall Guy',
		coverImg: '/assets/images/CarouselCoverDesktop/fall-guy.png',
		logoImg: '/assets/images/QF3t3jQ/fall-guy-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
		coverMobile: '/assets/images/BNm4v3M/fall-guys-carousel-mobile.jpg',
		price: { regular: 39.99, discount: 29.99 },
	},
	{
		id: 'fortnite',
		category: { card: 'Base game' },
		name: 'Fortnite',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/6X04C8f/fortnite-carousel-mobile.jpg',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
		logoImg: '/assets/images/SyGvndD/fortnite-carousel-logo.png',
		price: { regular: 34.99, discount: 25.99 },
	},
	{
		id: 'a-plague-tale-requiem',
		category: { card: 'Base game' },
		name: 'A Plague Tale Requiem',
		logoImg: '/assets/images/D4XXzTW/a-plague-tale-requiem-logo.png',
		coverImg: '/assets/images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
		coverMobile: '/assets/images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
		price: { regular: 36.99, discount: 24.99 },
	},
	{
		id: 'the-last-of-us-part-ii',
		category: { card: 'Base game' },
		name: 'The Last of Us Part II',
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 39.99 },
	},
	{
		id: 'ghost-of-tsushima',
		category: { card: 'Base game' },
		name: 'Ghost of Tsushima',
		coverImg: '/assets/images/CarouselCoverDesktop/fall-guy.png',
		logoImg: '/assets/images/QF3t3jQ/fall-guy-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
		coverMobile: '/assets/images/BNm4v3M/fall-guys-carousel-mobile.jpg',
		price: { regular: 49.99, discount: 29.99 },
	},
	{
		id: 'god-of-war-ragnarok',
		category: { card: 'Base game' },
		name: 'God of War: Ragnarok',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
		logoImg: '/assets/images/n7cSm73/fortnite-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/CPyXG7n/uncharted-carousel-mobile.jpg',
		price: { regular: 69.99, discount: 49.99 },
	},
	{
		id: 'red-dead-redemption-2',
		category: { card: 'Base game' },
		name: 'Red Dead Redemption 2',
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 39.99 },
	},
	{
		id: 'cyberpunk-2077',
		category: { card: 'Base game' },
		name: 'Cyberpunk 2077',
		coverImg: '/assets/images/CarouselCoverDesktop/fall-guy.png',
		logoImg: '/assets/images/QF3t3jQ/fall-guy-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
		coverMobile: '/assets/images/BNm4v3M/fall-guys-carousel-mobile.jpg',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 'horizon-zero-dawn',
		category: { card: 'Base game' },
		name: 'Horizon Zero Dawn',
		coverImg: '/assets/images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
		logoImg: '/assets/images/D4XXzTW/a-plague-tale-requiem-logo.png',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
		coverMobile: '/assets/images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
		price: { regular: 49.99, discount: 19.99 },
	},
	{
		id: 'elden-ring',
		category: { card: 'Base game' },
		name: 'Elden Ring',
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 69.99, discount: 59.99 },
	},
	{
		id: 'death-stranding',
		category: { card: 'Base game' },
		name: 'Death Stranding',
		coverImg: '/assets/images/CarouselCoverDesktop/fall-guy.png',
		logoImg: '/assets/images/QF3t3jQ/fall-guy-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
		coverMobile: '/assets/images/BNm4v3M/fall-guys-carousel-mobile.jpg',
		price: { regular: 59.99, discount: 39.99 },
	},
	{
		id: 'resident-evil-village',
		category: { card: 'Base game' },
		name: 'Resident Evil Village',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
		logoImg: '/assets/images/SyGvndD/fortnite-carousel-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/6X04C8f/fortnite-carousel-mobile.jpg',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 'assassins-creed-valhalla',
		category: { card: 'Base game' },
		name: "Assassin's Creed Valhalla",
		coverImg: '/assets/images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
		logoImg: '/assets/images/D4XXzTW/a-plague-tale-requiem-logo.png',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
		coverMobile: '/assets/images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
		price: { regular: 49.99, discount: 19.99 },
	},
	{
		id: 'call-of-duty-modern-warfare-ii',
		category: { card: 'Base game' },
		name: 'Call of Duty: Modern Warfare II',
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 69.99, discount: 59.99 },
	},
	{
		id: 'far-cry-6',
		category: { card: 'Base game' },
		name: 'Far Cry 6',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
		logoImg: '/assets/images/SyGvndD/fortnite-carousel-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/6X04C8f/fortnite-carousel-mobile.jpg',
		price: { regular: 59.99, discount: 39.99 },
	},
	{
		id: 'diablo-iv',
		category: { card: 'Base game' },
		name: 'Diablo IV',
		coverImg: '/assets/images/CarouselCoverDesktop/fall-guy.png',
		logoImg: '/assets/images/QF3t3jQ/fall-guy-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
		coverMobile: '/assets/images/BNm4v3M/fall-guys-carousel-mobile.jpg',
		price: { regular: 69.99, discount: 49.99 },
	},
	{
		id: 'minecraft',
		category: { card: 'Base game' },
		name: 'Minecraft',
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 29.99, discount: 19.99 },
	},
	{
		id: 'overwatch-2',
		category: { card: 'Base game' },
		name: 'Overwatch 2',
		coverImg: '/assets/images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
		logoImg: '/assets/images/D4XXzTW/a-plague-tale-requiem-logo.png',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
		coverMobile: '/assets/images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
		price: { regular: 39.99, discount: 29.99 },
	},
	{
		id: 'apex-legends',
		category: { card: 'Base game' },
		name: 'Apex Legends',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
		logoImg: '/assets/images/SyGvndD/fortnite-carousel-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/6X04C8f/fortnite-carousel-mobile.jpg',
		price: { regular: 39.99, discount: 24.99 },
	},
	{
		id: 'league-of-legends',
		category: { card: 'Base game' },
		name: 'League of Legends',
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 39.99, discount: 19.99 },
	},
	{
		id: 'valorant',
		category: { card: 'Base game' },
		name: 'Valorant',
		coverImg: '/assets/images/CarouselCoverDesktop/fall-guy.png',
		logoImg: '/assets/images/QF3t3jQ/fall-guy-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
		coverMobile: '/assets/images/BNm4v3M/fall-guys-carousel-mobile.jpg',
		price: { regular: 39.99, discount: 19.99 },
	},
	{
		id: 'pubg-battlegrounds',
		category: { card: 'Base game' },
		name: 'PUBG: Battlegrounds',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
		logoImg: '/assets/images/SyGvndD/fortnite-carousel-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/6X04C8f/fortnite-carousel-mobile.jpg',
		price: { regular: 29.99, discount: 14.99 },
	},
	{
		id: 'sea-of-thieves',
		category: { card: 'Base game' },
		name: 'Sea of Thieves',
		coverImg: '/assets/images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
		logoImg: '/assets/images/D4XXzTW/a-plague-tale-requiem-logo.png',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
		coverMobile: '/assets/images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
		price: { regular: 59.99, discount: 39.99 },
	},
	{
		id: 'forza-horizon-5',
		category: { card: 'Base game' },
		name: 'Forza Horizon 5',
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 69.99, discount: 49.99 },
	},
];

function EditGameCards() {
	const [gamesCards, setGameCards] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorChange, setErrorChange] = useState(0);

	const cardsRef = useRef([]);

	const errorMessages = useRef([[], []]);

	const { cloneObject } = useObjectUtilities();

	useEffect(() => {
		setTimeout(() => {
			const gameCardData = [
				{
					id: 0,
					cards: [
						{ id: 0, header: 'Best sell', cards: items },
						{ id: 1, header: 'WOW sell', cards: items },
					],
				},
				{
					id: 1,
					cards: [
						{ id: 0, header: 'Best sell', cards: items },
						{ id: 1, header: 'WOW sell', cards: items },
					],
				},
				{
					id: 2,
					cards: [
						{ id: 0, header: 'Best sell', cards: items },
						{ id: 1, header: 'WOW sell', cards: items },
					],
				},
			];

			errorMessages.current = gameCardData.map(gameCard => gameCard.cards.map(() => ''));
			cardsRef.current = cloneObject(gameCardData);
			setGameCards(gameCardData);
			setIsLoading(false);
		}, 200);
	}, [cloneObject]);

	const setModal = useModal();

	const handleValidation = () => {
		let flag = false;

		let firstSectionFlag = false;
		let modalFlag = false;
		cardsRef.current[0].cards.forEach((game, index) => {
			if (game.cards.length < 18) {
				if (firstSectionFlag && game.cards.length === 0) {
					modalFlag = true;
					cardsRef.current[0].cards.splice(index, 1);
				} else {
					flag = true;
					errorMessages.current[0][index] =
						'You must have at least 18 cards for the first section';
				}
			} else if (errorMessages.current[0][index] !== '') {
				errorMessages.current[0][index] = '';
				flag = true;
			}
			firstSectionFlag = true;
		});

		cardsRef.current.slice(1).forEach((gameCards, index) => {
			const removeIndex = [];

			gameCards.cards.forEach((game, innerIndex) => {
				if (game.cards.length < 6) {
					if (game.cards.length === 0) {
						modalFlag = true;

						removeIndex.push(innerIndex);
					} else {
						flag = true;
						errorMessages.current[index + 1][innerIndex] =
							'You must have at least 12 cards';
					}
				} else if (errorMessages.current[index + 1]?.[innerIndex]) {
					errorMessages.current[index + 1][innerIndex] = '';
					flag = true;
				}
			});

			if (removeIndex.length === gameCards.cards.length) {
				modalFlag = true;
				cardsRef.current.splice(index + 1, 1);
			} else {
				removeIndex.forEach(innerIndex => {
					cardsRef.current[index + 1].cards.splice(innerIndex, 1);
				});
			}
		});
		setGameCards(cloneObject(cardsRef.current));

		if (modalFlag) {
			setModal({
				title: 'Clear Section',
				body: <p>Sections with no cards are removed. </p>,
				footer: (
					<NormalButtonWithEffects
						text='Ok'
						onClick={() =>
							setModal({
								title: null,
								body: null,
								footer: null,
							})
						}
						className={styles.okBtn}
					/>
				),
			});
		}

		if (flag) {
			setErrorChange(prev => prev + 1);
		} else {
			console.log(cardsRef.current);
		}
	};

	return (
		<div className={styles.editGameCards}>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					<h2 className={styles.editBannerHeader}>Edit Game Cards</h2>
					<EditGameCardFirstPart
						gameCards={gamesCards[0]}
						cardsRef={cardsRef}
						setGameCards={setGameCards}
						errorMessages={errorMessages.current[0]}
						errorChange={errorChange}
					/>
					<EditGameCardOtherPart
						gamesCards={gamesCards.slice(1)}
						cardsRef={cardsRef}
						setGameCards={setGameCards}
						errorMessages={errorMessages.current.slice(1)}
						errorChange={errorChange}
					/>
				</>
			)}
			<div className={styles.addSectionBtn}>
				<NormalButtonWithEffects
					text='Add one more section +'
					onClick={() => {
						setGameCards(prev => [
							...prev,
							{
								id: new Date().getTime(),
								cards: [{ id: 0, header: '', cards: [] }],
							},
						]);
						cardsRef.current.push({
							id: new Date().getTime(),
							cards: [{ id: 0, header: '', cards: [] }],
						});
					}}
				/>
			</div>
			<div className={styles.saveBtn}>
				<NormalButtonWithEffects text='Save' onClick={handleValidation} />
			</div>
		</div>
	);
}
export default EditGameCards;
