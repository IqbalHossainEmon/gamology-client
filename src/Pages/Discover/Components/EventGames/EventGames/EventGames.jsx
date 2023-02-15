import { useEffect, useState } from 'react';
import useScreenInfo from '../../../../../Hooks/useScreenInfo';
import ChangeEventButtons from '../Components/ChangeEventButtons/ChangeEventButtons';
import GamesColumn from '../Components/GamesColumn/GamesColumn';
import styles from './EventGames.module.css';

const newGames = [
  {
    id: 0,
    name: "Marvel's Spider-Man Remastered",
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    price: { regular: 59.99, discount: 29.99 },
  },
  {
    id: 1,
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    carouselThumb: './images/CarouselCard/fortnite-carousel-thumb.jpg',
    price: { regular: 49.99, discount: 15.99 },
  },
  {
    id: 2,
    name: 'Fall Guy',
    carouselThumb: './images/CarouselCard/fall-guys-carousel-thumb.jpg',
    price: 59,
  },
  {
    id: 3,
    name: 'Fortnite',
    carouselThumb: './images/CarouselCard/fortnite-carousel-thumb.jpg',
    price: 'Free',
  },
  {
    id: 4,
    name: 'A Plague Tale Requiem',
    carouselThumb: './images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
    price: { regular: 59.99, discount: 29.99 },
  },
];

export default function EventGames() {
  const { screenWidth, touchAble } = useScreenInfo();
  const [cardPosition, setCardPosition] = useState(0);
  const [style, setStyle] = useState({ width: `${screenWidth}px` });
  const [translateStyle, setTranslateStyle] = useState({
    translate: `-${cardPosition}00%`,
  });

  useEffect(() => {
    if (screenWidth < 768) {
      if (touchAble) {
        setTranslateStyle({
          translate: `-${cardPosition}00%`,
        });
      } else {
        setTranslateStyle({
          translate: `calc(-${cardPosition}00% - ${cardPosition} * 8px )`,
        });
      }
    } else {
      setTranslateStyle({
        translate: `0`,
      });
    }
  }, [touchAble, cardPosition, screenWidth]);

  useEffect(() => {
    if (screenWidth < 768) {
      setStyle({ width: `${screenWidth}px` });
    } else {
      setStyle({ width: `auto` });
    }
  }, [screenWidth]);

  return (
    <section className={styles.EventGamesContainer}>
      <ul className={styles.EventGames} style={translateStyle}>
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
      </ul>
      {screenWidth <= 768 && (
        <ChangeEventButtons cardPosition={cardPosition} setCardPosition={setCardPosition} />
      )}
    </section>
  );
}
