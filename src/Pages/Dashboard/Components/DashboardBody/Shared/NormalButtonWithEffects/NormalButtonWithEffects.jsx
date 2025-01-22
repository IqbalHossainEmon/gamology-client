import ButtonWaterEffect from '../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import styles from './NormalButtonWithEffects.module.css';

export default function NormalButtonWithEffects({
	onClick,
	text,
	disabled = false,
	tabIndexOff,
	className,
}) {
	return (
		<div className={`${disabled ? `${styles.disabled} ` : ''}${styles.btnContainer}`}>
			<button
				className={`${styles.btn}${className ? ` ${className}` : ''}`}
				onClick={onClick}
				type='button'
				{...(disabled && { disabled })}
				{...(tabIndexOff && { tabIndex: '-1' })}
			>
				{text}

				<ButtonWaterEffect />
			</button>
		</div>
	);
}
