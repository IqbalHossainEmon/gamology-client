import useAppearDisappear from '../../../Hooks/useAppearDisappear';
import ScrollBar from '../../ScrollBar/ScrollBar';
import styles from './SelectionFieldList.module.css';

const SelectionFieldList = ({
    state,
    setShow,
    positionRef,
    parentRef,
    childRef,
    list,
    setValue,
    setState,
    name,
    value,
    none,
}) => {
    const { show, fadeIn } = useAppearDisappear(state);
    return (
        <ul
            className={`${positionRef.current.bottom ? `${styles.showBottom} ` : `${styles.showAbove} `}${styles.listContainer}${fadeIn ? ` ${styles.fadeIn}` : ''}`}
        >
            <div
                ref={parentRef}
                className={styles.listScrollContainer}
                {...(positionRef.current.height && { style: { maxHeight: `${positionRef.current.height}px` } })}
            >
                <div ref={childRef}>
                    {none && (
                        <li className={styles.item} {...(value === '' && { id: styles.selected })}>
                            <button
                                tabIndex={show ? 0 : -1}
                                type="button"
                                onClick={() => {
                                    setShow(false);
                                    setValue('');
                                    setState('', name);
                                }}
                            >
                                None
                            </button>
                        </li>
                    )}
                    {list.map(item => (
                        <li className={styles.item} {...(value === item && { id: styles.selected })} key={item}>
                            <button
                                tabIndex={show ? 0 : -1}
                                {...(value === item && { disabled: true })}
                                type="button"
                                onClick={() => {
                                    setShow(false);
                                    setValue(item);
                                    setState(item, name);
                                }}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                    {list.length === 0 && <li className={`${styles.item} ${styles.noDataItem}`}>No Data</li>}
                </div>
            </div>
            <ScrollBar parentRef={parentRef} childRef={childRef} />
        </ul>
    );
};
export default SelectionFieldList;
