import styles from './IndividualGameBannerCard.module.css';

export default function IndividualGameBannerCard({
  data,
  active,
  dispatch,
  index,
  timerFunction,
}) {
  return (
    <div className={styles.individualGameBannerCard}>
      <button
        type="button"
        className={styles.button}
        {...(active !== index && {
          onClick: () => {
            dispatch({ type: 'setBanner', active: index });
            timerFunction(false, dispatch);
          },
        })}
      >
        <img src={data.thumb} alt={`thumb number - ${index}`} />
      </button>
    </div>
  );
}
