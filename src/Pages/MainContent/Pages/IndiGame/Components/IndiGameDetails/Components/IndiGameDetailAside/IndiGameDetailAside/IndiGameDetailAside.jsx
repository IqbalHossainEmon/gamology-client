import { useEffect, useState } from 'react';
import IndiGameAsideBody from '../Components/IndiGameAsideBody/IndiGameAsideBody/IndiGameAsideBody';
import IndiGameAsideHeader from '../Components/IndiGameAsideHeader/IndiGameAsideHeader';
import styles from './IndiGameDetailAside.module.css';

const data = {
  name: "Marvel's Spider-Man Remastered",
  price: { regular: 59.99, discount: 29.99 },
  logo: '/assets/images/CarouselInfo/spiderman-logo.png',
  phoneLogo: '/assets/images/spiderman-logo-cover.avif',
  info: [
    { id: 1000, key: 'Developer', value: 'Insomniac Games, Nixxes Software' },
    { id: 1001, key: 'Publisher', value: 'PlayStation' },
    { id: 1010, key: 'Release Date', value: new Date('2022-07-12') },
    { id: 1011, key: 'Platform', value: 'both' },
  ],
};

export default function IndiGameDetailAside() {
  const [gameInfo, setGameInfo] = useState({});

  useEffect(() => {
    setGameInfo(data);
  }, []);

  return (
    <aside className={styles.individualGameDetailAside}>
      <div className={styles.asideContainer}>
        <IndiGameAsideHeader
          name={gameInfo.name}
          price={gameInfo.price}
          src={gameInfo.logo}
          phoneSrc={gameInfo.phoneLogo}
          rating={gameInfo.star}
        />
        {gameInfo.info && <IndiGameAsideBody info={gameInfo.info} />}
      </div>
    </aside>
  );
}
