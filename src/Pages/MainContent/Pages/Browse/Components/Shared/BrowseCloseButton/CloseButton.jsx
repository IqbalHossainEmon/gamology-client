import styles from './CloseButton.module.css';

export default function BrowseCloseButton({ setState }) {
	return (
		<button
			className={`${styles.container} ${styles.zoom_shrink}`}
			onClick={() => setState(false)}
			type='button'
		>
			<div className={`${styles.close_icon} ${styles.zoom_shrink}`} />
		</button>
	);
}
