import { useRef } from 'react';
import FreeGame from '../FreeGame/FreeGame';
import styles from './FreeGames.module.css';

const data = [
  {
    id: 100,
    category: {
      card: 'Base game',
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
    logoImg: '/assets/images/CarouselInfo/spiderman-logo.png',
    carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: '/assets/images/CarouselCoverMobile/spider-man-remaster-carousel-mobile.png',
    price: 'Comming soon',
    saleTill: [
      [12, 12, 2022],
      [31, 12, 2025],
    ],
  },
  {
    id: 101,
    category: {
      card: 'Base game',
    },
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
    logoImg: '/assets/images/CarouselInfo/fortnite-logo.png',
    carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: '/assets/images/CarouselCoverMobile/uncharted-carousel-mobile.jpg',
    price: 'Free',
    saleTill: [
      [2, 11, 2022],
      [24, 12, 2025],
    ],
  },
  {
    id: 110,
    category: {
      card: 'Base game',
    },
    name: 'Fall Guy',
    coverImg: '/assets/images/CarouselCoverDesktop/fall-guy.png',
    logoImg: '/assets/images/CarouselInfo/fall-guy-logo.png',
    carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
    coverMobile: '/assets/images/CarouselCoverMobile/fall-guys-carousel-mobile.jpg',
    price: 'Free',
    saleTill: [
      [11, 12, 2024],
      [15, 12, 2025],
    ],
  },
  {
    id: 111,
    category: {
      card: 'Base game',
    },
    name: 'Fortnite',
    carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: '/assets/images/CarouselCoverMobile/fortnite-carousel-mobile.jpg',
    coverImg: '/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
    logoImg: '/assets/images/CarouselInfo/fortnite-carousel-logo.png',
    price: 'Free',
    saleTill: [
      [1, 11, 2024],
      [23, 12, 2025],
    ],
  },
];

export default function FreeGames() {
  const dataLength = useRef(data.length);

  const date = useRef(new Date());
  const today = useRef([date.current.getDate(), date.current.getMonth() + 1, date.current.getFullYear()]);

  return (
    <section className={styles.freeGames}>
      <div className={styles.header}>
        <img src="/assets/images/gift.png" alt="gift" />
        <h3>Free games</h3>
      </div>
      <div className={styles.games}>
        {data.map(game => (
          <FreeGame key={game.id} length={dataLength.current} data={game} today={today.current} />
        ))}
      </div>
    </section>
  );
}
