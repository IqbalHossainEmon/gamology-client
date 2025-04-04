import { useEffect, useReducer, useRef } from 'react';
import useScreenWidth from '../../../../../../../Utils/Hooks/useScreenWidth';
import BannerButtons from '../Components/DiscoverBannerButtons/DiscoverBannerButtons';
import DiscoverBannerInfoItems from '../Components/DiscoverBannerInfoItems/DiscoverBannerInfoItems/DiscoverBannerInfoItems';
import DiscoverBannerItemCards from '../Components/DiscoverBannerItemCards/DiscoverBannerItemCards/DiscoverBannerItemCards';
import DiscoverBannerItems from '../Components/DiscoverBannerItems/DiscoverBannerItems/DiscoverBannerItems';
import useDiscoverBannerLogics from '../useDiscoverBannerLogics/useDiscoverBannerLogics';
import styles from './DiscoverBanner.module.css';

const items = [
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
		logoImg: '/assets/images/CarouselInfo/fall-guy-logo.avif',
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

export default function DiscoverBanner() {
	const { reducer, initialState, start, stop, activeBanner, setDispatch } =
		useDiscoverBannerLogics();
	const [{ data, active, fadeIn, fadeOut, cardsPosition, isPause }, dispatch] = useReducer(
		reducer,
		initialState
	);
	const { widthInRem } = useScreenWidth();

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleClick: type => {
				dispatch(type);
			},
			handleShadowDispatch: () => {
				dispatch({ type: 'next' });
			},
		};
	}

	useEffect(() => {
		setDispatch(dispatch);
		dispatch({ type: 'fetch', data: items });
	}, [setDispatch, start, stop]);

	const timerIdRef = useRef(null);

	useEffect(() => {
		const clearTimer = () => {
			clearTimeout(timerIdRef.current);
			timerIdRef.current = null;
		};
		if (timerIdRef.current) {
			clearTimer();
		}

		if (widthInRem < 48) {
			if (!isPause) {
				timerIdRef.current = setTimeout(() => {
					dispatch({ type: 'next' });
				}, 9000);
			}
		}
		return clearTimer;
	}, [isPause, widthInRem, fadeIn]);

	return (
		<section className={styles.banner}>
			<div className={styles.bannerOverflow}>
				<DiscoverBannerItems
					activeBanner={activeBanner}
					bannerState={{ active, fadeOut, fadeIn }}
					cardsPosition={cardsPosition}
					data={data}
					screenWidth={widthInRem}
				/>
				<DiscoverBannerInfoItems
					activeBanner={activeBanner}
					bannerState={{ active, fadeOut, fadeIn }}
					data={data}
				/>
			</div>
			<BannerButtons handleClick={eventRefs.current.handleClick} />
			{widthInRem > 48 && (
				<DiscoverBannerItemCards
					cardsPosition={cardsPosition}
					cardShadowUtils={{ dispatch: eventRefs.current.handleShadowDispatch, isPause }}
					data={data}
					handleClick={eventRefs.current.handleClick}
				/>
			)}
		</section>
	);
}
