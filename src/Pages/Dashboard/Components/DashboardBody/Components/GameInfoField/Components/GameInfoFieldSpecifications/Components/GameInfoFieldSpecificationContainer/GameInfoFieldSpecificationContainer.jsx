import { useCallback, useEffect, useRef, useState } from 'react';
import ErrorMessage from '../../../../../../../../../../Shared/ErrorMessage/ErrorMessage';
import GameInfoFieldSpecification from '../GameInfoFieldSpecification/GameInfoFieldSpecification';
import styles from './GameInfoFieldSpecificationContainer.module.css';

const specs = ['Windows', 'MacOs', 'Linux'];
const GameInfoFieldSpecificationContainer = ({
    gameSpecifications,
    errorMessages,
    errorChange,
    hasDefault,
    defaultGameSpecifications,
}) => {
    const [errorShow, setErrorShow] = useState(!!errorMessages[4]);

    const errorShowRef = useRef(errorShow);
    errorShowRef.current = errorShow;

    useEffect(() => {
        if (errorChange && errorMessages[3]) {
            setErrorShow(true);
        }
    }, [errorChange, errorMessages]);

    const handleSetValue = useCallback(
        index => {
            gameSpecifications.current.gameSpecifications.spec[index].isActive =
                !gameSpecifications.current.gameSpecifications.spec[index].isActive;
            if (errorShowRef.current) {
                setErrorShow(false);
            }
        },
        [gameSpecifications]
    );

    return (
        <div className={styles.specsContainer}>
            {specs.map((spec, i) => (
                <div key={spec} className={styles.specs}>
                    <GameInfoFieldSpecification
                        gameSpecifications={gameSpecifications.current.gameSpecifications.spec}
                        state={{ name: spec }}
                        index={i}
                        errorMessages={errorMessages[i]}
                        errorChange={errorChange}
                        handleSetValue={handleSetValue}
                        {...(hasDefault && {
                            defaultSpecs: defaultGameSpecifications.find(defaultSpec => defaultSpec.for === spec),
                        })}
                        {...(hasDefault && {
                            hasDefault: defaultGameSpecifications.find(defaultSpec => defaultSpec.for === spec)
                                ?.isActive,
                        })}
                    />
                </div>
            ))}
            <ErrorMessage enable={errorShow} errorMessage={errorMessages[3]} />
        </div>
    );
};
export default GameInfoFieldSpecificationContainer;
