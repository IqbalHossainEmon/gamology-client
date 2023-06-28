import { useEffect, useState } from 'react';
import useScreenWidth from '../../../../Hooks/useScreenWidth';
import styles from './ExploreGames.module.css';

const fetched = {
  heading: 'Explore Our Catalog',
  details:
    'Browse by genre, features, price, and more to find your next favorite game.',
  backgroundDesktop: '/assets/images/hitmanBackgound/hitman.png',
  backgroundPhone: '/assets/images/hitmanBackgound/hitman-mobile.jpg',
};

export default function ExploreGames() {
  const screenWidth = useScreenWidth();
  const [data, setData] = useState({});

  useEffect(() => {
    setData(fetched);
  }, []);

  return (
    <section
      className={styles.ExploreGames}
      style={
        screenWidth >= 768
          ? { backgroundImage: `url(${fetched.backgroundDesktop})` }
          : { backgroundImage: `url(${fetched.backgroundPhone})` }
      }
    >
      <div className={styles.ExploreTexts}>
        <h4>{data.heading}</h4>
        <p>{data.details}</p>
        <a href="#d" type="button">
          Learn More
        </a>
      </div>
    </section>
  );
}
