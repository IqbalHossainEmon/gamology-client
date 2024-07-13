import { useEffect, useState } from 'react';
import ErrorMessage from '../../../../../../../../../../Shared/ErrorMessage/ErrorMessage';
import SelectionField from '../../../../../../../../../../Shared/SelectionField/SelectionField';
import styles from './SelectionFieldWithErrorMessage.module.css';

const SelectionFieldWithErrorMessage = ({
    htmlFor,
    placeholder,
    list,
    name,
    setState,
    errorMessage,
    errorChange,
    handleCheck,
}) => {
    const [errorShow, setErrorShow] = useState(false);

    useEffect(() => {
        if (errorChange && errorMessage) setErrorShow(true);
        else setErrorShow(false);
    }, [errorChange, errorMessage]);

    return (
        <div className={styles.selectionField}>
            <SelectionField
                onFocusClick={() => {
                    setErrorShow(false);
                    handleCheck();
                }}
                htmlFor={htmlFor}
                errorBorder={errorShow}
                placeholder={placeholder}
                list={list}
                name={name}
                setState={setState}
            />
            <ErrorMessage enable={errorShow} errorMessage={errorMessage} />
        </div>
    );
};
export default SelectionFieldWithErrorMessage;
