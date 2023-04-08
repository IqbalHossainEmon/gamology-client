import { useEffect, useReducer, useState } from 'react';
import useScreenWidth from '../../../../../Hooks/useScreenWidth';
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
    coverImg: '/src/assets/images/CarouselCoverDesktop/spiderman.png',
    logoImg: '/src/assets/images/CarouselInfo/spiderman-logo.png',
    carouselThumb: '/src/assets/images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: '/src/assets/images/CarouselCoverMobile/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 },
  },
  {
    id: 1,
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    coverImg: '/src/assets/images/CarouselCoverDesktop/fortnite.png',
    logoImg: '/src/assets/images/CarouselInfo/fortnite-logo.png',
    carouselThumb: '/src/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: '/src/assets/images/CarouselCoverMobile/uncharted-carousel-mobile.jpg',
    price: { regular: 49.99, discount: 15.99 },
  },
  {
    id: 2,
    name: 'Fall Guy',
    coverImg: '/src/assets/images/CarouselCoverDesktop/fall-guy.png',
    logoImg: '/src/assets/images/CarouselInfo/fall-guy-logo.png',
    carouselThumb: '/src/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
    coverMobile: '/src/assets/images/CarouselCoverMobile/fall-guys-carousel-mobile.jpg',
    price: 'Free',
  },
  {
    id: 3,
    name: 'Fortnite',
    carouselThumb: '/src/assets/images/CarouselCard/fortnite-carousel-thumb-2.jpg',
    coverMobile: '/src/assets/images/CarouselCoverMobile/fortnite-carousel-mobile.jpg',
    coverImg: '/src/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
    logoImg: '/src/assets/images/CarouselInfo/fortnite-carousel-logo.png',
    price: 'Free',
  },
  {
    id: 4,
    name: 'A Plague Tale Requiem',
    logoImg: '/src/assets/images/CarouselInfo/a-plague-tale-requiem-logo.png',
    coverImg: '/src/assets/images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
    carouselThumb: '/src/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
    coverMobile: '/src/assets/images/CarouselCoverMobile/a-plague-tale-requiem-carousel-mobile.jpg',
    price: 69,
  },
];

export default function Banner() {
  const [data, setData] = useState([]);
  const { reducer, initialState, reset, start, stop, activeBanner, isPause } = useBannerLogics();
  const [{ active, fadeIn, fadeOut, cardsPosition }, dispatch] = useReducer(reducer, initialState);
  const screenWidth = useScreenWidth();

  useEffect(() => {
    setData(items);
  }, []);

  const handleClick = (type) => {
    dispatch(type);
    reset();
  };

  useEffect(() => {
    start(dispatch);
    return stop;
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
