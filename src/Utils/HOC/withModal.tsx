import { useCallback, useRef, useState, type ComponentType } from 'react';

import Modal from '../../Shared/Modal/Modal/Modal';
import ScreenShadow from '../../Shared/ScreenShadow/ScreenShadow';
import { HideModalContext, SetModalContext } from '../Contexts/ModalContext';
import useChangeBodyOverflow from '../Hooks/useChangeBodyOverflow';

export type ModalContent = {
	title: string | null;
	body: string | React.ReactNode | null;
	footer?: string | React.ReactNode | null;
	parentElement?: HTMLElement | null;
	originPoint?: {
		top: number;
		left: number;
	} | null;
	e?: React.MouseEvent;
};


const emptyModal: ModalContent = {
	title: null,
	body: null,
	footer: null,
	parentElement: null,
};


export type SetModalContextType = (value: ModalContent) => void;
export type HideModalContextType = () => void;


const withModal = <P extends object>(Component: ComponentType<P>) =>
	function InnerComponent(props: P) {
		const [content, setContent] = useState(emptyModal);
		const [show, setShow] = useState(false);
		const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

		const { hideBodyOverflow, showBodyOverflow } = useChangeBodyOverflow();

		const handleKeyDown = useCallback(
			(event: KeyboardEvent) => {
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

		const hideModal: HideModalContextType = useCallback(() => {
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

		const handleSetContent: SetModalContextType = useCallback(
			value => {
				if (value.title && value.body) {
					const { e } = value;

					// get parent x and y position
					if (e) {
						const { pageX, pageY } = e;
						value.originPoint = {
							top: pageY,
							left: pageX,
						};
					}

					setShow(true);
					hideBodyOverflow();
					setContent(value);

					document.addEventListener('keydown', handleKeyDown);
				}
			},
			[handleKeyDown, hideBodyOverflow]
		);

		return (
			<SetModalContext.Provider value={handleSetContent}>
				<HideModalContext.Provider value={hideModal}>
					<Component {...props} />
					<Modal content={content} show={show} hideModal={hideModal} />
					<ScreenShadow show={show} zIndex={3} />
				</HideModalContext.Provider>
			</SetModalContext.Provider>
		);
	};

export default withModal;
