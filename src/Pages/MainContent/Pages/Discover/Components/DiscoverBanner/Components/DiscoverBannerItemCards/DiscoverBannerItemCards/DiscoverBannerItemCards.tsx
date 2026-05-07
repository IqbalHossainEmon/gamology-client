import useHandleDebouncing from '../../../../../../../../../Utils/Hooks/useHandleDebouncing';
import type { DiscoverBannerData, DiscoverBannerIndex } from '../../../useDiscoverBannerLogics/useDiscoverBannerLogics';
import DiscoverBannerItemCard from '../DiscoverBannerItemCard/DiscoverBannerItemCard/DiscoverBannerItemCard';

import styles from './DiscoverBannerItemCards.module.css';

type Props = {
  data: DiscoverBannerData[];
  handleClick: (prop: 'next' | 'prev') => void;
  cardsPosition: DiscoverBannerIndex[];
  cardShadowUtils: {
    dispatch: () => void;
    isPause: boolean;
  };
}

export default function DiscoverBannerItemCards({
  data,
  handleClick,
  cardsPosition,
  cardShadowUtils,
}: Props) {
  const handleDebouncing = useHandleDebouncing(400);

  return (
    <ul className={styles.itemCards}>
      {data.map(({ id, carouselThumb, name }, index) => (
        <DiscoverBannerItemCard
          cardShadowUtils={cardShadowUtils}
          banner={{ carouselThumb, index: index as DiscoverBannerIndex, name }}
          cardsPosition={cardsPosition}
          handleClick={(prop: "next" | "prev") => handleDebouncing(() => handleClick(prop))}
          key={id}
        />
      ))}
    </ul>
  );
}
