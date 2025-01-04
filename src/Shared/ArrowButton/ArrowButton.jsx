import styles from './ArrowButton.module.css';

export default function ArrowButton({ name, handleClick, className, disabled }) {
	return (
		<button
			className={[className, styles.btn].join(' ')}
			disabled={disabled}
			name={name}
			onClick={handleClick}
			type='button'
		>
			<svg
				className={styles.btnImg}
				version='1.1'
				viewBox='0 0 490 490'
				x='0px'
				xmlSpace='preserve'
				y='0px'
			>
				<g>
					<polygon points='0,249.888 245.004,8.139 490,249.888 490,481.861 245.004,239.71 0,481.861 			' />
				</g>
			</svg>
		</button>
	);
}
