import styles from './Thumb.module.css';

function Thumb({ style }) {
	const { factor, height } = style;

	return (
		<>
			<div
				className={styles.thumb}
				style={{
					height,
					transform: `
                    matrix3d(
                        1, 0, 0, 0,
                        0, 1, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, -1
                    )
                    scale(${1 / factor})
                    translateZ(${1 - 1 / factor}px)
                    translateZ(-2px)
                `,
				}}
			/>
			<div />
		</>
	);
}
export default Thumb;
