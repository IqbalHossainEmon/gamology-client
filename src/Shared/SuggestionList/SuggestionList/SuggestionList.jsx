import { useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../Utils/Hooks/useAppearDisappear';
import useHandleDebouncing from '../../../Utils/Hooks/useHandleDebouncing';
import useObjectUtilities from '../../../Utils/Hooks/useObjectUtilities';
import SuggestionListBody from '../SuggestionListBody/SuggestionListBody';

const data = [
	{
		id: 1000,
		name: "Marvel's Spider-Man Remastered",
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1001,
		name: 'UNCHARTED™: Legacy of Thieves Collection',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1010,
		name: 'Fall Guy',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1011,
		name: 'Fortnite',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1100,
		name: 'A Plague Tale Requiem',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1101,
		name: 'The Witcher 3: Wild Hunt',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1102,
		name: 'Cyberpunk 2077',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1103,
		name: 'God of War Ragnarök',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1104,
		name: 'Horizon Forbidden West',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1105,
		name: 'Red Dead Redemption 2',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1106,
		name: 'Ghost of Tsushima',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1107,
		name: 'Assassin’s Creed Valhalla',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1108,
		name: 'Elden Ring',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1109,
		name: 'Death Stranding',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1110,
		name: 'Far Cry 6',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1111,
		name: 'Call of Duty: Modern Warfare II',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1112,
		name: 'Halo Infinite',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1113,
		name: 'Resident Evil Village',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1114,
		name: 'Demon’s Souls',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1115,
		name: 'Ratchet & Clank: Rift Apart',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1116,
		name: 'Returnal',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1117,
		name: 'Forza Horizon 5',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1118,
		name: 'FIFA 23',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1119,
		name: 'NBA 2K23',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1120,
		name: 'Madden NFL 23',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1121,
		name: 'Gran Turismo 7',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1122,
		name: 'Tales of Arise',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1123,
		name: 'Final Fantasy XVI',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1124,
		name: 'Monster Hunter Rise',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1125,
		name: 'The Elder Scrolls V: Skyrim Anniversary Edition',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	// Add similar entries for the remaining IDs
	{
		id: 1126,
		name: 'Borderlands 3',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1127,
		name: 'Watch Dogs: Legion',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1128,
		name: 'Hitman 3',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1129,
		name: 'Valheim',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1130,
		name: 'Outriders',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},

	{
		id: 1131,
		name: 'Star Wars Jedi: Fallen Order',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1132,
		name: 'Dying Light 2: Stay Human',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1133,
		name: 'Sifu',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1134,
		name: 'Kena: Bridge of Spirits',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1135,
		name: 'It Takes Two',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1136,
		name: 'Back 4 Blood',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1137,
		name: 'Hitman 2',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1138,
		name: 'Nioh 2',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1139,
		name: 'The Division 2',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1140,
		name: 'Immortals Fenyx Rising',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1141,
		name: 'Control',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1142,
		name: 'Diablo III',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1143,
		name: 'Path of Exile',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1144,
		name: 'Genshin Impact',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1145,
		name: 'League of Legends',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1146,
		name: 'Valorant',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1147,
		name: 'Apex Legends',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1148,
		name: 'Overwatch 2',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1149,
		name: 'World of Warcraft',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1150,
		name: 'Destiny 2',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1151,
		name: 'Battlefield 2042',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1152,
		name: 'Farming Simulator 22',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1153,
		name: 'Planet Zoo',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1154,
		name: 'Microsoft Flight Simulator',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1155,
		name: 'Cities: Skylines',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1156,
		name: 'Crusader Kings III',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1157,
		name: 'The Sims 4',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1158,
		name: 'Dark Souls III',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1159,
		name: 'Sekiro: Shadows Die Twice',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1160,
		name: 'Cuphead',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1161,
		name: 'Hades',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1162,
		name: 'Celeste',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1163,
		name: 'Dead Cells',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1164,
		name: 'Hollow Knight',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1165,
		name: 'Slay the Spire',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1166,
		name: 'Ori and the Will of the Wisps',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1167,
		name: 'The Outer Worlds',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1168,
		name: 'Prey',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1169,
		name: 'Control Ultimate Edition',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1170,
		name: 'No Man’s Sky',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1171,
		name: 'CyberConnect Dragon Ball Z',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1172,
		name: 'Metro Exodus',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1173,
		name: 'The Ascent',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1174,
		name: 'Hunt: Showdown',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1175,
		name: 'Doom Eternal',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1176,
		name: 'Hellblade: Senua’s Sacrifice',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1177,
		name: 'Control',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1178,
		name: 'Mortal Kombat 11',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1179,
		name: 'Tekken 7',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1180,
		name: 'Dragon Ball FighterZ',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1181,
		name: 'Street Fighter V',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1182,
		name: 'Marvel vs. Capcom: Infinite',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1183,
		name: 'Jump Force',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1184,
		name: 'Soulcalibur VI',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1185,
		name: 'Naruto Shippuden: Ultimate Ninja Storm 4',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1186,
		name: 'Guilty Gear Strive',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1187,
		name: 'BlazBlue: Cross Tag Battle',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1188,
		name: 'Melty Blood: Type Lumina',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1189,
		name: 'Under Night In-Birth',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1190,
		name: 'Skullgirls 2nd Encore',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1191,
		name: 'Granblue Fantasy: Versus',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1192,
		name: 'Battlefield V',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1193,
		name: 'Titanfall 2',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1194,
		name: 'PUBG: Battlegrounds',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
	},
	{
		id: 1195,
		name: 'Rainbow Six Siege',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
	},
	{
		id: 1196,
		name: 'ARK: Survival Evolved',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
	},
	{
		id: 1197,
		name: 'Rust',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
	},
	{
		id: 1198,
		name: 'DayZ',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
	},
	{
		id: 1199,
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

	const valueRef = useRef(value);
	valueRef.current = value;

	const { cloneObject } = useObjectUtilities();

	const handleDebouncing = useHandleDebouncing(200);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleCalcPosition: length => {
				const { height: eleHeight, y } = elementRef.current.getBoundingClientRect();
				const bottomRemain = window.innerHeight - y - eleHeight;

				if (bottomRemain >= 120) {
					if (!noPositionChange && previousBottomRemain.current !== bottomRemain) {
						positionRef.current = false;
					}
				} else if (!noPositionChange && previousBottomRemain.current !== bottomRemain) {
					positionRef.current = true;
				}
				const checkRemain = parseInt(bottomRemain / 60, 10);

				if (length > 4) {
					switch (checkRemain) {
						case 2:
							setHeight(120);
							break;
						case 3:
							setHeight(180);
							break;
						default:
							setHeight(240);
					}
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

				const newFilteredList = cloneObject(filteredList);
				eventRefs.current.handleAddStrongMatch(newFilteredList);
			},
		};
	}

	const prevValueRef = useRef(value);

	useEffect(() => {
		if (value !== '' && value !== ' ' && value !== prevValueRef.current) {
			handleDebouncing(() => {
				eventRefs.current.fetchData();
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
