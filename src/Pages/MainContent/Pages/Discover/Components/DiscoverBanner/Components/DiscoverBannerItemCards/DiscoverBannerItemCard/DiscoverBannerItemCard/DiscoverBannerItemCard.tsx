import Image from "../../../../../../../../../../Shared/Image/Image/Image";
import type {
  DiscoverBannerDispatch,
  DiscoverBannerIndex,
} from "../../../../useDiscoverBannerLogics/useDiscoverBannerLogics";
import CardNameContainer from "../Components/CardNameContainer/CardNameContainer";

import styles from "./DiscoverBannerItemCard.module.css";

const handleCardPosition = (num: DiscoverBannerIndex) => {
  switch (num) {
    case 0:
      return styles.first;
    case 1:
      return styles.two;
    case 2:
      return styles.three;
    case 3:
      return styles.four;
    case 4:
      return styles.five;
    default:
      return "";
  }
};

const handleOnClickParam = (num: DiscoverBannerIndex) => {
  if (num > 2) {
    return "prev";
  }
  return "next";
};

type Props = {
  banner: { carouselThumb: string; index: DiscoverBannerIndex; name: string };
  cardsPosition: DiscoverBannerIndex[];
  dispatch: DiscoverBannerDispatch;
  isPause: boolean;
};

export default function DiscoverBannerItemCard({
  banner,
  cardsPosition,
  dispatch,
  isPause,
}: Props) {
  const { carouselThumb, index, name } = banner;

  const handleCardClick = () => {
    const handleClick = (action: { type: "next" | "prev" }) => {
      dispatch(action);
    };

    const position = cardsPosition[index];
    if (position === 2 || position === 3) {
      handleClick({ type: handleOnClickParam(position) });
      setTimeout(() => {
        handleClick({ type: handleOnClickParam(position) });
      }, 500);
    } else {
      if (position) handleClick({ type: handleOnClickParam(position) });
    }
  };

  const cardStyles = handleCardPosition(
    cardsPosition[index] as DiscoverBannerIndex,
  );

  return (
    <li
      className={`${styles.cardContainer}${cardsPosition[index] !== 0 ? " hover-shadow" : ""}`}
      {...(cardStyles && { id: cardStyles })}
    >
      <button
        className={styles.cardBtn}
        type="button"
        {...(cardsPosition[index] !== 0 && { onClick: handleCardClick })}
      >
        <Image
          className={styles.cardImage}
          data={carouselThumb}
          alt={`${name} card-${index}`}
          aspectRatioClassName={styles.aspectRatioClassName}
        />
      </button>
      <CardNameContainer
        name={name}
        state={cardsPosition[index] === 0}
        dispatch={dispatch}
        isPause={isPause}
      />
    </li>
  );
}
