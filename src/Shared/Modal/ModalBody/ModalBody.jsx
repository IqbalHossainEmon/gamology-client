import { useRef } from 'react';
import ScrollBar from '../../ScrollBar/ScrollBar/ScrollBar';
import styles from './ModalBody.module.css';

function ModalBody({ content, fadeIn, hideModal }) {
	const elementRef = useRef(null);
	const parentRef = useRef(null);
	const childRef = useRef(null);

	return (
		<div className={`${fadeIn ? `${styles.zoomIn} ` : ''}${styles.modal}`} ref={elementRef}>
			<div className={styles.modalScrollContainer} ref={parentRef}>
				<div className={styles.modalContentContainer} ref={childRef}>
					<h2 className={styles.header}>{content.title}</h2>
					<div className={styles.headerQuestion}>{content.body}</div>
					<div>{content.footer}</div>
					<button className={styles.crossBtn} onClick={hideModal} type='button'>
						<span className={styles.cross} />
					</button>
				</div>
			</div>
			<ScrollBar childRef={childRef} parentRef={parentRef} mainParentRef={elementRef} />
		</div>
	);
}
export default ModalBody;
