import { useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../../../../Hooks/useAppearDisappear';
import styles from './CardDotList.module.css';

const CardDotList = ({ lists, listShow, handleHide, item, parentRef }) => {
    const { show, fadeIn } = useAppearDisappear(listShow);

    const [position, setPosition] = useState(0);
    const positionRef = useRef(position);
    positionRef.current = position;

    useEffect(() => {
        if (listShow) {
            const { x, width, y, height } = parentRef.current.getBoundingClientRect();
            const rightRemain = window.innerWidth - x - width;
            const bottomRemain = window.innerHeight - y - height;

            if (rightRemain < 60 || (bottomRemain < 112 && y >= 112)) {
                if (rightRemain < 60) {
                    setPosition(1);
                }
                if (bottomRemain < 112 && y >= 112) {
                    setPosition(-1);
                }
            } else if (positionRef.current !== 0) {
                setPosition(0);
            }
        }
    }, [listShow, parentRef]);

    return (
        show && (
            <ul
                className={`${styles.listContainer} ${position > 0 ? styles.left : position < 0 ? styles.top : styles.bottom}${fadeIn ? ` ${styles.zoomIn}` : ''}`}
            >
                {lists.map(list => (
                    <li key={list.id}>
                        <button
                            onClick={() => {
                                list.event(item);
                                handleHide();
                            }}
                            type="button"
                        >
                            {list.name}
                        </button>
                    </li>
                ))}
            </ul>
        )
    );
};
export default CardDotList;
