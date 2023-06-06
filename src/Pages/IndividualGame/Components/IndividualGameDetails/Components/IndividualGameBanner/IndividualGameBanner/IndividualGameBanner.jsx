import { useEffect, useState } from 'react';
import IndividualGameBannerItems from '../Components/IndividualGameBannerItems/IndividualGameBannerItems';
import styles from './IndividualGameBanner.module.css';

const data = [
  {
    id: 0,
  },
];

export default function IndividualGameBanner() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);

  return (
    <section className={styles.banner}>
      <IndividualGameBannerItems data={items} />
    </section>
  );
}
