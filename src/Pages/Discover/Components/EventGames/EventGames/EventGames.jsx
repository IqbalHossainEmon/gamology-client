import { useState } from 'react';
import useScreenWidth from '../../../../../Hooks/useScreenWidth';
import ChangeEventButtons from '../Components/ChangeEventButtons/ChangeEventButtons';
import GamesColumn from '../Components/GamesColumn/GamesColumn';
import styles from './EventGames.module.css';

const newGames = [
  {
    id: 0,
    name: "Marvel's Spider-Man Remastered",
    carouselThumb:
      '/src/assets/images/CarouselCard/spiderman-carousel-thumb.png',
    price: { regular: 59.99, discount: 29.99 },
  },
  {
    id: 1,
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    carouselThumb:
      '/src/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
    price: { regular: 49.99, discount: 15.99 },
  },
  {
    id: 2,
    name: 'Fall Guy',
    carouselThumb:
      '/src/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
    price: 59,
  },
  {
    id: 3,
    name: 'Fortnite',
    carouselThumb:
      '/src/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
    price: 'Free',
  },
  {
    id: 4,
    name: 'A Plague Tale Requiem',
    carouselThumb:
      '/src/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
    price: { regular: 59.99, discount: 29.99 },
  },
];

export default function EventGames() {
  const screenWidth = useScreenWidth();
  const [cardPosition, setCardPosition] = useState(0);

  return (
    <section className={styles.EventGamesContainer}>
      <ul
        className={styles.EventGames}
        {...(screenWidth < 768 && {
          style: { translate: `-${cardPosition * screenWidth}px` },
        })}
      >
        <GamesColumn
          cardPosition={cardPosition}
          screenWidth={screenWidth}
          games={newGames}
          border
          colNum={0}
          header="New Releases"
        />
        <GamesColumn
          cardPosition={cardPosition}
          screenWidth={screenWidth}
          games={newGames}
          border
          colNum={1}
          header="Top Rated"
        />
        <GamesColumn
          cardPosition={cardPosition}
          screenWidth={screenWidth}
          games={newGames}
          header="Comming Soon"
          colNum={2}
        />
      </ul>
      {screenWidth <= 768 && (
        <ChangeEventButtons
          cardPosition={cardPosition}
          setCardPosition={setCardPosition}
        />
      )}
    </section>
  );
}
