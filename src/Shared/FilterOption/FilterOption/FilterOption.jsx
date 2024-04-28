import { useCallback, useRef } from 'react';
import FilterSwitch from '../FilterSwitch/FilterSwitch';
import styles from './FilterOption.module.css';

function FilterOption({ text, setState, border, state, name }) {
    const handleClick = useRef(null);

    const btnRef = useRef(null);

    handleClick.current = useCallback(
        e => {
            // check if the event is on the btnRef
            if (btnRef.current.contains(e.target)) {
                setState(prev => ({ ...prev, [name]: !prev[name] }), name);
            }
        },
        [name, setState]
    );

    return (
        <button
            type="button"
            ref={btnRef}
            onMouseDown={el => {
                el.preventDefault();
                document.addEventListener('mouseup', handleClick.current, { once: true });
            }}
            className={`${border && styles.borderBot ? `${styles.borderBot} ` : ''}${styles.filterOption} ${styles.shadow}`}
        >
            <p className={styles.text}>{text}</p>
            <div className={styles.toggleButtonContainer}>
                <FilterSwitch event={handleClick} state={state} setState={setState} name={name} />
            </div>
        </button>
    );
}

export default FilterOption;
