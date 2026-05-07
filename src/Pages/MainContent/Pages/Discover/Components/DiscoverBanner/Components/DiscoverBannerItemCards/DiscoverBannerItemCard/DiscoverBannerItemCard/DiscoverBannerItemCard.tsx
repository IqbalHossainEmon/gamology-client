import Image from '../../../../../../../../../../Shared/Image/Image/Image';
import type { DiscoverBannerIndex } from '../../../../useDiscoverBannerLogics/useDiscoverBannerLogics';
import CardNameContainer from '../Components/CardNameContainer/CardNameContainer';

import styles from './DiscoverBannerItemCard.module.css';

const handleCardPosition = (num: DiscoverBannerIndex) => {
  switch (num) {
    case 0:
      return styles.first;
    case 1:
      return styles.two;
    case 2:
      return styles.three;
    case 3:
      return styles.four;
    case 4:
      return styles.five;
    default:
      return '';
  }
};

const handleOnClickParam = (num: DiscoverBannerIndex) => {
  if (num > 2) {
    return 'prev';
  }
  return 'next';
};

type Props = {
  banner: { carouselThumb: string, index: DiscoverBannerIndex, name: string },
  handleClick: (prop: { type: 'next' | 'prev' }) => void,
  cardsPosition: DiscoverBannerIndex[],
  cardShadowUtils: {
    dispatch: () => void;
    isPause: boolean;
  };
}

export default function DiscoverBannerItemCard({
  banner,
  handleClick,
  cardsPosition,
  cardShadowUtils,
}: Props) {
  const { carouselThumb, index, name } = banner;
  // This function takes card positions in the screen and returns a object where cards position styles and function is added as element

  const handleCardClick = () => {
    const position = cardsPosition[index];
    if (position === 2 || position === 3) {
      handleClick({ type: handleOnClickParam(position) });
      setTimeout(() => {
        handleClick({ type: handleOnClickParam(position) });
      }, 500);
    } else {
      if (position)
        handleClick({ type: handleOnClickParam(position) });
    }
  };

  const cardStyles = handleCardPosition(cardsPosition[index]);

  return (
    <li
      className={`${styles.cardContainer}${cardsPosition[index] !== 0 ? ' hover-shadow ' : ''}`}
      // id={handleCardPosition(cardsPosition[index])}
      {...(cardStyles && { id: cardStyles })}
    >
      <button
        className={styles.cardBtn}
        type='button'
        {...(cardsPosition[index] !== 0 && { onClick: handleCardClick })}
      >
        <Image
          className={styles.cardImage}
          data={carouselThumb}
          alt={`${name} card-${index}`}
          aspectRatioClassName={styles.aspectRatioClassName}
        />
      </button>
      <CardNameContainer
        cardShadowUtils={cardShadowUtils}
        name={name}
        state={cardsPosition[index] === 0}
      />
    </li>
  );
}
