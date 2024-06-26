import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../../../../../../../../Hooks/useDropDownHide';
import RotateArrow from '../../../../../../../../../../Shared/RotateArrow/RotateArrow';
import styles from './IndiGameOrderBy.module.css';

export default function IndiGameOrderBy({ handleSort }) {
    const elementRef1 = useRef(null);
    const elementRef2 = useRef(null);

    const [orderBy, setOrderBy] = useState([
        { id: 0, name: 'Most positive', link: 'most-positive', active: true },
        { id: 1, name: 'Most critical', link: 'most-critical', active: false },
        { id: 3, name: 'Most recent', link: 'most-recent', active: false },
    ]);

    const [show, setShow] = useState(false);

    const { showMenu, setElement } = useDropDownHide(setShow);

    useEffect(() => {
        setElement([elementRef1.current, elementRef2.current]);
    }, [setElement]);

    return (
        <div className={styles.individualGameOrderBy}>
            <button
                ref={elementRef1}
                type="button"
                className={styles.activeOrderContainer}
                onClick={() => {
                    setShow(prev => !prev);
                    showMenu();
                }}
            >
                <p className={styles.activeOrder}>
                    Order By: <span className={styles.orderChangeablePart}>{orderBy.filter(order => order.active)[0].name}</span>
                </p>
                <div className={styles.rotateArrow}>
                    <RotateArrow state={show} />
                </div>
            </button>
            <div ref={elementRef2}>
                {show && (
                    <ul className={styles.orderOptions}>
                        {orderBy.map((order, index) => (
                            <li className={styles.orderOption} key={order.id}>
                                <button
                                    className={orderBy[index].active ? [styles.optionBtn, styles.activeBtn].join(' ') : styles.optionBtn}
                                    type="button"
                                    {...(orderBy[index].active || {
                                        onClick: () => {
                                            setOrderBy(prev => {
                                                const prevOrderBy = [...prev];
                                                for (let i = 0; i < 3; i++) {
                                                    if (i === index) {
                                                        prevOrderBy[i].active = true;
                                                    } else {
                                                        prevOrderBy[i].active = false;
                                                    }
                                                }
                                                return prevOrderBy;
                                            });
                                            setShow(false);
                                            handleSort({ link: order.link, type: 'sort' });
                                        },
                                    })}
                                >
                                    {order.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
