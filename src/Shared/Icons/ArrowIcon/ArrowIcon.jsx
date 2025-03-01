export default function ArrowIcon({ id, className, stroke = 'rgba(255, 255, 255, 0.6)' }) {
	return (
		<svg className={`${className || ''}`} id={id} viewBox='0 0 23 23'>
			<path
				d='M 21.5 1.5 L 11.5 21.5 L 1.5 1.5'
				fill='none'
				paintOrder='fill markers'
				stroke={stroke}
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='3px'
			/>
		</svg>
	);
}
