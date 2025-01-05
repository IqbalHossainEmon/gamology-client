import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../../../../../../../../../../Shared/ErrorMessage/ErrorMessage/ErrorMessage';
import FilterOption from '../../../../../../../../../../Shared/FilterOption/FilterOption';
import NormalButtonWithEffects from '../../../../../../Shared/NormalButtonWithEffects/NormalButtonWithEffects';
import SectionFieldTextFieldContainer from '../SectionFieldTextFieldContainer/SectionFieldTextFieldContainer';
import styles from './GameInfoFieldSpecification.module.css';

export default function GameInfoFieldSpecification({
	state,
	gameSpecifications,
	index,
	errorMessages,
	errorChange,
	handleSetValue,
	defaultSpecs,
	hasDefault = false,
}) {
	const [requiredLength, setRequiredLength] = useState(defaultSpecs?.systemReq.length || 1);
	const [enabled, setEnabled] = useState({ enabled: hasDefault });
	const [errorShow, setErrorShow] = useState({
		min: Boolean(errorMessages.min),
		rec: Boolean(errorMessages.rec),
	});
	const errorShowRef = useRef(errorShow);
	errorShowRef.current = errorShow;

	const [selectedKeys, setSelectedKeys] = useState(
		defaultSpecs
			? {
					min: defaultSpecs.systemReq.map(defaultSpec => defaultSpec[0].key),
					rec: defaultSpecs.systemReq.map(defaultSpec => defaultSpec[1].key),
				}
			: { min: [], rec: [] }
	);

	useEffect(() => {
		if (errorChange && errorMessages.rec) {
			setErrorShow(prev => ({ ...prev, rec: true }));
		}
		if (errorChange && errorMessages.min) {
			setErrorShow(prev => ({ ...prev, min: true }));
		}
	}, [errorChange, errorMessages]);

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleSetEnable: props => {
				setEnabled(props);
				if (errorShowRef.current.min || errorShowRef.rec) {
					setErrorShow({ min: false, rec: false });
				}
				handleSetValue(index);
			},

			handleHideErrorShow: childIndex => {
				if (errorShow.rec && childIndex) {
					setErrorShow(prev => ({ ...prev, rec: false }));
				}
				if (errorShow.min && !childIndex) {
					setErrorShow(prev => ({ ...prev, min: false }));
				}
			},
			handleSetState: (value, i, childIndex, isKey) => {
				if (isKey) {
					gameSpecifications[index].systemReq[i][childIndex].key = value;
					setSelectedKeys(prev => {
						const newSelectedKeys = [...prev[childIndex ? 'rec' : 'min']];
						newSelectedKeys[i] = value;
						return { ...prev, [childIndex ? 'rec' : 'min']: newSelectedKeys };
					});
					eventRefs.current.handleHideErrorShow(childIndex);
				} else {
					gameSpecifications[index].systemReq[i][childIndex].value = value;
				}
			},
		};
	}
	return (
		<div className={styles.addGameSpecification}>
			<FilterOption
				border
				name='enabled'
				setState={eventRefs.current.handleSetEnable}
				state={enabled.enabled}
				text={state.name}
			/>
			<div
				className={styles.systemReqContainer}
				{...(!enabled.enabled && { disabled: true, tabIndex: '-1' })}
			>
				<div className={styles.systemReq}>
					<h4 className={styles.type}>Minimum</h4>
					<SectionFieldTextFieldContainer
						defaultData={defaultSpecs?.systemReq}
						enabled={enabled.enabled}
						errorChange={errorChange}
						errorMessage={errorMessages.req?.min}
						handleSetState={eventRefs.current.handleSetState}
						index={0}
						name={`${state.name.toLowerCase()}_min`}
						parentErrorShow={errorShow.min}
						parentIndex={index}
						requiredLength={requiredLength}
						selectedKeys={selectedKeys.min}
						setHideParentErrorShow={() => {
							if (errorShow.min) {
								setErrorShow(prev => ({ ...prev, min: false }));
							}
						}}
					/>

					<ErrorMessage enable={errorShow.min} errorMessage={errorMessages.min} />
				</div>
				<div className={styles.systemReq}>
					<h4 className={styles.type}>Recommended</h4>
					<SectionFieldTextFieldContainer
						defaultData={defaultSpecs?.systemReq}
						enabled={enabled.enabled}
						errorChange={errorChange}
						errorMessage={errorMessages.req?.rec}
						handleSetState={eventRefs.current.handleSetState}
						index={1}
						name={`${state.name.toLowerCase()}_rec`}
						parentErrorShow={errorShow.rec}
						parentIndex={index}
						requiredLength={requiredLength}
						selectedKeys={selectedKeys.rec}
						setHideParentErrorShow={() => {
							if (errorShow.rec) {
								setErrorShow(prev => ({ ...prev, rec: false }));
							}
						}}
					/>

					<ErrorMessage enable={errorShow.rec} errorMessage={errorMessages.rec} />
				</div>
				<div className={styles.buttonsContainer}>
					<div className={styles.btnContainer}>
						<NormalButtonWithEffects
							text='Add More +'
							{...(requiredLength === 10 && { disabled: true })}
							{...(enabled.enabled || { tabIndexOff: true })}
							onClick={() => {
								setRequiredLength(prev => prev + 1);
								if (errorShow.rec) {
									setErrorShow({ min: false, rec: false });
								}
								gameSpecifications[index].systemReq.push([
									{ key: '', value: '' },
									{ key: '', value: '' },
								]);
							}}
						/>
					</div>

					<div className={styles.btnContainer}>
						<NormalButtonWithEffects
							text='Remove one -'
							{...(requiredLength === 1 && { disabled: true })}
							onClick={() => {
								setRequiredLength(prev => prev - 1);
								const pop = gameSpecifications[index].systemReq.pop();
								const minKey = pop[0].key;
								const recKey = pop[1].key;
								if (
									selectedKeys.min.includes(minKey) &&
									selectedKeys.rec.includes(recKey)
								) {
									setSelectedKeys(prev => {
										const newSelectedKeys = { ...prev };
										newSelectedKeys.min = newSelectedKeys.min.filter(
											key => key !== minKey
										);
										newSelectedKeys.rec = newSelectedKeys.rec.filter(
											key => key !== recKey
										);
										return newSelectedKeys;
									});
								} else if (selectedKeys.min.includes(minKey)) {
									setSelectedKeys(prev => {
										const newSelectedKeys = { ...prev };
										newSelectedKeys.min = newSelectedKeys.min.filter(
											key => key !== minKey
										);
										return newSelectedKeys;
									});
								} else if (selectedKeys.rec.includes(recKey)) {
									setSelectedKeys(prev => {
										const newSelectedKeys = { ...prev };
										newSelectedKeys.rec = newSelectedKeys.rec.filter(
											key => key !== recKey
										);
										return newSelectedKeys;
									});
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
