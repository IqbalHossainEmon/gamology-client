import Card from '../../../../Shared/Card/Card';
import styles from './GameCards.module.css';

const items = [
  {
    id: 0,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 1,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: 59.99
  },
  {
    id: 2,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: 'Free'
  },
  {
    id: 3,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 4,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 5,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 6,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 7,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 8,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 9,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 10,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 11,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 12,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 13,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 14,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 15,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 16,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 17,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },
  {
    id: 18,
    category: {
      card: 'Base game'
    },
    name: "Marvel's Spider-Man Remastered",
    coverImg: './images/CarouselCoverDesktop/spiderman.png',
    logoImg: './images/wWJ85k7/spiderman-logo.png',
    carouselThumb: './images/CarouselCard/spiderman-carousel-thumb.png',
    coverMobile: './images/M19978g/spider-man-remaster-carousel-mobile.png',
    price: { regular: 59.99, discount: 29.99 }
  },

  {
    id: 19,
    name: 'UNCHARTED™: Legacy of Thieves Collection',
    category: {
      card: 'Base game'
    },
    coverImg: './images/CarouselCoverDesktop/fortnite.png',
    logoImg: './images/CarouselInfo/fortnite-logo.png',
    carouselThumb: './images/CarouselCard/fortnite-carousel-thumb.jpg',
    coverMobile: './images/CarouselCoverMobile/uncharted-carousel-mobile.jpg',
    price: { regular: 49.99, discount: 15.99 }
  }
];

export default function GameCards() {
  return (
    <section className={styles.gameCards}>
      <ul>
        {items.map((item) => (
          <Card key={item.id} cardInfo={item} />
        ))}
      </ul>
    </section>
  );
}
