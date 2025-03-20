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
				hideModal: () => {
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
				},
				setContent: (...args) => {
					if (args[0].title && args[0].body) {
						const parent = args[0].parentElement;

						// get parent x and y position
						if (parent) {
							const parentRect = parent.getBoundingClientRect();

							let { x, y } = parentRect;

							const { width, height } = parentRect;

							const screenWidth = window.innerWidth;
							const screenHeight = window.innerHeight;

							y += height / 2;

							let quadrant;

							// find which quadrant the parent is in
							if (x >= screenWidth / 2 && y < screenHeight / 2) {
								x += width;
								quadrant = 'top-right';
							} else if (x < screenWidth / 2 && y >= screenHeight / 2) {
								y += height;
								quadrant = 'bottom-left';
							} else if (x >= screenWidth / 2 && y >= screenHeight / 2) {
								x += width;
								y += height;
								quadrant = 'bottom-right';
							}

							args[0].parentElement = {
								x,
								y,
								quadrant,
							};
						}

						setShow(true);
						hideBodyOverflow();
						setContent(...args);
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
