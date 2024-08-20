import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../../../../../../../../../../Shared/ErrorMessage/ErrorMessage';
import GameInfoFieldSpecification from '../GameInfoFieldSpecification/GameInfoFieldSpecification';
import styles from './GameInfoFieldSpecificationContainer.module.css';

function GameInfoFieldSpecificationContainer({
	gameSpecifications,
	errorMessages,
	errorChange,
	hasDefault,
	defaultGameSpecifications,
}) {
	const [errorShow, setErrorShow] = useState(Boolean(errorMessages[4])),

	 errorShowRef = useRef(errorShow);
	errorShowRef.current = errorShow;

	useEffect(() => {
		if (errorChange && errorMessages[3]) {
			setErrorShow(true);
		}
	}, [errorChange, errorMessages]);

	const eventRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = {
			handleSetValue: index => {
				gameSpecifications.current.gameSpecifications.spec[index].isActive =
					!gameSpecifications.current.gameSpecifications.spec[index].isActive;
				if (errorShowRef.current) {
					setErrorShow(false);
				}
			},
		};
	}

	return (
    <div className={styles.specsContainer}>
        {specs.map((spec, i) => (
            <div
                className={styles.specs}
                key={spec}
            >
                <GameInfoFieldSpecification
                    errorChange={errorChange}
                    errorMessages={errorMessages[i]}
                    gameSpecifications={gameSpecifications.current.gameSpecifications.spec}
                    handleSetValue={eventRef.current.handleSetValue}
                    index={i}
                    state={{ name: spec }}
                    {...(hasDefault && {
							defaultSpecs: defaultGameSpecifications.find(
								defaultSpec => defaultSpec.for === spec
							),
						})}
                    {...(hasDefault && {
							hasDefault: defaultGameSpecifications.find(
								defaultSpec => defaultSpec.for === spec
							)?.isActive,
						})}
                />
            </div>
			))}

        <ErrorMessage
            enable={errorShow}
            errorMessage={errorMessages[3]}
        />
    </div>
	);
}
export default GameInfoFieldSpecificationContainer;
