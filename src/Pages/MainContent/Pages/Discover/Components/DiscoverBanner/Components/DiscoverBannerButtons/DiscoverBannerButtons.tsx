import ArrowButton from "../../../../../../../../Shared/ArrowButton/ArrowButton";
import useHandleDebouncing from "../../../../../../../../Utils/Hooks/useHandleDebouncing";

import styles from "./DiscoverBannerButtons.module.css";
import type { DiscoverBannerDispatch } from "../../useDiscoverBannerLogics/useDiscoverBannerLogics";

type Props = {
  dispatch: DiscoverBannerDispatch;
};

export default function DiscoverBannerButtons({ dispatch }: Props) {
  const handleDebouncing = useHandleDebouncing(400);
  return (
    <>
      <ArrowButton
        className={[styles.btn, styles.nextBtn].join(" ")}
        handleClick={() => handleDebouncing(() => dispatch({ type: "next" }))}
        name="Next Button"
      />
      <ArrowButton
        className={[styles.btn, styles.prevBtn].join(" ")}
        handleClick={() => handleDebouncing(() => dispatch({ type: "prev" }))}
        name="Previous Button"
      />
    </>
  );
}
