import { useState } from 'react';
import styles from './PriceReleaseDate.module.css';

export default function PriceReleaseDate() {
  const [release, setRelease] = useState({ day: '', month: '', year: '' });

  return (
    <div className={styles.priceReleaseDateContainer}>
      <div className={styles.priceContainer}>
        <label htmlFor="price">Price</label>
        <div className={styles.inputContainer}>
          <input placeholder="$" type="number" id="price" />
        </div>
      </div>
      <div className={styles.releaseContainer}>
        <label htmlFor="release">Release</label>
        <div className={styles.inputContainer}>
          <input
            placeholder="DD"
            type="number"
            value={release.day}
            id="release"
            onChange={(e) =>
              setRelease((prev) => ({ ...prev, day: e.target.value }))
            }
          />
          /
          <input
            placeholder="MM"
            type="number"
            value={release.month}
            id="release"
            onChange={(e) =>
              setRelease((prev) => ({ ...prev, month: e.target.value }))
            }
          />
          /
          <input
            placeholder="YY"
            type="number"
            value={release.year}
            id="release"
            onChange={(e) =>
              setRelease((prev) => ({ ...prev, year: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
}
