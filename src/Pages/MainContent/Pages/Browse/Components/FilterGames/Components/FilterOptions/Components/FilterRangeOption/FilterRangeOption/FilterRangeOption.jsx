import { useEffect, useRef, useState } from 'react';
import RangeField from '../Components/RangeField/RangeField/RangeField';
import RangeInput from '../Components/RangeInput/RangeInput/RangeInput';
import styles from './FilterRangeOption.module.css';

export default function FilterRangeOption({ option, limit, setState, disabled }) {
    const [disableState, setDisableState] = useState(false);

    const leftInputRef = useRef(null);
    const rightInputRef = useRef(null);

    useEffect(() => {
        if (typeof limit !== 'object' || limit.higher <= limit.lower || disabled) {
            setDisableState(true);
        } else {
            setDisableState(false);
        }
    }, [disabled, limit]);

    return (
        <div className={styles.filterRange} {...(disableState && { disabled: true })}>
            <RangeField disabled={disableState} conditionStep={option.stepCondition} limit={limit} />
            <RangeInput disabled={disabled} leftInputRef={leftInputRef} rightInputRef={rightInputRef} />
        </div>
    );
}
