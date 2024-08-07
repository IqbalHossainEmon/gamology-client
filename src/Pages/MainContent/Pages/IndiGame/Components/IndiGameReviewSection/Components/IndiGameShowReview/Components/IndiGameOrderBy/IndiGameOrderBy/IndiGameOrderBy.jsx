import { useRef, useState } from 'react';
import useDropDownHide from '../../../../../../../../../../../Hooks/useDropDownHide';
import RotateArrow from '../../../../../../../../../../../Shared/RotateArrow/RotateArrow';
import IndiGameOrderByListContainer from '../Components/IndiGameOrderByListContainer/IndiGameOrderByListContainer';
import styles from './IndiGameOrderBy.module.css';

export default function IndiGameOrderBy({ handleSort }) {
    const btnRef = useRef(null);
    const listRef = useRef(null);

    const [orderBy, setOrderBy] = useState([
        { id: 0, name: 'Most positive', link: 'most-positive', active: true },
        { id: 1, name: 'Most critical', link: 'most-critical', active: false },
        { id: 3, name: 'Most recent', link: 'most-recent', active: false },
    ]);

    const [show, setShow] = useState(false);

    const { showMenu, setElement, stopMenu } = useDropDownHide(setShow);

    return (
        <div className={styles.individualGameOrderBy}>
            <button
                ref={btnRef}
                type="button"
                className={styles.activeOrderContainer}
                onClick={() => {
                    setShow(prev => {
                        if (!prev) {
                            showMenu();
                            setElement([btnRef.current, listRef.current]);
                        } else {
                            stopMenu();
                            setElement(null);
                        }
                        return !prev;
                    });
                }}
            >
                <p className={styles.activeOrder}>
                    Order By:{' '}
                    <span className={styles.orderChangeablePart}>{orderBy.filter(order => order.active)[0].name}</span>
                </p>
                <div className={styles.rotateArrow}>
                    <RotateArrow state={show} />
                </div>
            </button>

            <IndiGameOrderByListContainer
                listRef={listRef}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                setShow={setShow}
                handleSort={handleSort}
                state={show}
            />
        </div>
    );
}
