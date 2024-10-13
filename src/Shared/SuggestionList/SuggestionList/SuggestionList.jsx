import { useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../Utils/Hooks/useAppearDisappear';
import useHandleDebouncing from '../../../Utils/Hooks/useHandleDebouncing';
import useObjectUtilities from '../../../Utils/Hooks/useObjectUtilities';
import SuggestionListBody from '../SuggestionListBody/SuggestionListBody';

const data = [
	{
		name: "Marvel's Spider-Man Remastered",
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'UNCHARTED™: Legacy of Thieves Collection',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Fall Guy',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Fortnite',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'A Plague Tale Requiem',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'The Witcher 3: Wild Hunt',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Cyberpunk 2077',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'God of War Ragnarök',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Horizon Forbidden West',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'Red Dead Redemption 2',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'Ghost of Tsushima',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Assassin’s Creed Valhalla',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Elden Ring',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Death Stranding',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'Far Cry 6',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'Call of Duty: Modern Warfare II',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Halo Infinite',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Resident Evil Village',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Demon’s Souls',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'Ratchet & Clank: Rift Apart',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'Returnal',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Forza Horizon 5',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'FIFA 23',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'NBA 2K23',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'Madden NFL 23',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'Gran Turismo 7',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Tales of Arise',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Final Fantasy XVI',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Monster Hunter Rise',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'The Elder Scrolls V: Skyrim Anniversary Edition',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	// Add similar entries for the remaining IDs
	{
		name: 'Borderlands 3',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Watch Dogs: Legion',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Hitman 3',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Valheim',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'Outriders',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},

	{
		name: 'Star Wars Jedi: Fallen Order',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Dying Light 2: Stay Human',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Sifu',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Kena: Bridge of Spirits',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'It Takes Two',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'Back 4 Blood',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Hitman 2',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Nioh 2',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'The Division 2',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'Immortals Fenyx Rising',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'Control',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Diablo III',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Path of Exile',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Genshin Impact',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'League of Legends',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'Valorant',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Apex Legends',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Overwatch 2',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'World of Warcraft',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'Destiny 2',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'Battlefield 2042',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Farming Simulator 22',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Planet Zoo',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Microsoft Flight Simulator',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'Cities: Skylines',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'Crusader Kings III',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'The Sims 4',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Dark Souls III',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Sekiro: Shadows Die Twice',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'Cuphead',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'Hades',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Celeste',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Dead Cells',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Hollow Knight',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'Slay the Spire',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'Ori and the Will of the Wisps',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'The Outer Worlds',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Prey',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Control Ultimate Edition',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'No Man’s Sky',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'CyberConnect Dragon Ball Z',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Metro Exodus',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'The Ascent',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Hunt: Showdown',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'Doom Eternal',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'Hellblade: Senua’s Sacrifice',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Control',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Mortal Kombat 11',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Tekken 7',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'Dragon Ball FighterZ',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'Street Fighter V',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Marvel vs. Capcom: Infinite',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Jump Force',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Soulcalibur VI',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'Naruto Shippuden: Ultimate Ninja Storm 4',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'Guilty Gear Strive',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'BlazBlue: Cross Tag Battle',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Melty Blood: Type Lumina',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'Under Night In-Birth',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'Skullgirls 2nd Encore',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'Granblue Fantasy: Versus',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Battlefield V',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'Titanfall 2',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'PUBG: Battlegrounds',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		name: 'Rainbow Six Siege',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		name: 'ARK: Survival Evolved',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		name: 'Rust',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		name: 'DayZ',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		name: 'SCUM',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
];

function SuggestionList({
	state,
	setShow,
	setValue,
	setState,
	name,
	value,
	elementRef,
	className,
	setSuggestionRef,
	noPositionChange,
	link,
}) {
	const [show, fadeIn] = useAppearDisappear(state);
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(false);

	const [height, setHeight] = useState(0);

	const positionRef = useRef(false);

	const previousBottomRemain = useRef(0);
	const eventRefs = useRef(null);

	const prevLength = useRef(list.length);

	const valueRef = useRef(value);
	valueRef.current = value;

	const { cloneObject } = useObjectUtilities();

	const handleDebouncing = useHandleDebouncing(200);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleCalcPosition: length => {
				const { height: eleHeight, y } = elementRef.current.getBoundingClientRect();
				const bottomRemain = window.innerHeight - y - eleHeight;

				if (bottomRemain >= 120 || y < 120) {
					if (
						!noPositionChange &&
						(previousBottomRemain.current !== bottomRemain ||
							prevLength.current !== length)
					) {
						positionRef.current = false;
						prevLength.current = length;
					}
				} else if (
					!noPositionChange &&
					(previousBottomRemain.current !== bottomRemain || prevLength.current !== length)
				) {
					if (length < 2 && bottomRemain >= 60) {
						positionRef.current = false;
						prevLength.current = length;
					} else positionRef.current = true;
				}

				if (length > 4) {
					setHeight(
						Math.min(
							parseInt((positionRef.current ? y : bottomRemain) / 60, 10) * 60,
							240
						)
					);
				} else {
					setHeight((length || 1) * 60);
				}
				return bottomRemain;
			},
			handleAddStrongMatch: givenList => {
				givenList.forEach(item => {
					const index = item.name.toLowerCase().indexOf(valueRef.current.toLowerCase());
					const firstPart = item.name.slice(0, index);
					const secondPart = item.name.slice(index, index + valueRef.current.length);
					const thirdPart = item.name.slice(index + valueRef.current.length);

					item.editedName = (
						<>
							{firstPart}
							<strong>{secondPart}</strong>
							{thirdPart}
						</>
					);
				});

				previousBottomRemain.current = eventRefs.current.handleCalcPosition(
					givenList.length
				);

				setList(givenList);
			},
			fetchData: () => {
				// fetch data

				const filteredList = data.filter(
					item =>
						item.name.toLowerCase().includes(valueRef.current.toLowerCase()) &&
						valueRef.current !== ' ' &&
						valueRef.current !== ''
				);

				// clone the filtered list
				setLoading(false);
				const newFilteredList = cloneObject(filteredList);
				eventRefs.current.handleAddStrongMatch(newFilteredList);
			},
		};
	}

	const loadingRef = useRef(loading);
	loadingRef.current = loading;

	const prevValueRef = useRef(value);

	useEffect(() => {
		if (value !== '' && value !== ' ' && value !== prevValueRef.current) {
			if (!loadingRef.current) setLoading(true);
			handleDebouncing(() => {
				eventRefs.current.fetchData();
				prevValueRef.current = value;
			});
		}
	}, [handleDebouncing, value]);

	return (
		show && (
			<SuggestionListBody
				setSuggestionRef={setSuggestionRef}
				fadeIn={fadeIn}
				list={list}
				setValue={setValue}
				setState={setState}
				name={name}
				value={value}
				setShow={setShow}
				show={show}
				positionRef={positionRef}
				className={className}
				height={height}
				loading={loading}
			/>
		)
	);
}
export default SuggestionList;
