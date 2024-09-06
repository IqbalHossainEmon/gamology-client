import styles from './ToastBody.module.css';

// svg icons
const icons = {
	success: (
		<svg
			fill='#007e33'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 52 52'
			enableBackground='new 0 0 52 52'
			xmlSpace='preserve'
			width={24}
			height={24}
		>
			<g strokeWidth='0' />
			<g strokeLinecap='round' strokeLinejoin='round' />
			<g>
				<path d='M26,2C12.7,2,2,12.7,2,26s10.7,24,24,24s24-10.7,24-24S39.3,2,26,2z M39.4,20L24.1,35.5 c-0.6,0.6-1.6,0.6-2.2,0L13.5,27c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0l4.4,4.5c0.4,0.4,1.1,0.4,1.5,0L35,15.5 c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2C40.1,18.3,40.1,19.3,39.4,20z' />
			</g>
		</svg>
	),
	error: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 1200 1200'
			fill='#cc0000'
			stroke='#cc0000'
			strokeWidth='0.012'
		>
			<g>
				<path d='M600,0C268.629,0,0,268.629,0,600s268.629,600,600,600s600-268.629,600-600 S931.371,0,600,0z M197.314,439.453h805.371v321.094H197.314V439.453z' />
			</g>
		</svg>
	),
	info: (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24.00 24.00'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			stroke='#0099cc'
		>
			<g strokeWidth='0' />
			<g strokeLinecap='round' strokeLinejoin='round' stroke='#CCCCCC' strokeWidth='0.288' />
			<g>
				<path d='M12 17V11' stroke='#0099cc' strokeWidth='2.4' strokeLinecap='round' />
				<circle cx='1' cy='1' r='1' transform='matrix(1 0 0 -1 11 9)' fill='#0099cc' />
				<path
					d='M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7'
					stroke='#0099cc'
					strokeWidth='2.4'
					strokeLinecap='round'
				/>
			</g>
		</svg>
	),
	warning: (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			width={24}
			height={24}
		>
			<g strokeWidth='0' />
			<g strokeLinecap='round' strokeLinejoin='round' />
			<g>
				<path
					d='M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z'
					stroke='#ffcc00'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M12 9V13'
					stroke='#ffcc00'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M12 17.0195V17'
					stroke='#ffcc00'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
		</svg>
	),
};

function ToastBody({ fadeIn, handleHide, data }) {
	console.log(data);

	const { toastTitle, toastMessage, type } = data;
	return (
		<li className={`${fadeIn ? `${styles.zoomIn} ` : ''} ${styles.toast} ${styles[type]}`}>
			<div className={styles.icon}>{icons[type]}</div>
			<div className={styles.content}>
				<h3>{toastTitle}</h3>
				<p>{toastMessage}</p>
			</div>
			<button className={styles.crossBtn} onClick={handleHide} type='button'>
				<span className={styles.cross} />
			</button>
		</li>
	);
}

export default ToastBody;
