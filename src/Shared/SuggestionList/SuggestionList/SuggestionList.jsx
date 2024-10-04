import { useEffect, useRef } from 'react';
import useAppearDisappear from '../../../Utils/Hooks/useAppearDisappear';
import SuggestionListBody from '../SuggestionListBody/SuggestionListBody';

function SuggestionList({ state, setShow, list, setValue, setState, name, value, elementRef }) {
	const [show, fadeIn] = useAppearDisappear(state);

	const positionRef = useRef({ bottom: true });

	useEffect(() => {
		const { height, y } = elementRef.current.getBoundingClientRect();
		const bottomRemain = window.innerHeight - y - height;
		if (list.length > 4) {
			if (bottomRemain < 170) {
				positionRef.current.bottom = false;
				if (y < 420) {
					positionRef.current.height = y;
				} else {
					positionRef.current.height = 0;
				}
			} else {
				positionRef.current.bottom = true;
				if (bottomRemain < 420) {
					positionRef.current.height = bottomRemain;
				} else {
					positionRef.current.height = 0;
				}
			}
		} else if (bottomRemain < list.length * 40 + 10) {
			positionRef.current.bottom = false;
		} else {
			positionRef.current.bottom = true;
		}
	}, [elementRef, list.length]);

	return (
		show && (
			<SuggestionListBody
				fadeIn={fadeIn}
				list={list}
				setValue={setValue}
				setState={setState}
				name={name}
				value={value}
				setShow={setShow}
				show={show}
				positionRef={positionRef}
			/>
		)
	);
}
export default SuggestionList;
