import { useState } from 'react';
import useScreenWidth from '../../../../../Hooks/useScreenWidth';
import ChangeEventButtons from '../ChangeEventButtons/ChangeEventButtons';
import GamesColumn from '../GamesColumn/GamesColumn';
import styles from './EventGames.module.css';

const newGames = [
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
    price: 59,
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
    price: { regular: 59.99, discount: 29.99 },
  },
];

export default function EventGames() {
  const screenWidth = useScreenWidth();
  const [cardPosition, setCardPosition] = useState(0);
  const style = screenWidth < 767 ? { width: `${screenWidth}px` } : {};
  return (
    <div className={styles.EventGamesContainer}>
      <div
        className={styles.EventGames}
        style={screenWidth < 767 ? { translate: `-${cardPosition}00%` } : {}}
      >
        <GamesColumn
          cardPosition={cardPosition}
          style={style}
          games={newGames}
          border
          colNum={0}
          header="New Releases"
        />
        <GamesColumn
          cardPosition={cardPosition}
          style={style}
          games={newGames}
          border
          colNum={1}
          header="Top Rated"
        />
        <GamesColumn
          cardPosition={cardPosition}
          style={style}
          games={newGames}
          header="Comming Soon"
          colNum={2}
        />
      </div>
      {screenWidth < 765 && (
        <ChangeEventButtons cardPosition={cardPosition} setCardPosition={setCardPosition} />
      )}
    </div>
  );
}
