import { useCallback, useEffect, useRef, useState } from 'react';
import ErrorMessage from '../../../../../../../../Shared/ErrorMessage/ErrorMessage';
import styles from './OuterErrorMessage.module.css';

const OuterErrorMessage = ({ errorChange, errorMessage }) => {
    const [errorShow, setErrorShow] = useState(false);

    const timerId = useRef(null);

    timerId.handleHideError = useCallback(() => {
        if (timerId.current) {
            clearTimeout(timerId.current);
            timerId.current = null;
        }
        timerId.current = setTimeout(() => {
            setErrorShow(false);
        }, 9000);
    }, []);

    useEffect(() => {
        if (errorChange && errorMessage) {
            setErrorShow(true);
            timerId.handleHideError();
        } else {
            setErrorShow(false);
        }
    }, [errorChange, errorMessage]);

    return (
        <div className={styles.outerErrorMessage}>
            <ErrorMessage errorMessage={errorMessage} enable={errorShow} />
        </div>
    );
};
export default OuterErrorMessage;
