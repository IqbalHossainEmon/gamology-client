import styles from './IndividualGameBannerCard.module.css';

export default function IndividualGameBannerCard({
  data,
  active,
  dispatch,
  index,
  timerFunction,
}) {
  return (
    <li className={styles.individualGameBannerCard}>
      <button
        type="button"
        className={
          active !== index
            ? [styles.button, styles.notActive].join(' ')
            : styles.button
        }
        {...(active !== index && {
          onClick: () => {
            dispatch({ type: 'setBanner', active: index });
            timerFunction(false, dispatch, 300);
          },
        })}
      >
        {data.type === 'video' && (
          <div
            className={
              active === index
                ? [styles.videoLogo, styles.active].join(' ')
                : styles.videoLogo
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 14">
              <path d="M0 0v14l11-7z" fill="white" fillRule="nonzero" />
            </svg>
          </div>
        )}
        <img
          className={styles.thumbImage}
          src={data.thumb}
          alt={`thumb number-${index + 1}`}
        />
      </button>
    </li>
  );
}
