import { useCallback, useState } from "react";

import useAnimationFrame from "../../../../../../../../../../../Utils/Hooks/useAnimationFrame";

import styles from "./DiscoverBannerItemCardShadow.module.css";
import type { DiscoverBannerDispatch } from "../../../../../useDiscoverBannerLogics/useDiscoverBannerLogics";
import useHandleDebouncing from "../../../../../../../../../../../Utils/Hooks/useHandleDebouncing";

type Props = {
  dispatch: DiscoverBannerDispatch;
  isPause: boolean;
};

function DiscoverBannerItemCardShadow({ dispatch, isPause }: Props) {
  const [translate, setTranslate] = useState(0);

  const handleDebounce = useHandleDebouncing(400);

  const handleClick = useCallback(() => {
    handleDebounce(() => {
      dispatch({ type: "next" });
    });
  }, [dispatch, handleDebounce]);

  useAnimationFrame(
    (progress) => setTranslate(progress * 100),
    8500,
    isPause,
    handleClick,
    1000,
  );

  return (
    <div className={styles.shadowContainer}>
      <div
        className={styles.shadow}
        style={{
          transform: `translateY(${translate}%)`,
        }}
      />
    </div>
  );
}

export default DiscoverBannerItemCardShadow;
