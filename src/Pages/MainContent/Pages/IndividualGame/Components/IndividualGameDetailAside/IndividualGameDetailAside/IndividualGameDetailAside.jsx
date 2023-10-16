import { useEffect, useState } from 'react';
import IndividualGameAsideBody from '../Components/IndividualGameAsideBody/IndividualGameAsideBody';
import IndividualGameAsideHeader from '../Components/IndividualGameAsideHeader/IndividualGameAsideHeader';
import styles from './IndividualGameDetailAside.module.css';

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

export default function IndividualGameDetailAside({ reviewContainerRef }) {
  const [gameInfo, setGameInfo] = useState({});
  const [paddingBottom, setPaddingBottom] = useState(90);

  useEffect(() => {
    setGameInfo(data);
  }, []);

  useEffect(() => {
    setPaddingBottom(
      90 + (reviewContainerRef.current?.clientHeight ? reviewContainerRef.current.clientHeight : 0)
    );
  }, [reviewContainerRef, reviewContainerRef.current?.clientHeight]);

  return (
    <aside style={{ paddingBottom }} className={styles.individualGameDetailAside}>
      <div className={styles.asideContainer}>
        <IndividualGameAsideHeader
          name={gameInfo.name}
          price={gameInfo.price}
          src={gameInfo.logo}
          phoneSrc={gameInfo.phoneLogo}
          rating={gameInfo.star}
        />
        {gameInfo.info && <IndividualGameAsideBody info={gameInfo.info} />}
      </div>
    </aside>
  );
}
