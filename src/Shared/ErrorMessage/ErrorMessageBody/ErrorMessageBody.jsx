import { useEffect, useRef } from 'react';
import styles from './ErrorMessageBody.module.css';

function ErrorMessageBody({ errorMessage, fadeIn }) {
	const errorMessageRef = useRef(null);
	const errorMessageContainer = useRef(null);
	const resizeObserver = useRef(null);

	useEffect(() => {
		resizeObserver.current = new ResizeObserver(() => {
			if (errorMessageContainer.current) {
				errorMessageContainer.current.style.setProperty(
					'--error-message-height',
					`${errorMessageRef.current.scrollHeight}px`
				);
			} else {
				resizeObserver.current.disconnect();
			}
		});
	}, []);

	useEffect(() => {
		resizeObserver.current.observe(errorMessageContainer.current);
		return () => {
			resizeObserver.current.disconnect();
		};
	}, []);

	return (
		<div
			className={`${styles.errorMessageContainer}${fadeIn ? ` ${styles.fadeIn}` : ''}`}
			ref={errorMessageContainer}
		>
			<div className={styles.errorMessage} ref={errorMessageRef}>
				<p>{errorMessage}</p>
				<div className={styles.info}>
					<svg
						fill='#ffffff'
						height='1.2rem'
						version='1.1'
						viewBox='-41.7 -41.7 500.38 500.38'
						width='1.2rem'
						xmlSpace='preserve'
						xmlns='http://www.w3.org/2000/svg'
					>
						<g
							strokeWidth='0'
							transform='translate(120.92390999999999,120.92390999999999), scale(0.42)'
						/>
						<g
							stroke='#CCCCCC'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='1.667916'
						/>
						<g>
							<g>
								<path d='M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786 c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576 c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765 c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z' />
							</g>
						</g>
					</svg>
				</div>
			</div>
		</div>
	);
}
export default ErrorMessageBody;
