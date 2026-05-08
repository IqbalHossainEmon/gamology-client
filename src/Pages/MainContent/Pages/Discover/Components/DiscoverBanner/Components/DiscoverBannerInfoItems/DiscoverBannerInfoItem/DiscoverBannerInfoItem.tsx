import Image from "../../../../../../../../../Shared/Image/Image/Image";
import useScreenWidth from "../../../../../../../../../Utils/Hooks/useScreenWidth";
import type {
  DiscoverBannerActiveBannerFunc,
  DiscoverBannerData,
  DiscoverBannerIndex,
} from "../../../useDiscoverBannerLogics/useDiscoverBannerLogics";
import DiscoverBannerPrice from "../../DiscoverBannerPrice/DiscoverBannerPrice";

import styles from "./DiscoverBannerInfoItem.module.css";

type Props = {
  banner: Pick<DiscoverBannerData, "logoImg" | "name" | "price"> & {
    index: DiscoverBannerIndex;
  };
  bannerState: {
    active: DiscoverBannerIndex | null;
    fadeIn: DiscoverBannerIndex;
    fadeOut: DiscoverBannerIndex | null;
  };
  activeBanner: DiscoverBannerActiveBannerFunc;
};

export default function DiscoverBannerInfoItem({
  banner,
  bannerState,
  activeBanner,
}: Props) {
  const { logoImg, name, index, price } = banner;
  const idState = activeBanner(index, bannerState, styles);

  const { widthInRem } = useScreenWidth();

  return (
    <li className={`${styles.itemInfo}${idState ? ` ${idState}` : ""}`}>
      <div className={styles.logoContainer}>
        <Image data={logoImg} alt={`${name} Logo-${index + 1}`} />
      </div>
      {widthInRem < 48.0625 && <DiscoverBannerPrice price={price} />}
    </li>
  );
}
