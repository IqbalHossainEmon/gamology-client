import { useEffect, useState } from 'react';
import styles from './ImageError.module.css';

function ImageError({ alt }) {
	const [hide, setHide] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setHide(false);
		}, 0);
	}, []);

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={`${styles.errorIcon}${hide ? ` ${styles.hide}` : ''}`}
			viewBox='0 0 21 22'
		>
			<title>{alt}</title>
			<path
				d='M16.197 1.801l-3.859 7.333-2.944 5.439-4.94-4.359-3.48 3.48-.001-8.649a1 1 0 0 1 1-1h10.786L14.429.87l1.48.93zM8.49 16.442l-2.637 5.01-1.765-.929 1.304-2.479-3.419.001a1 1 0 0 1-1-1l.001-.522 3.565-3.566 3.951 3.485zm1.483-8.897a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm11 9.5a1 1 0 0 1-1 1H9.907l3.914-7.438 7.153 6.156-.001.282zm.001-2.92L14.777 8.79l2.498-4.747 2.698.001a1 1 0 0 1 1 1l.001 9.08z'
				fillRule='evenodd'
				fill='currentColor'
			/>
		</svg>
	);
}
export default ImageError;
