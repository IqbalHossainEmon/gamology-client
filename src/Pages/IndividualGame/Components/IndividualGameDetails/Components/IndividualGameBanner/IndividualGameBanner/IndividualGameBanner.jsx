import { useEffect, useState } from 'react';
import IndividualGameBannerItems from '../Components/IndividualGameBannerItems/IndividualGameBannerItems';
import styles from './IndividualGameBanner.module.css';

const data = [
  {
    id: 0,
    type: 'video',
    cover: `/assets/images/IndividualGameBanner/spider-carousel-v-1.mp4`,
    thumb: `/assets/images/IndividualGameBannerThumb/spider-carousel-thumb-v-1.avif`,
  },
  {
    id: 1,
    type: 'video',
    cover: `/assets/images/IndividualGameBanner/spider-carousel-v-2.mp4`,
    thumb: `/assets/images/IndividualGameBannerThumb/spider-carousel-thumb-v-2.avif`,
  },
  {
    id: 2,
    type: 'video',
    cover: `/assets/images/IndividualGameBanner/spider-carousel-v-3.mp4`,
    thumb: `/assets/images/IndividualGameBannerThumb/spider-carousel-thumb-v-3.avif`,
  },
  {
    id: 3,
    type: 'photo',
    cover: `/assets/images/IndividualGameBanner/spider-carousel-1.jpg`,
    thumb: `/assets/images/IndividualGameBannerThumb/spider-carousel-thumb-1.avif`,
  },
  {
    id: 4,
    type: 'photo',
    cover: `/assets/images/IndividualGameBanner/spider-carousel-2.jpg`,
    thumb: `/assets/images/IndividualGameBannerThumb/spider-carousel-thumb-2.avif`,
  },
  {
    id: 5,
    type: 'photo',
    cover: `/assets/images/IndividualGameBanner/spider-carousel-3.jpg`,
    thumb: `/assets/images/IndividualGameBannerThumb/spider-carousel-thumb-3.avif`,
  },
  {
    id: 6,
    type: 'photo',
    cover: `/assets/images/IndividualGameBanner/spider-carousel-4.jpg`,
    thumb: `/assets/images/IndividualGameBannerThumb/spider-carousel-thumb-4.avif`,
  },
  {
    id: 7,
    type: 'photo',
    cover: `/assets/images/IndividualGameBanner/spider-carousel-5.jpg`,
    thumb: `/assets/images/IndividualGameBannerThumb/spider-carousel-thumb-5.avif`,
  },
  {
    id: 8,
    type: 'photo',
    cover: `/assets/images/IndividualGameBanner/spider-carousel-6.jpg`,
    thumb: `/assets/images/IndividualGameBannerThumb/spider-carousel-thumb-6.avif`,
  },
  {
    id: 9,
    type: 'photo',
    cover: `/assets/images/IndividualGameBanner/spider-carousel-7.jpg`,
    thumb: `/assets/images/IndividualGameBannerThumb/spider-carousel-thumb-7.avif`,
  },
  {
    id: 10,
    type: 'photo',
    cover: `/assets/images/IndividualGameBanner/spider-carousel-8.jpg`,
    thumb: `/assets/images/IndividualGameBannerThumb/spider-carousel-thumb-8.avif`,
  },
  {
    id: 11,
    type: 'photo',
    cover: `/assets/images/IndividualGameBanner/spider-carousel-9.jpg`,
    thumb: `/assets/images/IndividualGameBannerThumb/spider-carousel-thumb-9.avif`,
  },
];

export default function IndividualGameBanner() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);

  return (
    <section className={styles.banner}>
      <IndividualGameBannerItems items={items} />
    </section>
  );
}
