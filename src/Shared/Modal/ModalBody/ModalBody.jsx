import { useEffect, useRef } from 'react';
import useDropDownHide from '../../../Hooks/useDropDownHide';
import ScrollBar from '../../ScrollBar/ScrollBar';
import styles from './ModalBody.module.css';

function ModalBody({ children, setShow, fadeIn, hideEventRef }) {
	const elementRef = useRef(null);
	const parentRef = useRef(null);
	const childRef = useRef(null);
	const { showMenu, setElement, stopMenu } = useDropDownHide(setShow);
	const eventRef = useRef(null);

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
		<div className={`${fadeIn ? `${styles.zoomIn} ` : ''} ${styles.modal}`} ref={elementRef}>
			<div className={styles.modalScrollContainer} ref={parentRef}>
				<div className={styles.modalContentContainer} ref={childRef}>
					{children}
				</div>
			</div>
			<ScrollBar childRef={childRef} parentRef={parentRef} />
			<button className={styles.crossBtn} onClick={eventRef.current.handleHide} type="button">
				<span className={styles.cross} />
			</button>
		</div>
	);
}
export default ModalBody;
