import { useRef, useState } from 'react';
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

		const eventRefs = useRef(null);

		const { hideBodyOverflow, showBodyOverflow } = useChangeBodyOverflow();

		if (!eventRefs.current) {
			let timerID = null;
			eventRefs.current = {
				handleKeyDown: event => {
					if (event.key === 'Escape') {
						if (timerID) {
							clearTimeout(timerID);
							timerID = null;
						}
						setShow(false);
						timerID = setTimeout(() => {
							showBodyOverflow();
							setContent(emptyModal);
							timerID = null;
						}, 200);
					}
				},
				hideModal: () => {
					if (timerID) {
						clearTimeout(timerID);
						timerID = null;
					}
					document.removeEventListener('keydown', eventRefs.current.handleKeyDown);
					setShow(false);
					timerID = setTimeout(() => {
						showBodyOverflow();
						setContent(emptyModal);
						timerID = null;
					}, 200);
				},
				setContent: (...args) => {
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

						document.addEventListener('keydown', eventRefs.current.handleKeyDown);
					}
				},
			};
		}
		return (
			<setModalContext.Provider value={eventRefs.current.setContent}>
				<hideModalContext.Provider value={eventRefs.current.hideModal}>
					<Component {...props} />
					<Modal content={content} show={show} hideModal={eventRefs.current.hideModal} />
					<ScreenShadow show={show} zIndex={3} />
				</hideModalContext.Provider>
			</setModalContext.Provider>
		);
	};

export default withModal;
