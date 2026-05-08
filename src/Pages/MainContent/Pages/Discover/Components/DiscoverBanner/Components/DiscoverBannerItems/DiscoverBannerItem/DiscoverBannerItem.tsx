import Image from "../../../../../../../../../Shared/Image/Image/Image";
import RippleEffect from "../../../../../../../../../Shared/RippleEffect/RippleEffect";
import type {
  DiscoverBannerActiveBannerFunc,
  DiscoverBannerData,
  DiscoverBannerIndex,
} from "../../../useDiscoverBannerLogics/useDiscoverBannerLogics";
import DiscoverBannerPrice from "../../DiscoverBannerPrice/DiscoverBannerPrice";

import styles from "./DiscoverBannerItem.module.css";

type Props = {
  banner: Pick<DiscoverBannerData, "coverImg" | "name" | "price" | "id"> & {
    index: DiscoverBannerIndex;
  };
  bannerState: {
    active: DiscoverBannerIndex | null;
    fadeIn: DiscoverBannerIndex;
    fadeOut: DiscoverBannerIndex | null;
  };
  activeBanner: DiscoverBannerActiveBannerFunc;
  screenWidth: number;
};

export default function DiscoverBannerItem({
  banner,
  bannerState,
  activeBanner,
  screenWidth,
}: Props) {
  const { id, coverImg, name, index, price } = banner;
  const idState = activeBanner(index, bannerState, styles);

  return (
    <li className={`${styles.carouselItem} ${idState}`}>
      <Image
        data={coverImg}
        alt={`${name} carousel cover-${id}`}
        aspectRatioClassName={styles.aspectRatioClassName}
      />
      <div className={styles.itemButton}>
        <DiscoverBannerPrice price={price} />
        <button type="button">
          buy now
          {screenWidth > 48 && (
            <RippleEffect background="rgb(255, 255, 255)" long />
          )}
        </button>
      </div>
    </li>
  );
}
