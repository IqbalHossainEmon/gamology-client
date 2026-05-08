import Image from "../../../../../../../../Shared/Image/Image/Image";

import styles from "./DiscoverBannerItemMobile.module.css";
import type {
  DiscoverBannerData,
  DiscoverBannerIndex,
} from "../../useDiscoverBannerLogics/useDiscoverBannerLogics";

type Props = {
  banner: Pick<DiscoverBannerData, "coverMobile" | "name"> & {
    index: DiscoverBannerIndex;
  };
  cardsPosition: DiscoverBannerIndex[];
};

export default function DiscoverBannerItemMobile({
  banner,
  cardsPosition,
}: Props) {
  const { coverMobile, name, index } = banner;

  const positionClasses = [
    styles.first,
    styles.two,
    styles.three,
    styles.four,
    styles.five,
  ] as const;

  const cardPosition = cardsPosition[index];
  const position = cardPosition ? positionClasses[cardPosition] : "";

  return (
    <li className={`${styles.carouselItem}${position ? ` ${position}` : ""}`}>
      <Image
        data={coverMobile}
        alt={`${name} carousel cover-${index + 1}`}
        aspectRatioClassName={styles.aspectRatioClassName}
      />
    </li>
  );
}
