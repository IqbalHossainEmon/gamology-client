import { useEffect, useRef, useState } from 'react';
import useScreenWidth from '../../../../../../../../../Hooks/useScreenWidth';
import RotateArrow from '../../../../../../../../../Shared/RotateArrow/RotateArrow';
import styles from './IndiGameTextDescription.module.css';

export default function IndiGameTextDescription({ descriptions }) {
  const elementRef = useRef(null);
  const [show, setShow] = useState({ show: false, height: NaN, transition: false });

  const screenWidth = useScreenWidth();

  useEffect(() => {
    setShow(prev => ({ ...prev, height: elementRef.current.offsetHeight }));
  }, [elementRef, screenWidth]);

  return (
    <div>
      <div
        className={`${show.transition ? `${styles.showTransition} ` : ''}${styles.individualGameDetailDescriptionContainer}`}
        style={show.show && show.height ? { height: show.height + 40 } : { height: 500 }}
      >
        <div ref={elementRef} className={styles.individualGameDetailDescription}>
          {descriptions.map(description => (
            <div key={description.id} className={styles.descriptionContainer}>
              {description.mainHeader && <h2 className={styles.mainHeader}>{description.mainHeader}</h2>}
              {description.subHeader && <strong className={styles.subHeader}>{description.subHeader}</strong>}
              {description.description && <p className={styles.description}>{description.description}</p>}
              {description.subHeader && !description.description && description.mainHeader && (
                <div>
                  <em className={styles.subHeader}>{description.subHeader}</em>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {show.height > 500 && (
        <div className={styles.showHideButtonContainer}>
          <button
            type="button"
            className={styles.showHideButton}
            onClick={() => {
              setShow(prev => ({ ...prev, show: !prev.show, transition: true }));
              setTimeout(() => {
                setShow(prev => ({ ...prev, transition: false }));
              }, 300);
            }}
          >
            Show {show.show ? 'Less' : 'More'}
            <div className={styles.rotateArrowContainer}>
              <div className={styles.rotateArrow}>
                <RotateArrow state={show.show} />
              </div>
            </div>
          </button>
          <div className={`${show.show ? styles.hide : styles.show} ${styles.darkShadow}`} />
        </div>
      )}
    </div>
  );
}
