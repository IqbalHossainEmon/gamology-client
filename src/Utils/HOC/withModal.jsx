import { useCallback, useRef, useState } from 'react';

import Modal from '../../Shared/Modal/Modal/Modal';
import ScreenShadow from '../../Shared/ScreenShadow/ScreenShadow';
import { hideModalContext, setModalContext } from '../Contexts/ModalContext';
import useChangeBodyOverflow from '../Hooks/useChangeBodyOverflow';

const emptyModal = {
	title: null,
	body: null,
	footer: null,
	parentElement: null,
};

const withModal = Component =>
	function InnerComponent(props) {
		const [content, setContent] = useState(emptyModal);
		const [show, setShow] = useState(false);
		const timerIdRef = useRef(null);

		const { hideBodyOverflow, showBodyOverflow } = useChangeBodyOverflow();

		const handleKeyDown = useCallback(
			event => {
				if (event.key === 'Escape') {
					if (timerIdRef.current) {
						clearTimeout(timerIdRef.current);
						timerIdRef.current = null;
					}
					setShow(false);
					timerIdRef.current = setTimeout(() => {
						showBodyOverflow();
						setContent(emptyModal);
						timerIdRef.current = null;
					}, 200);
				}
			},
			[showBodyOverflow]
		);

		const hideModal = useCallback(() => {
			if (timerIdRef.current) {
				clearTimeout(timerIdRef.current);
				timerIdRef.current = null;
			}
			document.removeEventListener('keydown', handleKeyDown);
			setShow(false);
			timerIdRef.current = setTimeout(() => {
				showBodyOverflow();
				setContent(emptyModal);
				timerIdRef.current = null;
			}, 200);
		}, [handleKeyDown, showBodyOverflow]);

		const handleSetContent = useCallback(
			(...args) => {
				if (args[0].title && args[0].body) {
					const { e } = args[0];

					// get parent x and y position
					if (e) {
						const { pageX, pageY } = e;
						args[0].originPoint = {
							top: pageY,
							left: pageX,
						};
					}

					setShow(true);
					hideBodyOverflow();
					setContent(...args);

					document.addEventListener('keydown', handleKeyDown);
				}
			},
			[handleKeyDown, hideBodyOverflow]
		);

		return (
			<setModalContext.Provider value={handleSetContent}>
				<hideModalContext.Provider value={hideModal}>
					<Component {...props} />
					<Modal content={content} show={show} hideModal={hideModal} />
					<ScreenShadow show={show} zIndex={3} />
				</hideModalContext.Provider>
			</setModalContext.Provider>
		);
	};

export default withModal;
