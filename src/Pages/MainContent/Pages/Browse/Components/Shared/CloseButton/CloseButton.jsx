import styles from './CloseButton.module.css';

export default function CloseButton({ setState, state }) {
	return (
		<button
			className={`${styles.container} ${styles.zoom_shrink}`}
			onClick={() => setState(state)}
			type='button'
		>
			<div className={`${styles.close_icon} ${styles.zoom_shrink}`} />
		</button>
	);
}
