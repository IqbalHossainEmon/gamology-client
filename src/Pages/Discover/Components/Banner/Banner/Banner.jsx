import { useEffect, useReducer, useState } from 'react';
import useScreenInfo from '../../../../../Hooks/useScreenInfo';
import BannerButtons from '../Components/BannerButtons/BannerButtons';
import InfoItems from '../Components/InfoItems/InfoItems';
import ItemCards from '../Components/ItemCards/ItemCards';
import Items from '../Components/Items/Items';

import useBannerLogics from '../useBannerLogics/useBannerLogics';
import styles from './Banner.module.css';

const items = [
  {
    id: 0,
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/CarouselInfo/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/CarouselCoverMobile/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 },
  },
  {
    id: 1,
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    coverImg: './images/CarouselCoverDesktop/fortnite.png',
    logoImg: './images/CarouselInfo/fortnite-logo.png',
    carouselThumb: './images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: './images/CarouselCoverMobile/uncharted-carousel-mobile.jpg',
    price: { regular: 49.99, discount: 15.99 },
  },
  {
    id: 2,
    name: 'Fall Guy',
    coverImg: './images/CarouselCoverDesktop/fall-guy.png',
    logoImg: './images/CarouselInfo/fall-guy-logo.png',
    carouselThumb: './images/CarouselCard/fall-guys-carousel-thumb.jpg',
    coverMobile: './images/CarouselCoverMobile/fall-guys-carousel-mobile.jpg',
    price: 'Free',
  },
  {
    id: 3,
    name: 'Fortnite',
    carouselThumb: './images/CarouselCard/fortnite-carousel-thumb-2.jpg',
    coverMobile: './images/CarouselCoverMobile/fortnite-carousel-mobile.jpg',
    coverImg: './images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
    logoImg: './images/CarouselInfo/fortnite-carousel-logo.png',
    price: 'Free',
  },
  {
    id: 4,
    name: 'A Plague Tale Requiem',
    logoImg: './images/CarouselInfo/a-plague-tale-requiem-logo.png',
    coverImg: './images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
    carouselThumb: './images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: './images/CarouselCoverMobile/a-plague-tale-requiem-carousel-mobile.jpg',
    price: 69,
  },
];

export default function Banner() {
  const [data, setData] = useState([]);
  const { reducer, initialState, reset, start, stop, activeBanner, isPause } = useBannerLogics();
  const [{ active, fadeIn, fadeOut, cardsPosition }, dispatch] = useReducer(reducer, initialState);
  const { screenWidth } = useScreenInfo();

  useEffect(() => {
    setData(items);
  }, []);

  const handleClick = (type) => {
    dispatch(type);
    reset();
  };

  useEffect(() => {
    start(dispatch);
    return () => stop();
  }, [start, stop]);

  return (
    <section className={styles.banner}>
      <div className={styles.bannerOverflow}>
        <Items
          screenWidth={screenWidth}
          cardsPosition={cardsPosition}
          bannerState={{ active, fadeOut, fadeIn }}
          data={data}
        />
        <InfoItems
          data={data}
          activeBanner={activeBanner}
          bannerState={{ active, fadeOut, fadeIn }}
        />
      </div>
      <BannerButtons handleClick={handleClick} />
      {screenWidth > 768 && (
        <ItemCards
          handleClick={handleClick}
          data={data}
          cardsPosition={cardsPosition}
          isPause={isPause}
        />
      )}
    </section>
  );
}
