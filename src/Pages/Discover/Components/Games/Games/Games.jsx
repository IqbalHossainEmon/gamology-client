import { useCallback, useEffect, useReducer, useRef } from 'react';
import useScreenInfo from '../../../../../Hooks/useScreenInfo';
import Cards from '../Components/Cards/Cards';
import CardsHeader from '../Components/CardsHeader/CardsHeader';
import GamesButton from '../Components/GamesButtons/GamesButtons';
import useGamesLogics from '../useGamesLogics/useGamesLogics';
import styles from './Games.module.css';

const items = [
  {
    id: 0,
    category: {
      card: 'Base game',
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 },
  },
  {
    id: 1,
    category: {
      card: 'Base game',
    },
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    coverImg: './images/CarouselCoverDesktop/fortnite.png',
    logoImg: './images/n7cSm73/fortnite-logo.png',
    carouselThumb: './images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: './images/CPyXG7n/uncharted-carousel-mobile.jpg',
    price: { regular: 64.99, discount: 18.99 },
  },
  {
    id: 2,
    category: {
      card: 'Base game',
    },
    name: 'Fall Guy',
    coverImg: './images/CarouselCoverDesktop/fall-guy.png',
    logoImg: './images/QF3t3jQ/fall-guy-logo.png',
    carouselThumb: './images/CarouselCard/fall-guys-carousel-thumb.jpg',
    coverMobile: './images/BNm4v3M/fall-guys-carousel-mobile.jpg',
    price: { regular: 39.99, discount: 29.99 },
  },
  {
    id: 3,
    category: {
      card: 'Base game',
    },
    name: 'Fortnite',
    carouselThumb: './images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: './images/6X04C8f/fortnite-carousel-mobile.jpg',
    coverImg: './images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
    logoImg: './images/SyGvndD/fortnite-carousel-logo.png',
    price: { regular: 34.99, discount: 25.99 },
  },
  {
    id: 4,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: './images/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg: './images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
    carouselThumb: './images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: './images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 36.99, discount: 24.99 },
  },
  {
    id: 5,
    category: {
      card: 'Base game',
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 },
  },
  {
    id: 6,
    category: {
      card: 'Base game',
    },
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    coverImg: './images/CarouselCoverDesktop/fortnite.png',
    logoImg: './images/n7cSm73/fortnite-logo.png',
    carouselThumb: './images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: './images/CPyXG7n/uncharted-carousel-mobile.jpg',
    price: { regular: 64.99, discount: 18.99 },
  },
  {
    id: 7,
    category: {
      card: 'Base game',
    },
    name: 'Fall Guy',
    coverImg: './images/CarouselCoverDesktop/fall-guy.png',
    logoImg: './images/QF3t3jQ/fall-guy-logo.png',
    carouselThumb: './images/CarouselCard/fall-guys-carousel-thumb.jpg',
    coverMobile: './images/BNm4v3M/fall-guys-carousel-mobile.jpg',
    price: { regular: 39.99, discount: 29.99 },
  },
  {
    id: 8,
    category: {
      card: 'Base game',
    },
    name: 'Fortnite',
    carouselThumb: './images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: './images/6X04C8f/fortnite-carousel-mobile.jpg',
    coverImg: './images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
    logoImg: './images/SyGvndD/fortnite-carousel-logo.png',
    price: { regular: 34.99, discount: 25.99 },
  },
  {
    id: 9,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: './images/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg: './images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
    carouselThumb: './images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: './images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 36.99, discount: 24.99 },
  },
  {
    id: 10,
    category: {
      card: 'Base game',
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 },
  },
  {
    id: 11,
    category: {
      card: 'Base game',
    },
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    coverImg: './images/CarouselCoverDesktop/fortnite.png',
    logoImg: './images/n7cSm73/fortnite-logo.png',
    carouselThumb: './images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: './images/CPyXG7n/uncharted-carousel-mobile.jpg',
    price: { regular: 64.99, discount: 18.99 },
  },
  {
    id: 12,
    category: {
      card: 'Base game',
    },
    name: 'Fall Guy',
    coverImg: './images/CarouselCoverDesktop/fall-guy.png',
    logoImg: './images/QF3t3jQ/fall-guy-logo.png',
    carouselThumb: './images/CarouselCard/fall-guys-carousel-thumb.jpg',
    coverMobile: './images/BNm4v3M/fall-guys-carousel-mobile.jpg',
    price: { regular: 39.99, discount: 29.99 },
  },
  {
    id: 13,
    category: {
      card: 'Base game',
    },
    name: 'Fortnite',
    carouselThumb: './images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: './images/6X04C8f/fortnite-carousel-mobile.jpg',
    coverImg: './images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
    logoImg: './images/SyGvndD/fortnite-carousel-logo.png',
    price: { regular: 34.99, discount: 25.99 },
  },
  {
    id: 14,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: './images/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg: './images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
    carouselThumb: './images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: './images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 36.99, discount: 24.99 },
  },
  {
    id: 15,
    category: {
      card: 'Base game',
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 },
  },
  {
    id: 16,
    category: {
      card: 'Base game',
    },
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    coverImg: './images/CarouselCoverDesktop/fortnite.png',
    logoImg: './images/n7cSm73/fortnite-logo.png',
    carouselThumb: './images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: './images/CPyXG7n/uncharted-carousel-mobile.jpg',
    price: { regular: 64.99, discount: 18.99 },
  },
  {
    id: 17,
    category: {
      card: 'Base game',
    },
    name: 'Fall Guy',
    coverImg: './images/CarouselCoverDesktop/fall-guy.png',
    logoImg: './images/QF3t3jQ/fall-guy-logo.png',
    carouselThumb: './images/CarouselCard/fall-guys-carousel-thumb.jpg',
    coverMobile: './images/BNm4v3M/fall-guys-carousel-mobile.jpg',
    price: { regular: 39.99, discount: 29.99 },
  },
  {
    id: 18,
    category: {
      card: 'Base game',
    },
    name: 'Fortnite',
    carouselThumb: './images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: './images/6X04C8f/fortnite-carousel-mobile.jpg',
    coverImg: './images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
    logoImg: './images/SyGvndD/fortnite-carousel-logo.png',
    price: { regular: 34.99, discount: 25.99 },
  },
  {
    id: 19,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: './images/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg: './images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
    carouselThumb: './images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: './images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 36.99, discount: 24.99 },
  },
];

export default function Games() {
  const cardsContainer = useRef();
  const { screenWidth } = useScreenInfo();
  const { initialState, reducer } = useGamesLogics();
  const timerId = useRef();

  const [{ data, translateStyle, cardActive, cardsWidth, cardOnDeck }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: 'fetch', data: items, dataLength: items.length });
  }, []);

  const findCardsContainerWidth = useCallback((element) => {
    if (element) {
      return window.getComputedStyle
        ? parseInt(getComputedStyle(element, null).getPropertyValue('width').slice(0, -2), 10)
        : element.clientWidth;
    }
    return 0;
  }, []);

  useEffect(() => {
    let cardOnOneDeck;
    if (screenWidth >= 1600) {
      cardOnOneDeck = 6;
    } else if (screenWidth >= 1024 && screenWidth <= 1599) {
      cardOnOneDeck = 5;
    } else if (screenWidth >= 769 && screenWidth <= 1023) {
      cardOnOneDeck = 4;
    } else if (screenWidth >= 592 && screenWidth <= 768) {
      cardOnOneDeck = 3;
    } else if (screenWidth >= 326 && screenWidth <= 591) {
      cardOnOneDeck = 2;
    } else if (screenWidth <= 325) {
      cardOnOneDeck = 1;
    }

    dispatch({
      type: 'screenWidthChange',
      width: findCardsContainerWidth(cardsContainer.current) / cardOnOneDeck,
      cardOnDeck: cardOnOneDeck,
    });
  }, [findCardsContainerWidth, screenWidth]);

  const timerFunction = () => {
    timerId.current = setTimeout(() => {
      dispatch({ type: 'transitionStop' });
      timerId.current = null;
      clearTimeout(timerId.current);
    }, 400);
  };

  const handleClick = (click) => {
    if (click === 'next') {
      dispatch({ type: 'next', nextActiveCard: cardActive - cardOnDeck });
    } else if (click === 'prev') {
      dispatch({ type: 'prev', nextActiveCard: cardActive + cardOnDeck });
    }

    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
      timerFunction();
    } else {
      timerFunction();
    }
  };

  return (
    <section className={styles.Games}>
      <CardsHeader headerTitle="Game on sale" />
      <GamesButton
        cardActive={cardActive}
        length={data.length - cardOnDeck}
        handleClick={handleClick}
      />
      <Cards style={translateStyle} cardsWidth={cardsWidth} ref={cardsContainer} data={data} />
    </section>
  );
}
