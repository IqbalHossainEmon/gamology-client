import useAppearDisappear from '../../Utils/Hooks/useAppearDisappear';
import styles from './ScreenShadow.module.css';

export default function ScreenShadow({ show: state, zIndex }) {
	const [show, fadeIn] = useAppearDisappear(state, true);

	return (
		show && (
			<div
				className={`${styles.shadowPage}${fadeIn ? ` ${styles.shadowShow}` : ''}`}
				{...(zIndex && { style: { zIndex } })}
			/>
		)
	);
}
