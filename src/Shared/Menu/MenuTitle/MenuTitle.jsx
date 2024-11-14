import RotateArrow from '../../RotateArrow/RotateArrow';
import styles from './MenuTitle.module.css';

function MenuTitle({ name, icon, parentState, state, noHover, paddingRight }) {
	return (
		<div
			className={`${parentState ? `${styles.paddingBot} ` : ''}${noHover ? '' : `${styles.hover} `}${styles.container}`}
		>
			{icon && <span className={styles.iconContainer}>{icon}</span>}
			{name}
			<div
				className={`${parentState ? `${styles.arrowBottom} ` : ``}${styles.arrow}${paddingRight ? ` ${styles.paddingRight}` : ''}`}
			>
				<RotateArrow state={state} />
			</div>
		</div>
	);
}

export default MenuTitle;
