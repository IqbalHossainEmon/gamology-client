import { useRef, useState } from 'react';
import RotateArrow from '../../../../../../../../../../Shared/RotateArrow/RotateArrow';
import useScreenWidth from '../../../../../../../../../../Utils/Hooks/useScreenWidth';
import styles from './IndiGameTextDescription.module.css';

export default function IndiGameTextDescription({ descriptions }) {
	const elementRef = useRef(null);
	const [show, setShow] = useState(false);
	const [transition, setTransition] = useState(false);

	const { remHeightInPixels } = useScreenWidth();

	return (
		<div>
			<div
				className={`${transition ? `${styles.showTransition} ` : ''}${styles.individualGameDetailDescriptionContainer}`}
				{...(elementRef?.current?.offsetHeight && {
					style: show
						? transition
							? {
									height: `${(elementRef?.current?.offsetHeight || 0) / remHeightInPixels + 3}rem`,
								}
							: { height: 'auto' }
						: { height: `${500 / remHeightInPixels}rem` },
				})}
			>
				<div className={styles.individualGameDetailDescription} ref={elementRef}>
					{descriptions.map(description => (
						<div className={styles.descriptionContainer} key={description.id}>
							{description.mainHeader ? (
								<h2 className={styles.mainHeader}>{description.mainHeader}</h2>
							) : null}
							{description.subHeader ? (
								<strong className={styles.subHeader}>
									{description.subHeader}
								</strong>
							) : null}

							{description.description ? (
								<p className={styles.description}>{description.description}</p>
							) : null}
							{description.subHeader &&
							!description.description &&
							description.mainHeader ? (
								<div>
									<em className={styles.subHeader}>{description.subHeader}</em>
								</div>
							) : null}
						</div>
					))}
				</div>
			</div>
			{elementRef.current?.offsetHeight > 500 && (
				<div className={styles.showHideButtonContainer}>
					<button
						className={styles.showHideButton}
						onClick={() => {
							if (show) {
								setTransition(true);
								setTimeout(() => {
									setShow(false);
								}, 0);
							} else {
								setShow(true);
								setTransition(true);
							}
							setTimeout(() => {
								setTransition(false);
							}, 300);
						}}
						type='button'
					>
						Show {show ? 'Less' : 'More'}
						<div className={styles.rotateArrowContainer}>
							<div className={styles.rotateArrow}>
								<RotateArrow state={show} />
							</div>
						</div>
					</button>

					<div className={`${show ? styles.hide : styles.show} ${styles.darkShadow}`} />
				</div>
			)}
		</div>
	);
}
