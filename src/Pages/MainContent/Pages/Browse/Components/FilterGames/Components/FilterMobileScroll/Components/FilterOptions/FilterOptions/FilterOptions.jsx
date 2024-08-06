import { useEffect, useRef, useState } from 'react';
import useScreenWidth from '../../../../../../../../../../../Hooks/useScreenWidth';
import FilterOption from '../../../../../../../../../../../Shared/FilterOption/FilterOption';
import RotateArrow from '../../../../../../../../../../../Shared/RotateArrow/RotateArrow';
import FilterRangeOption from '../Components/FilterRangeOption/FilterRangeOption/FilterRangeOption';
import styles from './FilterOptions.module.css';

export default function FilterOptions({ option, state, setState, limits = {} }) {
    const screenWidth = useScreenWidth();

    const { title, optionList } = option;
    const optionRef = useRef(null);
    const [show, setShow] = useState({
        show: true,
        height: NaN,
    });

    useEffect(() => {
        setShow(prev => ({
            ...prev,
            height: optionRef.current.scrollHeight,
        }));
    }, [screenWidth]);

    return (
        <div className={styles.filterOptions}>
            {title && (
                <button
                    type="button"
                    onClick={() => setShow(prev => ({ ...prev, show: !prev.show }))}
                    className={styles.filterTitle}
                >
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.downArrow}>
                        <RotateArrow state={show.show} />
                    </div>
                </button>
            )}

            <div
                className={styles.optionList}
                ref={optionRef}
                {...(title && {
                    style: show.show
                        ? {
                              height: `${show.height}px`,
                          }
                        : { height: '0px' },
                })}
            >
                {optionList.map((op, i) => {
                    switch (op.type) {
                        case 'switch':
                            return (
                                <FilterOption
                                    key={op.id}
                                    text={op.text}
                                    border={i !== optionList.length - 1}
                                    state={state[op.filter]}
                                    name={op.filter}
                                    setState={setState}
                                />
                            );
                        default:
                            return (
                                <FilterRangeOption
                                    key={op.id}
                                    limit={limits[op.rangeName]}
                                    setState={setState}
                                    option={op}
                                    {...(state.ShowOnlyFreeGames && op.rangeName === 'price' && { disabled: true })}
                                />
                            );
                    }
                })}
            </div>
        </div>
    );
}
