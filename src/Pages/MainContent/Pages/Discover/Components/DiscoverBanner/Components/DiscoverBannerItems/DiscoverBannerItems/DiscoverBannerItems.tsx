import type {
  DiscoverBannerActiveBannerFunc,
  DiscoverBannerData,
  DiscoverBannerIndex,
} from "../../../useDiscoverBannerLogics/useDiscoverBannerLogics";
import DiscoverBannerItemMobile from "../../DiscoverBannerItemMobile/DiscoverBannerItemMobile";
import DiscoverBannerItem from "../DiscoverBannerItem/DiscoverBannerItem";

import styles from "./DiscoverBannerItems.module.css";

type Props = {
  data: DiscoverBannerData[];
  bannerState: {
    active: DiscoverBannerIndex | null;
    fadeIn: DiscoverBannerIndex;
    fadeOut: DiscoverBannerIndex | null;
  };
  cardsPosition: DiscoverBannerIndex[];
  screenWidth: number;
  activeBanner: DiscoverBannerActiveBannerFunc;
};

export default function DiscoverBannerItems({
  data,
  bannerState,
  cardsPosition,
  screenWidth,
  activeBanner,
}: Props) {
  return (
    <ul className={styles.carouselItems}>
      {data.map(({ coverMobile, coverImg, id, name, price }, index) =>
        screenWidth > 48 ? (
          <DiscoverBannerItem
            activeBanner={activeBanner}
            banner={{
              coverImg,
              id,
              index: index as DiscoverBannerIndex,
              name,
              price,
            }}
            bannerState={bannerState}
            key={id}
            screenWidth={screenWidth}
          />
        ) : (
          <DiscoverBannerItemMobile
            banner={{ coverMobile, index: index as DiscoverBannerIndex, name }}
            cardsPosition={cardsPosition}
            key={id}
          />
        ),
      )}
    </ul>
  );
}
