import { useEffect, useRef, useState } from 'react';
import RotateArrow from '../../../../../../../../../Shared/RotateArrow/RotateArrow';
import styles from './IndiGameTextDescription.module.css';

export default function IndiGameTextDescription({ descriptions }) {
  const elementRef = useRef(null);
  const [show, setShow] = useState({ show: false, height: NaN });

  useEffect(() => {
    setShow(prev => ({ ...prev, height: elementRef.current.offsetHeight }));
  }, [elementRef]);

  return (
    <div>
      <div className={styles.individualGameDetailDescriptionContainer} style={show.show ? { height: show.height + 40 } : { height: 500 }}>
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
      <div className={styles.showHideButtonContainer}>
        <button type="button" className={styles.showHideButton} onClick={() => setShow(prev => ({ ...prev, show: !prev.show }))}>
          {show.show ? 'Show Less' : 'Show More'}
          <div className={styles.rotateArrowContainer}>
            <div className={styles.rotateArrow}>
              <RotateArrow state={show.show} />
            </div>
          </div>
        </button>
        <div className={`${show.show ? styles.hide : styles.show} ${styles.darkShadow}`} />
      </div>
    </div>
  );
}
