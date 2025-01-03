import ScrollBar from '../../ScrollBar/ScrollBar/ScrollBar';
import styles from './ModalBody.module.css';

function ModalBody({ content, fadeIn, hideModal }) {
	return (
		<div className={`${fadeIn ? `${styles.zoomIn} ` : ''}${styles.modal}`}>
			<ScrollBar>
				<div className={styles.modalContentContainer}>
					<h2 className={styles.header}>{content.title}</h2>
					<div className={styles.body}>{content.body}</div>
					<div>{content.footer}</div>
					<button className={styles.crossBtn} onClick={hideModal} type='button'>
						<span className={styles.cross} />
					</button>
				</div>
			</ScrollBar>
		</div>
	);
}
export default ModalBody;
