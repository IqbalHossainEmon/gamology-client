import { useEffect, useReducer } from 'react';
import useScreenWidth from '../../../../../Hooks/useScreenWidth';
import BannerButtons from '../BannerButtons/BannerButtons';
import InfoItems from '../InfoItems/InfoItems';
import ItemCards from '../ItemCards/ItemCards';
import Items from '../Items/Items';
import useBannerState from '../useBannerState/useBannerState';
import styles from './Banner.module.css';

const data = [
  {
    id: 0,
    name: "Marvel's Spider-Man Remastered",
    coverImg: 'https://i.ibb.co/SRTnwG7/spiderman.png',
    logoImg: 'https://i.ibb.co/wWJ85k7/spiderman-logo.png',
    carouselThumb: 'https://i.ibb.co/KhyqrYM/spiderman-carousel-thumb.png',
    coverMobile: 'https://i.ibb.co/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 },
  },
  {
    id: 1,
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    coverImg: 'https://i.ibb.co/hM6WSCn/fortnite.png',
    logoImg: 'https://i.ibb.co/n7cSm73/fortnite-logo.png',
    carouselThumb: 'https://i.ibb.co/2WD5cNZ/fortnite-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/CPyXG7n/uncharted-carousel-mobile.jpg',
    price: { regular: 49.99, discount: 15.99 },
  },
  {
    id: 2,
    name: 'Fall Guy',
    coverImg: 'https://i.ibb.co/n8NVH98/fall-guy.png',
    logoImg: 'https://i.ibb.co/QF3t3jQ/fall-guy-logo.png',
    carouselThumb: 'https://i.ibb.co/vvQfMp7/fall-guys-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/BNm4v3M/fall-guys-carousel-mobile.jpg',
    price: 'Free',
  },
  {
    id: 3,
    name: 'Fortnite',
    carouselThumb: 'https://i.ibb.co/J3Yhztk/fortnite-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/6X04C8f/fortnite-carousel-mobile.jpg',
    coverImg: 'https://i.ibb.co/yntdZwv/fortnite-carousel-desktop.jpg',
    logoImg: 'https://i.ibb.co/SyGvndD/fortnite-carousel-logo.png',
    price: 'Free',
  },
  {
    id: 4,
    name: 'A Plague Tale Requiem',
    logoImg: 'https://i.ibb.co/D4XXzTW/a-plague-tale-requiem-logo.png',
    coverImg: 'https://i.ibb.co/9wkqcQ6/a-plague-tale-requiem-cover.jpg',
    carouselThumb: 'https://i.ibb.co/bB8Wsbc/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: 'https://i.ibb.co/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
    price: 69,
  },
];

export default function Banner() {
  const { initalState, reducer } = useBannerState(data.length);
  const [{ active, fadeIn, fadeOut, cardsPosition }, dispatch] = useReducer(reducer, initalState);
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: 'next' });
    }, 8500);
    return () => clearInterval(intervalId);
  }, [active]);
  const screenWidth = useScreenWidth();
  return (
    <div className={styles.banner}>
      <div className={styles.bannerOverflow}>
        <Items
          cardsPosition={cardsPosition}
          bannerState={{ active, fadeOut, fadeIn }}
          data={data}
        />
        <InfoItems data={data} bannerState={{ active, fadeOut, fadeIn }} />
      </div>
      <BannerButtons handleClick={dispatch} />
      {screenWidth > 765 && (
        <ItemCards handleClick={dispatch} data={data} cardsPosition={cardsPosition} />
      )}
    </div>
  );
}
