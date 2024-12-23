import { memo, useEffect, useReducer } from 'react';
import useScreenWidth from '../../../../../Utils/Hooks/useScreenWidth';
import BrowseGameCards from '../Components/BrowseGameCards/BrowseGameCards';
import BrowseHeader from '../Components/BrowseHeader/BrowseHeader/BrowseHeader';
import FilterGames from '../Components/FilterGames/FilterGames/FilterGames';
import MobileSortAndFilterButton from '../Components/MobileSortAndFilterButton/MobileSortAndFilterButton';
import withFilterSortProvider from '../Utils/HOC/withFilterSortProvider';
import useBrowseLogics from '../Utils/useBrowseLogics/useBrowseLogics';
import styles from './Browse.module.css';

const items = [
	{
		id: 0,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 1,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: 59.99,
	},
	{
		id: 2,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: 0,
	},
	{
		id: 3,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 4,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 5,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 6,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 7,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 8,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 9,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 10,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 11,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 12,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 13,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 14,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 15,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 16,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 17,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 18,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},

	{
		id: 19,
		name: 'UNCHARTED™: Legacy of Thieves Collection',
		category: {
			card: 'Base game',
		},
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
		logoImg: '/assets/images/CarouselInfo/fortnite-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/CarouselCoverMobile/uncharted-carousel-mobile.jpg',
		price: { regular: 49.99, discount: 15.99 },
	},
];

function BrowseMain() {
	const { initialState, reducer } = useBrowseLogics();
	const screenWidth = useScreenWidth();
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({ type: 'fetch', data: items });
	}, []);

	return (
		<section className={styles.browse}>
			<BrowseHeader handleChange={dispatch} state={state} />
			<div className={styles.mainContent}>
				<FilterGames
					dispatch={dispatch}
					filterState={state.filterState}
					limits={state.rangeLimits}
				/>
				<BrowseGameCards dispatch={dispatch} state={state} />
			</div>
			{screenWidth < 769 && <MobileSortAndFilterButton />}
		</section>
	);
}

const Browse = withFilterSortProvider(memo(BrowseMain));

export default Browse;
