import styles from './DiscoverGamesCardsHeader.module.css';

export default function DiscoverGamesCardsHeader({ headerTitle }) {
  return (
    <h4 className={styles.CardsHeader}>
      {headerTitle}
      <span className={styles.arrow}>
        <svg className="svg css-uwwqev" viewBox="0 0 5 9">
          <path
            stroke="currentColor"
            d="M1 1l3 3.5L1 8"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </span>
    </h4>
  );
}
