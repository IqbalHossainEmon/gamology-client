import { useEffect, useRef, useState } from 'react';
import RotateArrow from '../../../../../../../../../Shared/RotateArrow/RotateArrow';
import styles from './IndividualGameTextDescription.module.css';

export default function IndividualGameTextDescription({ descriptions }) {
  const elementRef = useRef(null);
  const [show, setShow] = useState({ show: false, height: NaN });

  useEffect(() => {
    setShow((prev) => ({ ...prev, height: elementRef.current.offsetHeight }));
  }, [elementRef]);

  return (
    <div>
      <div
        className={styles.individualGameDetailDescriptionContainer}
        style={show.show ? { height: show.height + 40 } : { height: 500 }}
      >
        <div
          ref={elementRef}
          className={styles.individualGameDetailDescription}
        >
          {descriptions.map((description) => {
            if (description.mainHeader) {
              return (
                <h2 key={description.mainHeader} className={styles.mainHeader}>
                  {description.mainHeader}
                </h2>
              );
            }
            if (description.description && description.subHeader) {
              return (
                <div
                  key={description.subHeader}
                  className={styles.subHeaderWithDescription}
                >
                  <strong>{description.subHeader}</strong>
                  <p>{description.description}</p>
                </div>
              );
            }
            if (description.description && !description.subHeader) {
              return (
                <p className={styles.description} key={description.description}>
                  {description.description}
                </p>
              );
            }
            return (
              <div key={description.subHeader}>
                <em className={styles.subHeader}>{description.subHeader}</em>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.showHideButtonContainer}>
        <button
          type="button"
          className={styles.showHideButton}
          onClick={() => setShow((prev) => ({ ...prev, show: !prev.show }))}
        >
          {show.show ? 'Show Less' : 'Show More'}
          <div className={styles.downArrow}>
            <RotateArrow state={show.show} />
          </div>
        </button>
        <div className={show.show ? styles.hide : styles.show} />
      </div>
    </div>
  );
}
