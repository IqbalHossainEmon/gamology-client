import { useEffect, useReducer, useRef } from 'react';
import useScreenWidth from '../../../../../Hooks/useScreenWidth';
import GamesButton from '../Components/DiscoverGamesButtons/DiscoverGamesButtons';
import DiscoverGamesCards from '../Components/DiscoverGamesCards/DiscoverGamesCards';
import CardsHeader from '../Components/DiscoverGamesCardsHeader/DiscoverGamesCardsHeader';
import useGamesLogics from '../useGamesLogics/useGamesLogics';
import styles from './DiscoverGames.module.css';

const items = [
  {
    id: 0,
    category: {
      card: 'Base game',
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: '/src/assets/images/CarouselCoverDesktop/spiderman.png',
    logoImg: '/src/assets/images/wWJ85k7/spiderman-logo.png',
    carouselThumb:
      '/src/assets/images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile:
      '/src/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 },
  },
  {
    id: 1,
    category: {
      card: 'Base game',
    },
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    coverImg: '/src/assets/images/CarouselCoverDesktop/fortnite.png',
    logoImg: '/src/assets/images/n7cSm73/fortnite-logo.png',
    carouselThumb:
      '/src/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: '/src/assets/images/CPyXG7n/uncharted-carousel-mobile.jpg',
    price: { regular: 64.99, discount: 18.99 },
  },
  {
    id: 2,
    category: {
      card: 'Base game',
    },
    name: 'Fall Guy',
    coverImg: '/src/assets/images/CarouselCoverDesktop/fall-guy.png',
    logoImg: '/src/assets/images/QF3t3jQ/fall-guy-logo.png',
    carouselThumb:
      '/src/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
    coverMobile: '/src/assets/images/BNm4v3M/fall-guys-carousel-mobile.jpg',
    price: { regular: 39.99, discount: 29.99 },
  },
  {
    id: 3,
    category: {
      card: 'Base game',
    },
    name: 'Fortnite',
    carouselThumb:
      '/src/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: '/src/assets/images/6X04C8f/fortnite-carousel-mobile.jpg',
    coverImg:
      '/src/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
    logoImg: '/src/assets/images/SyGvndD/fortnite-carousel-logo.png',
    price: { regular: 34.99, discount: 25.99 },
  },
  {
    id: 4,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: '/src/assets/images/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg:
      '/src/assets/images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
    carouselThumb:
      '/src/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile:
      '/src/assets/images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 36.99, discount: 24.99 },
  },
  {
    id: 5,
    category: {
      card: 'Base game',
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: '/src/assets/images/CarouselCoverDesktop/spiderman.png',
    logoImg: '/src/assets/images/wWJ85k7/spiderman-logo.png',
    carouselThumb:
      '/src/assets/images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile:
      '/src/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 },
  },
  {
    id: 6,
    category: {
      card: 'Base game',
    },
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    coverImg: '/src/assets/images/CarouselCoverDesktop/fortnite.png',
    logoImg: '/src/assets/images/n7cSm73/fortnite-logo.png',
    carouselThumb:
      '/src/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: '/src/assets/images/CPyXG7n/uncharted-carousel-mobile.jpg',
    price: { regular: 64.99, discount: 18.99 },
  },
  {
    id: 7,
    category: {
      card: 'Base game',
    },
    name: 'Fall Guy',
    coverImg: '/src/assets/images/CarouselCoverDesktop/fall-guy.png',
    logoImg: '/src/assets/images/QF3t3jQ/fall-guy-logo.png',
    carouselThumb:
      '/src/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
    coverMobile: '/src/assets/images/BNm4v3M/fall-guys-carousel-mobile.jpg',
    price: { regular: 39.99, discount: 29.99 },
  },
  {
    id: 8,
    category: {
      card: 'Base game',
    },
    name: 'Fortnite',
    carouselThumb:
      '/src/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: '/src/assets/images/6X04C8f/fortnite-carousel-mobile.jpg',
    coverImg:
      '/src/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
    logoImg: '/src/assets/images/SyGvndD/fortnite-carousel-logo.png',
    price: { regular: 34.99, discount: 25.99 },
  },
  {
    id: 9,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: '/src/assets/images/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg:
      '/src/assets/images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
    carouselThumb:
      '/src/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile:
      '/src/assets/images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 36.99, discount: 24.99 },
  },
  {
    id: 10,
    category: {
      card: 'Base game',
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: '/src/assets/images/CarouselCoverDesktop/spiderman.png',
    logoImg: '/src/assets/images/wWJ85k7/spiderman-logo.png',
    carouselThumb:
      '/src/assets/images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile:
      '/src/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 },
  },
  {
    id: 11,
    category: {
      card: 'Base game',
    },
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    coverImg: '/src/assets/images/CarouselCoverDesktop/fortnite.png',
    logoImg: '/src/assets/images/n7cSm73/fortnite-logo.png',
    carouselThumb:
      '/src/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: '/src/assets/images/CPyXG7n/uncharted-carousel-mobile.jpg',
    price: { regular: 64.99, discount: 18.99 },
  },
  {
    id: 12,
    category: {
      card: 'Base game',
    },
    name: 'Fall Guy',
    coverImg: '/src/assets/images/CarouselCoverDesktop/fall-guy.png',
    logoImg: '/src/assets/images/QF3t3jQ/fall-guy-logo.png',
    carouselThumb:
      '/src/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
    coverMobile: '/src/assets/images/BNm4v3M/fall-guys-carousel-mobile.jpg',
    price: { regular: 39.99, discount: 29.99 },
  },
  {
    id: 13,
    category: {
      card: 'Base game',
    },
    name: 'Fortnite',
    carouselThumb:
      '/src/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: '/src/assets/images/6X04C8f/fortnite-carousel-mobile.jpg',
    coverImg:
      '/src/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
    logoImg: '/src/assets/images/SyGvndD/fortnite-carousel-logo.png',
    price: { regular: 34.99, discount: 25.99 },
  },
  {
    id: 14,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: '/src/assets/images/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg:
      '/src/assets/images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
    carouselThumb:
      '/src/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile:
      '/src/assets/images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 36.99, discount: 24.99 },
  },
  {
    id: 15,
    category: {
      card: 'Base game',
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: '/src/assets/images/CarouselCoverDesktop/spiderman.png',
    logoImg: '/src/assets/images/wWJ85k7/spiderman-logo.png',
    carouselThumb:
      '/src/assets/images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile:
      '/src/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 },
  },
  {
    id: 16,
    category: {
      card: 'Base game',
    },
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    coverImg: '/src/assets/images/CarouselCoverDesktop/fortnite.png',
    logoImg: '/src/assets/images/n7cSm73/fortnite-logo.png',
    carouselThumb:
      '/src/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: '/src/assets/images/CPyXG7n/uncharted-carousel-mobile.jpg',
    price: { regular: 64.99, discount: 18.99 },
  },
  {
    id: 17,
    category: {
      card: 'Base game',
    },
    name: 'Fall Guy',
    coverImg: '/src/assets/images/CarouselCoverDesktop/fall-guy.png',
    logoImg: '/src/assets/images/QF3t3jQ/fall-guy-logo.png',
    carouselThumb:
      '/src/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
    coverMobile: '/src/assets/images/BNm4v3M/fall-guys-carousel-mobile.jpg',
    price: { regular: 39.99, discount: 29.99 },
  },
  {
    id: 18,
    category: {
      card: 'Base game',
    },
    name: 'Fortnite',
    carouselThumb:
      '/src/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: '/src/assets/images/6X04C8f/fortnite-carousel-mobile.jpg',
    coverImg:
      '/src/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
    logoImg: '/src/assets/images/SyGvndD/fortnite-carousel-logo.png',
    price: { regular: 34.99, discount: 25.99 },
  },
  {
    id: 19,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: '/src/assets/images/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg:
      '/src/assets/images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
    carouselThumb:
      '/src/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile:
      '/src/assets/images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 36.99, discount: 24.99 },
  },
];

export default function DiscoverGames() {
  const cardsContainer = useRef();
  const screenWidth = useScreenWidth();
  const {
    initialState,
    reducer,
    handleClick,
    setReference,
    setCardsOnScreenWidthChange,
  } = useGamesLogics();

  const [
    { data, translateStyle, cardActive, cardsWidth, cardOnDeck },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'fetch', data: items, dataLength: items.length });
    setReference(dispatch);
  }, [setReference]);

  useEffect(() => {
    setCardsOnScreenWidthChange(screenWidth, cardsContainer.current);
  }, [screenWidth, setCardsOnScreenWidthChange]);

  return (
    <section className={styles.Games}>
      <CardsHeader headerTitle="Game on sale" />
      <GamesButton
        cardActive={cardActive}
        length={data.length - cardOnDeck}
        handleClick={(click) => handleClick(click, cardActive, cardOnDeck)}
      />
      <DiscoverGamesCards
        style={translateStyle}
        cardsWidth={cardsWidth}
        ref={cardsContainer}
        data={data}
      />
    </section>
  );
}
