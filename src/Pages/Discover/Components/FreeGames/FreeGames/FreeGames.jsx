import { useEffect, useRef, useState } from 'react';
import useScreenWidth from '../../../../../Hooks/useScreenWidth';
import FreeGame from '../FreeGame/FreeGame';
import styles from './FreeGames.module.css';

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
    price: 'Comming soon',
    saleTill: [
      [1, 12, 2022],
      [3, 12, 2022],
    ],
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
    price: 'Free',
    saleTill: [
      [2, 11, 2022],
      [3, 12, 2022],
    ],
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
    price: 'Free',
    saleTill: [
      [1, 11, 2022],
      [3, 12, 2022],
    ],
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
    price: 'Free',
    saleTill: [
      [1, 11, 2022],
      [3, 12, 2022],
    ],
  },
];

export default function FreeGames() {
  const dataLength = useRef(data.length);
  const [gameStyle, setGameStyle] = useState({
    gridTemplateColumns: `repeat(${dataLength.current}, 1fr)`,
  });
  const screenWidth = useScreenWidth();
  const date = useRef(new Date());
  const today = useRef([
    date.current.getDate(),
    date.current.getMonth() + 1,
    date.current.getFullYear(),
  ]);

  useEffect(() => {
    // How many cards to show depend on total games numbers
    if (screenWidth < 768 && dataLength.current % 2 === 0) {
      setGameStyle({
        gridTemplateColumns: `repeat(2, 1fr)`,
      });
    } else if (screenWidth < 768) {
      setGameStyle({
        gridTemplateColumns: `repeat(1, 1fr)`,
      });
    } else {
      setGameStyle({
        gridTemplateColumns: `repeat(${dataLength.current}, 1fr)`,
      });
    }
  }, [screenWidth]);

  return (
    <div className={styles.freeGames}>
      <div className={styles.header}>
        <img src="https://i.ibb.co/QXZH4W7/gift.png" alt="gift" />
        <h3>Free games</h3>
      </div>
      <div className={styles.games} style={gameStyle}>
        {data.map((game) => (
          <FreeGame
            key={game.id}
            screenWidth={screenWidth}
            length={dataLength.current}
            data={game}
            today={today.current}
          />
        ))}
      </div>
    </div>
  );
}
