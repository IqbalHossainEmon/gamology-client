import { useEffect, useRef, useState } from 'react';
import useScreenInfo from '../../../../../Hooks/useScreenInfo';
import Cards from '../Cards/Cards';
import CardsHeader from '../CardsHeader/CardsHeader';
import GamesButton from '../GamesButtons/GamesButtons';
import styles from './Games.module.css';

const data = [
  {
    id: 0,
    category: {
      card: 'Base game',
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: 'https://i.ibb.co/SRTnwG7/spiderman.png',
    logoImg: 'https://i.ibb.co/wWJ85k7/spiderman-logo.png',
    carouselThumb: 'https://i.ibb.co/KhyqrYM/spiderman-carousel-thumb.png',
    coverMobile: 'https://i.ibb.co/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 },
  },
  {
    id: 1,
    category: {
      card: 'Base game',
    },
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    coverImg: 'https://i.ibb.co/hM6WSCn/fortnite.png',
    logoImg: 'https://i.ibb.co/n7cSm73/fortnite-logo.png',
    carouselThumb: 'https://i.ibb.co/2WD5cNZ/fortnite-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/CPyXG7n/uncharted-carousel-mobile.jpg',
    price: { regular: 64.99, discount: 18.99 },
  },
  {
    id: 2,
    category: {
      card: 'Base game',
    },
    name: 'Fall Guy',
    coverImg: 'https://i.ibb.co/n8NVH98/fall-guy.png',
    logoImg: 'https://i.ibb.co/QF3t3jQ/fall-guy-logo.png',
    carouselThumb: 'https://i.ibb.co/vvQfMp7/fall-guys-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/BNm4v3M/fall-guys-carousel-mobile.jpg',
    price: { regular: 39.99, discount: 29.99 },
  },
  {
    id: 3,
    category: {
      card: 'Base game',
    },
    name: 'Fortnite',
    carouselThumb: 'https://i.ibb.co/J3Yhztk/fortnite-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/6X04C8f/fortnite-carousel-mobile.jpg',
    coverImg: 'https://i.ibb.co/yntdZwv/fortnite-carousel-desktop.jpg',
    logoImg: 'https://i.ibb.co/SyGvndD/fortnite-carousel-logo.png',
    price: { regular: 34.99, discount: 25.99 },
  },
  {
    id: 4,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: 'https://i.ibb.co/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg: 'https://i.ibb.co/9wkqcQ6/a-plague-tale-requiem-cover.jpg',
    carouselThumb: 'https://i.ibb.co/bB8Wsbc/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 36.99, discount: 24.99 },
  },
  {
    id: 5,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: 'https://i.ibb.co/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg: 'https://i.ibb.co/9wkqcQ6/a-plague-tale-requiem-cover.jpg',
    carouselThumb: 'https://i.ibb.co/bB8Wsbc/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 46.99, discount: 19.99 },
  },
  {
    id: 6,
    category: {
      card: 'Base game',
    },
    name: 'Fall Guy',
    coverImg: 'https://i.ibb.co/n8NVH98/fall-guy.png',
    logoImg: 'https://i.ibb.co/QF3t3jQ/fall-guy-logo.png',
    carouselThumb: 'https://i.ibb.co/vvQfMp7/fall-guys-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/BNm4v3M/fall-guys-carousel-mobile.jpg',
    price: { regular: 39.99, discount: 29.99 },
  },
  {
    id: 7,
    category: {
      card: 'Base game',
    },
    name: 'Fortnite',
    carouselThumb: 'https://i.ibb.co/J3Yhztk/fortnite-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/6X04C8f/fortnite-carousel-mobile.jpg',
    coverImg: 'https://i.ibb.co/yntdZwv/fortnite-carousel-desktop.jpg',
    logoImg: 'https://i.ibb.co/SyGvndD/fortnite-carousel-logo.png',
    price: { regular: 34.99, discount: 25.99 },
  },
  {
    id: 8,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: 'https://i.ibb.co/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg: 'https://i.ibb.co/9wkqcQ6/a-plague-tale-requiem-cover.jpg',
    carouselThumb: 'https://i.ibb.co/bB8Wsbc/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 36.99, discount: 24.99 },
  },
  {
    id: 9,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: 'https://i.ibb.co/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg: 'https://i.ibb.co/9wkqcQ6/a-plague-tale-requiem-cover.jpg',
    carouselThumb: 'https://i.ibb.co/bB8Wsbc/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 46.99, discount: 19.99 },
  },
  {
    id: 10,
    category: {
      card: 'Base game',
    },
    name: 'Fall Guy',
    coverImg: 'https://i.ibb.co/n8NVH98/fall-guy.png',
    logoImg: 'https://i.ibb.co/QF3t3jQ/fall-guy-logo.png',
    carouselThumb: 'https://i.ibb.co/vvQfMp7/fall-guys-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/BNm4v3M/fall-guys-carousel-mobile.jpg',
    price: { regular: 39.99, discount: 29.99 },
  },
  {
    id: 11,
    category: {
      card: 'Base game',
    },
    name: 'Fortnite',
    carouselThumb: 'https://i.ibb.co/J3Yhztk/fortnite-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/6X04C8f/fortnite-carousel-mobile.jpg',
    coverImg: 'https://i.ibb.co/yntdZwv/fortnite-carousel-desktop.jpg',
    logoImg: 'https://i.ibb.co/SyGvndD/fortnite-carousel-logo.png',
    price: { regular: 34.99, discount: 25.99 },
  },
  {
    id: 12,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: 'https://i.ibb.co/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg: 'https://i.ibb.co/9wkqcQ6/a-plague-tale-requiem-cover.jpg',
    carouselThumb: 'https://i.ibb.co/bB8Wsbc/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 36.99, discount: 24.99 },
  },
  {
    id: 13,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: 'https://i.ibb.co/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg: 'https://i.ibb.co/9wkqcQ6/a-plague-tale-requiem-cover.jpg',
    carouselThumb: 'https://i.ibb.co/bB8Wsbc/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 46.99, discount: 19.99 },
  },
  {
    id: 14,
    category: {
      card: 'Base game',
    },
    name: 'Fall Guy',
    coverImg: 'https://i.ibb.co/n8NVH98/fall-guy.png',
    logoImg: 'https://i.ibb.co/QF3t3jQ/fall-guy-logo.png',
    carouselThumb: 'https://i.ibb.co/vvQfMp7/fall-guys-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/BNm4v3M/fall-guys-carousel-mobile.jpg',
    price: { regular: 39.99, discount: 29.99 },
  },
  {
    id: 15,
    category: {
      card: 'Base game',
    },
    name: 'Fortnite',
    carouselThumb: 'https://i.ibb.co/J3Yhztk/fortnite-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/6X04C8f/fortnite-carousel-mobile.jpg',
    coverImg: 'https://i.ibb.co/yntdZwv/fortnite-carousel-desktop.jpg',
    logoImg: 'https://i.ibb.co/SyGvndD/fortnite-carousel-logo.png',
    price: { regular: 34.99, discount: 25.99 },
  },
  {
    id: 16,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: 'https://i.ibb.co/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg: 'https://i.ibb.co/9wkqcQ6/a-plague-tale-requiem-cover.jpg',
    carouselThumb: 'https://i.ibb.co/bB8Wsbc/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 36.99, discount: 24.99 },
  },
  {
    id: 17,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: 'https://i.ibb.co/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg: 'https://i.ibb.co/9wkqcQ6/a-plague-tale-requiem-cover.jpg',
    carouselThumb: 'https://i.ibb.co/bB8Wsbc/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 46.99, discount: 19.99 },
  },
  {
    id: 18,
    category: {
      card: 'Base game',
    },
    name: 'A Plague Tale Requiem',
    logoImg: 'https://i.ibb.co/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg: 'https://i.ibb.co/9wkqcQ6/a-plague-tale-requiem-cover.jpg',
    carouselThumb: 'https://i.ibb.co/bB8Wsbc/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: { regular: 46.99, discount: 19.99 },
  },
];

export default function Games() {
  const [cardPosition, setCardPosition] = useState(0);
  const { screenWidth } = useScreenInfo();
  const [cardsInOneDeck, setCardsInOneDeck] = useState();
  const [cardMoveNumbers, setCardMoveNumbers] = useState(0);
  const [cardsWidth, setCardsWidth] = useState('0px');
  const [translate, setTranslate] = useState('calc(0vw)');
  const [btnState, setBtnState] = useState({ next: true, prev: false });
  const dataLength = useRef(data.length);

  useEffect(() => {
    if (cardPosition === cardMoveNumbers) {
      setTranslate(`calc(${-dataLength.current + cardsInOneDeck} * ${cardsWidth})`);
    } else {
      setTranslate(`calc(${cardPosition * cardsInOneDeck} * ${cardsWidth})`);
    }
    if (cardPosition === cardMoveNumbers) {
      setBtnState({ prev: true, next: false });
    } else if (cardPosition === 0) {
      setBtnState({ prev: false, next: true });
    } else {
      setBtnState({ prev: false, next: false });
    }
  }, [cardPosition, translate, screenWidth, cardsInOneDeck, cardMoveNumbers, cardsWidth]);

  useEffect(() => {
    if (screenWidth >= 2134) {
      setCardsInOneDeck(6);
      setCardsWidth(`266.666667px`);
    } else if (screenWidth >= 1600 && screenWidth <= 2133) {
      setCardsInOneDeck(6);
      setCardsWidth(`calc(75vw / ${cardsInOneDeck})`);
    } else if (screenWidth >= 1024 && screenWidth <= 1599) {
      setCardsInOneDeck(5);
      setCardsWidth(`calc(75vw / ${cardsInOneDeck})`);
    } else if (screenWidth >= 769 && screenWidth <= 1023) {
      setCardsInOneDeck(4);
      setCardsWidth(`calc(97vw / ${cardsInOneDeck})`);
    } else if (screenWidth >= 592 && screenWidth <= 768) {
      setCardsInOneDeck(3);
      setCardsWidth(`calc(98vw / ${cardsInOneDeck})`);
    } else if (screenWidth >= 326 && screenWidth <= 591) {
      setCardsInOneDeck(2);
      setCardsWidth(` calc(98vw / ${cardsInOneDeck})`);
    } else if (screenWidth <= 325) {
      setCardsInOneDeck(1);
      setCardsWidth(`98vw`);
    }
    setCardMoveNumbers(-Math.floor(dataLength.current / cardsInOneDeck));
    if (dataLength.current % cardsInOneDeck === 0) {
      setCardMoveNumbers((prev) => prev + 1);
    }
  }, [screenWidth, cardsInOneDeck]);

  // reset cards position wih screen width width change
  useEffect(() => {
    setCardPosition(0);
  }, [screenWidth]);

  const handleClick = (click) => {
    if (click === 'next' && cardPosition < 0) {
      setCardPosition((prevState) => prevState + 1);
    } else if (click === 'prev' && cardPosition > cardMoveNumbers) {
      setCardPosition((prevState) => prevState - 1);
    }
  };

  return (
    <div className={styles.Games}>
      <CardsHeader headerTitle="Game on sale" />
      <GamesButton btnState={btnState} handleClick={handleClick} />
      <Cards data={data} screenWidth={screenWidth} translate={translate} />
    </div>
  );
}
