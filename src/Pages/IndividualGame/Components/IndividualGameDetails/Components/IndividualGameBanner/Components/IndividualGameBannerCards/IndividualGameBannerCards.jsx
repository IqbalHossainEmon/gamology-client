import IndividualGameBannerCard from '../IndividualGameBannerCard/IndividualGameBannerCard';
import styles from './IndividualGameBannerCards.module.css';

export default function IndividualGameBannerCards({
  active,
  items,
  dispatch,
  timerFunction,
}) {
  return (
    <div className={styles.individualGameBannerCards}>
      {items.map((item, index) => (
        <IndividualGameBannerCard
          key={item.id}
          index={index}
          data={item}
          active={active}
          dispatch={dispatch}
          timerFunction={timerFunction}
        />
      ))}
    </div>
  );
}
