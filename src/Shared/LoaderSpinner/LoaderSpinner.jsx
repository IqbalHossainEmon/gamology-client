import styles from './LoaderSpinner.module.css';

function LoaderSpinner({ color = '#AF45FF', size = 200 }) {
	return (
		<svg
			className={styles.spinner}
			width={size}
			height={size}
			viewBox='0 0 200 200'
			xmlns='http://www.w3.org/2000/svg'
		>
			<defs>
				<radialGradient
					id='spinnerGradient'
					cx='0.66'
					fx='0.66'
					cy='0.3125'
					fy='0.3125'
					gradientTransform='scale(1.5)'
				>
					<stop offset='0' stopColor={color} />
					<stop offset='0.3' stopColor={color} stopOpacity='0.9' />
					<stop offset='0.6' stopColor={color} stopOpacity='0.6' />
					<stop offset='0.8' stopColor={color} stopOpacity='0.3' />
					<stop offset='1' stopColor={color} stopOpacity='0' />
				</radialGradient>
			</defs>
			<circle
				style={{ transformOrigin: 'center' }}
				className={styles.spinnerCircle}
				fill='none'
				strokeWidth='15'
				strokeLinecap='round'
				strokeDasharray='200 1000'
				strokeDashoffset='0'
				stroke={color}
				cx='100'
				cy='100'
				r='70'
			/>
			<circle
				style={{ transformOrigin: 'center' }}
				fill='none'
				opacity='0.2'
				stroke={color}
				strokeWidth='15'
				strokeLinecap='round'
				cx='100'
				cy='100'
				r='70'
			/>
		</svg>
	);
}

export default LoaderSpinner;
