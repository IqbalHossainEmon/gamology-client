import { useCallback, useEffect, useRef, useState } from 'react';
import useGetCoords from '../../Hooks/useGetCoords';
import useScreenWidth from '../../Hooks/useScreenWidth';
import styles from './ButtonWaterEffect.module.css';

const ButtonWaterEffect = ({ btnRef, backGround, long }) => {
  const [ele, setEle] = useState([]);
  const eleRef = useRef(ele);
  eleRef.current = ele;
  const check = useRef(true);
  const key = useRef(0);
  const getCoords = useGetCoords();
  const screenWidth = useScreenWidth();

  const removeWaterDrop = useCallback(() => {
    setTimeout(
      () => {
        setEle(e => e.slice(1));
      },
      long ? 1550 : 750
    );
  }, [long]);

  useEffect(() => {
    eleRef.left = getCoords(btnRef.current).left;
    eleRef.top = getCoords(btnRef.current).top;
  }, [screenWidth, getCoords, btnRef]);

  useEffect(() => {
    if (check.current) {
      check.current = false;
      btnRef.current.addEventListener('click', e => {
        const x = e.pageX - eleRef.left;
        const y = e.pageY - eleRef.top;
        const width = btnRef.current.offsetWidth;
        const height = btnRef.current.offsetHeight;
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        console.log(x, y, width, height, halfWidth, halfHeight);

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
            className={`${long ? styles.long : styles.short} ${styles.waterDrop}`}
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
  }, [backGround, btnRef, getCoords, long, removeWaterDrop]);

  return (
    <span className={styles.btnWaterEffect}>
      <span />
      {ele}
    </span>
  );
};
export default ButtonWaterEffect;
