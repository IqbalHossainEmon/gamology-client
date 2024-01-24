import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ButtonWaterEffect.module.css';

const ButtonWaterEffect = ({ btnRef, backGround }) => {
  const [ele, setEle] = useState([]);
  const eleRef = useRef(ele);
  eleRef.current = ele;
  const check = useRef(true);
  const key = useRef(0);

  const removeWaterDrop = useCallback(() => {
    setTimeout(() => {
      setEle(e => e.slice(1));
    }, 1800);
  }, []);

  useEffect(() => {
    if (check.current) {
      check.current = false;
      btnRef.current.addEventListener('click', e => {
        const x = e.pageX - btnRef.current.offsetLeft;
        const y = e.pageY - btnRef.current.offsetTop;
        const width = btnRef.current.offsetWidth;
        const height = btnRef.current.offsetHeight;
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        let length;

        if (x <= halfWidth && y <= halfHeight) {
          length = Math.sqrt((width - x) ** 2 + (height - y) ** 2);
        } else if (x > halfWidth && y < halfHeight) {
          length = Math.sqrt(x ** 2 + (height - y) ** 2);
        } else if (x < halfWidth && y > halfHeight) {
          length = Math.sqrt((width - x) ** 2 + y ** 2);
        } else {
          length = Math.sqrt(x ** 2 + y ** 2);
        }

        setEle(el => [
          ...el,
          <span
            key={key.current++}
            className={styles.waterDrop}
            style={{
              width: `${length * 2}px`,
              height: `${length * 2}px`,
              top: `${y - length}px`,
              left: `${x - length}px`,
              background: backGround || 'white',
            }}
          />,
        ]);
        removeWaterDrop();
      });
    }
  }, [backGround, btnRef, btnRef.current?.offsetWidth, removeWaterDrop]);

  return (
    <span className={styles.btnWaterEffect}>
      <span />
      {ele}
    </span>
  );
};
export default ButtonWaterEffect;
