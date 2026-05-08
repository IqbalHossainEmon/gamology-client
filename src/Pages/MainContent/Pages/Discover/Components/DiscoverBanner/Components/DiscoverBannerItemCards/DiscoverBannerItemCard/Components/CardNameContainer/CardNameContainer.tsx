import useAppearDisappear from "../../../../../../../../../../../Utils/Hooks/useAppearDisappear";
import DiscoverBannerItemCardShadow from "../DiscoverBannerItemCardShadow/DiscoverBannerItemCardShadow";

import styles from "./CardNameContainer.module.css";
import type { DiscoverBannerDispatch } from "../../../../../useDiscoverBannerLogics/useDiscoverBannerLogics";

type Props = {
  state: boolean;
  name: string;
  dispatch: DiscoverBannerDispatch;
  isPause: boolean;
};

function CardNameContainer({ state, name, dispatch, isPause }: Props) {
  const [show, fadeIn] = useAppearDisappear(state, true);

  return (
    show && (
      <div className={styles.cardNameContainer}>
        <div
          className={`${styles.cardName}${fadeIn ? ` ${styles.fadeIn}` : ""}`}
        >
          <p className={styles.cardNameText}>{name}</p>
          <DiscoverBannerItemCardShadow dispatch={dispatch} isPause={isPause} />
        </div>
      </div>
    )
  );
}
export default CardNameContainer;
