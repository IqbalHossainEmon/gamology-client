import type {
  DiscoverBannerData,
  DiscoverBannerDispatch,
  DiscoverBannerIndex,
} from "../../../useDiscoverBannerLogics/useDiscoverBannerLogics";
import DiscoverBannerItemCard from "../DiscoverBannerItemCard/DiscoverBannerItemCard/DiscoverBannerItemCard";

import styles from "./DiscoverBannerItemCards.module.css";

type Props = {
  data: DiscoverBannerData[];
  cardsPosition: DiscoverBannerIndex[];
  dispatch: DiscoverBannerDispatch;
  isPause: boolean;
};

export default function DiscoverBannerItemCards({
  data,
  cardsPosition,
  dispatch,
  isPause,
}: Props) {
  return (
    <ul className={styles.itemCards}>
      {data.map(({ id, carouselThumb, name }, index) => (
        <DiscoverBannerItemCard
          key={id}
          banner={{ carouselThumb, index: index as DiscoverBannerIndex, name }}
          cardsPosition={cardsPosition}
          dispatch={dispatch}
          isPause={isPause}
        />
      ))}
    </ul>
  );
}
