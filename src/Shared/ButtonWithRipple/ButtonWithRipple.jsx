import RippleEffect from '../RippleEffect/RippleEffect';
import styles from './ButtonWithRipple.module.css';

export default function ButtonWithRipple({
	onClick,
	children,
	disabled = false,
	tabIndexOff,
	className,
	containerClassName,
	btnRef,
	long,
	rippleColor,
}) {
	return (
		<div
			className={`${disabled ? `${styles.disabled} ` : ''}${styles.btnContainer}${containerClassName ? ` ${containerClassName}` : ''}`}
		>
			<button
				className={`${styles.btn}${className ? ` ${className}` : ''}`}
				onClick={onClick}
				{...(btnRef && { ref: btnRef })}
				type='button'
				{...(disabled && { disabled })}
				{...(tabIndexOff && { tabIndex: '-1' })}
			>
				{children}
				<RippleEffect long={long} background={rippleColor} />
			</button>
		</div>
	);
}
