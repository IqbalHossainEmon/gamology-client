import RippleEffect from '../../../../../../Shared/RippleEffect/RippleEffect';
import styles from './ButtonWithRipple.module.css';

export default function ButtonWithRipple({
	onClick,
	children,
	disabled = false,
	tabIndexOff,
	className,
	containerClassName,
}) {
	return (
		<div
			className={`${disabled ? `${styles.disabled} ` : ''}${styles.btnContainer}${containerClassName ? ` ${containerClassName}` : ''}`}
		>
			<button
				className={`${styles.btn}${className ? ` ${className}` : ''}`}
				onClick={onClick}
				type='button'
				{...(disabled && { disabled })}
				{...(tabIndexOff && { tabIndex: '-1' })}
			>
				{children}

				<RippleEffect />
			</button>
		</div>
	);
}
