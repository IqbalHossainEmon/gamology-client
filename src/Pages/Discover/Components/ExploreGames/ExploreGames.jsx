import { useEffect, useState } from 'react';
import useScreenWidth from '../../../../Hooks/useScreenWidth';
import styles from './ExploreGames.module.css';

const fetched = {
  heading: 'Explore Our Catalog',
  details: 'Browse by genre, features, price, and more to find your next favorite game.',
  backgroundDesktop: 'url(https://i.ibb.co/Yy799TQ/hitman.png)',
  backgroundPhone: 'url(https://i.ibb.co/nRpxDZ2/hitman-mobile.jpg)',
};

export default function ExploreGames() {
  const screenWidth = useScreenWidth();
  const [data, setData] = useState({});

  useEffect(() => {
    setData(fetched);
  }, []);

  return (
    <div
      className={styles.ExploreGames}
      style={
        screenWidth > 767
          ? { backgroundImage: data.backgroundDesktop }
          : { backgroundImage: data.backgroundPhone }
      }
    >
      <div className={styles.ExploreTexts}>
        <h4>{data.heading}</h4>
        <p>{data.details}</p>
        <a href="#d" type="button">
          Learn More
        </a>
      </div>
    </div>
  );
}
