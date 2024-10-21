import { useRef, useState } from 'react';
import Modal from '../../Shared/Modal/Modal/Modal';
import ScreenShadow from '../../Shared/ScreenShadow/ScreenShadow';
import ModalContext from '../Contexts/ModalContext';
import useChangeBodyOverflow from '../Hooks/useChangeBodyOverflow';

const emptyModal = {
	title: null,
	body: null,
	footer: null,
	triggerContainer: null,
};

const withModal = Component =>
	function InnerComponent(props) {
		const [content, setContent] = useState(emptyModal);
		const [show, setShow] = useState(false);

		const eventRefs = useRef(null);

		const { hideBodyOverflow, showBodyOverflow } = useChangeBodyOverflow();

		if (!eventRefs.current) {
			eventRefs.current = {
				hideModal: () => {
					setShow(false);
					setTimeout(() => {
						showBodyOverflow();
						setContent(emptyModal);
					}, 200);
				},
				setContent: (...args) => {
					if (args[0].title && args[0].body) {
						setShow(true);
						hideBodyOverflow();
						setContent(...args);
					} else {
						setShow(false);
						showBodyOverflow();
						eventRefs.current.hideModal();
					}
				},
			};
		}
		return (
			<ModalContext.Provider value={eventRefs.current.setContent}>
				<Component {...props} />
				<Modal content={content} show={show} hideModal={eventRefs.current.hideModal} />
				<ScreenShadow show={show} zIndex={3} />
			</ModalContext.Provider>
		);
	};

export default withModal;
