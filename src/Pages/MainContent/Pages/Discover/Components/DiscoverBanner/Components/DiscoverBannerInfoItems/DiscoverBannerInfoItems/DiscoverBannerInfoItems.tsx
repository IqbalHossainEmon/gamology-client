import type {
  DiscoverBannerActiveBannerFunc,
  DiscoverBannerData,
  DiscoverBannerIndex,
} from "../../../useDiscoverBannerLogics/useDiscoverBannerLogics";
import DiscoverBannerInfoItem from "../DiscoverBannerInfoItem/DiscoverBannerInfoItem";

import styles from "./DiscoverBannerInfoItems.module.css";

type Props = {
  data: DiscoverBannerData[];
  bannerState: {
    active: DiscoverBannerIndex | null;
    fadeIn: DiscoverBannerIndex;
    fadeOut: DiscoverBannerIndex | null;
  };
  activeBanner: DiscoverBannerActiveBannerFunc;
};

export default function DiscoverBannerInfoItems({
  data,
  bannerState,
  activeBanner,
}: Props) {
  return (
    <div className={styles.infoItems}>
      <ul className={styles.itemsContainer}>
        {data.map(({ id, logoImg, name, price }, index) => (
          <DiscoverBannerInfoItem
            activeBanner={activeBanner}
            banner={{
              index: index as DiscoverBannerIndex,
              logoImg,
              price,
              name,
            }}
            bannerState={bannerState}
            key={id}
          />
        ))}
      </ul>
    </div>
  );
}
