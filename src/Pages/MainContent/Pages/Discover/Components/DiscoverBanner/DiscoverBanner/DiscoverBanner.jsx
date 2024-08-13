import { useEffect, useReducer } from 'react';
import useScreenWidth from '../../../../../../../Hooks/useScreenWidth';
import BannerButtons from '../Components/DiscoverBannerButtons/DiscoverBannerButtons';
import DiscoverBannerInfoItems from '../Components/DiscoverBannerInfoItems/DiscoverBannerInfoItems';
import DiscoverBannerItemCards from '../Components/DiscoverBannerItemCards/DiscoverBannerItemCards';
import DiscoverBannerItems from '../Components/DiscoverBannerItems/DiscoverBannerItems';
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
		logoImg: '/assets/images/CarouselInfo/fall-guy-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
		coverMobile: '/assets/images/CarouselCoverMobile/fall-guys-carousel-mobile.jpg',
		price: 'Free',
	},
	{
		id: 1011,
		name: 'Fortnite',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
		coverMobile: '/assets/images/CarouselCoverMobile/fortnite-carousel-mobile.jpg',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
		logoImg: '/assets/images/CarouselInfo/fortnite-carousel-logo.png',
		price: 'Free',
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
	const { reducer, initialState, reset, start, stop, activeBanner, setDispatch } =
		useDiscoverBannerLogics();

	const [{ data, active, fadeIn, fadeOut, cardsPosition, isPause }, dispatch] = useReducer(
		reducer,
		initialState
	);
	const screenWidth = useScreenWidth();

	const handleClick = type => {
		dispatch(type);
		reset();
	};

	useEffect(() => {
		setDispatch(dispatch);
		dispatch({ type: 'fetch', data: items });
	}, [setDispatch, start, stop]);

	return (
		<section className={styles.banner}>
			<div className={styles.bannerOverflow}>
				<DiscoverBannerItems
					activeBanner={activeBanner}
					screenWidth={screenWidth}
					cardsPosition={cardsPosition}
					bannerState={{ active, fadeOut, fadeIn }}
					data={data}
				/>
				<DiscoverBannerInfoItems
					data={data}
					activeBanner={activeBanner}
					bannerState={{ active, fadeOut, fadeIn }}
				/>
			</div>
			<BannerButtons handleClick={handleClick} />
			{screenWidth > 768 && (
				<DiscoverBannerItemCards
					handleClick={handleClick}
					data={data}
					cardsPosition={cardsPosition}
					isPause={isPause}
				/>
			)}
		</section>
	);
}
