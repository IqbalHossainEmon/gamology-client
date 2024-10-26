import RotateArrow from '../RotateArrow/RotateArrow';
import styles from './MenuTitle.module.css';

function MenuTitle({ name, icon, parentState, state, noHover }) {
	return (
		<div className={`${noHover ? '' : `${styles.hover} `}${styles.container}`}>
			{icon && <span className={styles.iconContainer}>{icon}</span>}
			{name}
			<div className={`${parentState ? `${styles.arrowBottom} ` : ``}${styles.arrow}`}>
				<RotateArrow state={state} />
			</div>
		</div>
	);
}

export default MenuTitle;
