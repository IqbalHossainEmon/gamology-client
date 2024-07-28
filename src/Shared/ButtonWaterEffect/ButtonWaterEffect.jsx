import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ButtonWaterEffect.module.css';

const ButtonWaterEffect = ({ btnRef, backGround, long }) => {
    const [ele, setEle] = useState([]);
    const eleRef = useRef(ele);
    eleRef.current = ele;
    const key = useRef(0);
    const eventRefs = useRef({
        handleClick: () => {},
        removeWaterDrop: () => {},
    });

    eventRefs.current.removeWaterDrop = useCallback(() => {
        setTimeout(
            () => {
                setEle(e => e.slice(1));
            },
            long ? 1550 : 750
        );
    }, [long]);

    eventRefs.current.handleClick = useCallback(
        e => {
            let x = (e.touches ? e.touches[0].clientX : e.clientX) - btnRef.current.getBoundingClientRect().left;
            let y = (e.touches ? e.touches[0].clientY : e.clientY) - btnRef.current.getBoundingClientRect().top;
            const width = btnRef.current.offsetWidth;
            const height = btnRef.current.offsetHeight;
            const halfWidth = width / 2;
            const halfHeight = height / 2;

            if (x < -2 || y < -2) {
                x = halfWidth;
                y = halfHeight;
            }

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

            if (eleRef.current.length === 0) key.current = 0;

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
            eventRefs.current.removeWaterDrop();
        },
        [backGround, btnRef, long]
    );

    useEffect(() => {
        const btn = btnRef.current;
        const { handleClick } = eventRefs.current;

        btn.addEventListener('click', handleClick);
        return () => {
            if (btn) btn.removeEventListener('click', handleClick);
        };
    }, [backGround, btnRef, long]);

    return <span className={styles.btnWaterEffect}>{ele}</span>;
};
export default ButtonWaterEffect;
