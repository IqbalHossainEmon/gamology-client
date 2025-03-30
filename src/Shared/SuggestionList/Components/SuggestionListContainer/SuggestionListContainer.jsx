import { useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../../Utils/Hooks/useAppearDisappear';
import useDropDownHide from '../../../../Utils/Hooks/useDropDownHide';
import useObjectUtilities from '../../../../Utils/Hooks/useObjectUtilities';
import SuggestionListContent from '../SuggestionListContent/SuggestionListContent';
import styles from './SuggestionListContainer.module.css';

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
		name: 'Contro 1',
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
		name: 'Control 2',
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

function SuggestionListContainer({
	state,
	setShow,
	setState,
	value,
	elementRef,
	className,
	noPositionChange,
	extraSection,
	maxLimit,
	searchInputRef,
	extraSectionParams,
	link,
	ref,
	setContainerHeight,
}) {
	const [show, fadeIn] = useAppearDisappear(state, false, true, 350);
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(false);

	const [height, setHeight] = useState(0);

	const positionRef = useRef(false);

	const previousBottomRemain = useRef(0);
	const eventRefs = useRef(null);

	const heightRef = useRef(height);
	heightRef.current = height;

	const prevLength = useRef(list.length);

	const valueRef = useRef(value);
	valueRef.current = value;

	const loadingRef = useRef(loading);
	loadingRef.current = loading;

	const listLengthRef = useRef(0);
	const suggestionRef = useRef(null);

	const showRef = useRef(show);
	showRef.current = show;

	const isSelected = useRef(false);

	const { setElement, onHide, showMenu } = useDropDownHide(val => {
		setShow(val);
	});

	const { cloneObject } = useObjectUtilities();

	if (!eventRefs.current) {
		let timerId;
		eventRefs.current = {
			onfocus: e => {
				if (e.target.value.length > 0) {
					setShow(true);
					if (showRef.current) showMenu();
				}
			},
			onBlur: e => {
				if (e.target.value.length === 0) {
					setShow(false);
					if (showRef.current) onHide();
				}
			},
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
					if (length < 2 && bottomRemain >= 56) {
						positionRef.current = false;
						prevLength.current = length;
					} else positionRef.current = true;
				}

				switch (!!maxLimit) {
					case true:
						setHeight(length * 56);
						break;
					default:
						if (length > 4 && !maxLimit) {
							setHeight(
								Math.min(
									parseInt((positionRef.current ? y : bottomRemain) / 56, 10) *
										56,
									224
								)
							);
						} else {
							setHeight((length || 1) * 56);
						}
						break;
				}
				return bottomRemain;
			},
			handleAddStrongMatch: givenList => {
				givenList.forEach(item => {
					const index = item.name.toLowerCase().indexOf(valueRef.current.toLowerCase());
					const prefixText = item.name.slice(0, index);
					const matchedSubstring = item.name.slice(
						index,
						index + valueRef.current.length
					);
					const trailingText = item.name.slice(index + valueRef.current.length);

					item.editedName = (
						<>
							{prefixText}
							<strong className={styles.matchText}>{matchedSubstring}</strong>
							{trailingText}
						</>
					);
				});

				previousBottomRemain.current = eventRefs.current.handleCalcPosition(
					givenList.length
				);
				if (loadingRef.current) setLoading(false);
				setList(givenList);
			},
			fetchData: () => {
				// fetch data
				if (!loadingRef.current) setLoading(true);
				const filteredList = data.filter(
					item =>
						item.name.toLowerCase().includes(valueRef.current?.toLowerCase()) &&
						valueRef.current !== ' ' &&
						valueRef.current !== ''
				);

				listLengthRef.current = filteredList.length;
				const newFilteredList = cloneObject(filteredList);
				eventRefs.current.handleAddStrongMatch(newFilteredList);
			},
			fetchDataWithLimit: () => {
				// fetch data
				if (!loadingRef.current) setLoading(true);

				const filteredList = data.filter(
					item =>
						item.name.toLowerCase().includes(valueRef.current.toLowerCase()) &&
						valueRef.current !== ' ' &&
						valueRef.current !== ''
				);
				listLengthRef.current = filteredList.length;
				eventRefs.current.handleAddStrongMatch(
					cloneObject(filteredList).slice(0, maxLimit)
				);
			},
			handleSideEffects: () => {
				if (valueRef.current && valueRef.current !== ' ') {
					if (!loadingRef.current) setLoading(true);

					if (timerId) {
						clearTimeout(timerId);
					}

					timerId = setTimeout(() => {
						if (maxLimit) eventRefs.current.fetchDataWithLimit();
						else eventRefs.current.fetchData();
						timerId = null;
					}, 200);
				} else {
					if (timerId) {
						clearTimeout(timerId);
						timerId = null;
					}
					if (loadingRef.current) setLoading(false);
					setList([]);
					if (heightRef.current > 56) {
						setHeight(56);
					}
				}
			},
		};
	}

	useEffect(() => {
		const searchInput = searchInputRef.current;
		searchInput.addEventListener('focus', eventRefs.current.onfocus);
		searchInput.addEventListener('blur', eventRefs.current.onBlur);
		return () => {
			searchInput.removeEventListener('focus', eventRefs.current.onfocus);
			searchInput.removeEventListener('blur', eventRefs.current.onBlur);
		};
	}, [searchInputRef]);

	useEffect(() => {
		if (!isSelected.current) {
			eventRefs.current.handleSideEffects();
		}
	}, [maxLimit, value]);

	return (
		show && (
			<SuggestionListContent
				fadeIn={fadeIn}
				list={list}
				handleSideEffects={eventRefs.current.handleSideEffects}
				setState={setState}
				value={value}
				setShow={setShow}
				onHide={onHide}
				show={show}
				positionRef={positionRef}
				className={className}
				height={height}
				loading={loading}
				showMenu={showMenu}
				extraSection={extraSection}
				suggestionRef={suggestionRef}
				ref={ref}
				setElement={setElement}
				length={listLengthRef.current}
				extraSectionParams={extraSectionParams}
				elementRef={elementRef}
				setContainerHeight={setContainerHeight}
				isSelected={isSelected}
				searchInputRef={searchInputRef}
			/>
		)
	);
}
export default SuggestionListContainer;
