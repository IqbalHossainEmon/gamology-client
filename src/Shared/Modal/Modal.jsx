import { useEffect, useRef } from 'react';
import useDropDownHide from '../../Hooks/useDropDownHide';
import ScrollBar from '../ScrollBar/ScrollBar';
import styles from './Modal.module.css';

const Modal = ({ children, setShow, fadeIn, hideEventRef }) => {
	const elementRef = useRef(null);
	const parentRef = useRef(null);
	const childRef = useRef(null);

	const { showMenu, setElement, stopMenu } = useDropDownHide(setShow);

	const eventRef = useRef();

	if (!eventRef.current) {
		eventRef.current = {
			handleHide: () => {
				setShow(false);
				stopMenu();
			},
		};
	}
	useEffect(() => {
		setElement(elementRef.current);
		showMenu();
		if (hideEventRef) {
			hideEventRef.current.handleHide = eventRef.current.handleHide;
		}
	}, [hideEventRef, setElement, showMenu]);

	return (
		<div ref={elementRef} className={`${fadeIn ? `${styles.zoomIn} ` : ''} ${styles.modal}`}>
			<div ref={parentRef} className={styles.modalScrollContainer}>
				<div className={styles.modalContentContainer} ref={childRef}>
					{children}
				</div>
			</div>
			<ScrollBar parentRef={parentRef} childRef={childRef} />
			<button onClick={eventRef.current.handleHide} type='button' className={styles.crossBtn}>
				<span className={styles.cross} />
			</button>
		</div>
	);
};
export default Modal;
