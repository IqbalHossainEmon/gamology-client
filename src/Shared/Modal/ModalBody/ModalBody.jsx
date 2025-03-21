import { useEffect, useRef, useState } from 'react';
import useScreenWidth from '../../../Utils/Hooks/useScreenWidth';
import ScrollBar from '../../ScrollBar/ScrollBar/ScrollBar';
import styles from './ModalBody.module.css';

function ModalBody({ content, fadeIn, hideModal }) {
	const [style, setStyle] = useState({
		top: 0,
		left: 0,
		translate: '0 0',
	});

	const containerRef = useRef(null);

	const crossBtnRef = useRef(null);

	const hiddenButton = useRef(null);

	const { heightInPixels, widthInPixels } = useScreenWidth();

	useEffect(() => {
		if (content.originPoint) {
			const { left, top } = content.originPoint;

			const centerX = window.innerWidth / 2;
			const centerY = window.innerHeight / 2;

			const newStyle = {
				left: `${left}px`,
				top: `${top}px`,
				translate: `calc(-50% - ${left - centerX}px) calc(-50% - ${top - centerY}px)`,
			};

			setStyle(newStyle);
		} else {
			const newStyle = {
				left: '50%',
				top: '50%',
			};
			setStyle(newStyle);
		}
	}, [content, heightInPixels, widthInPixels]);

	// Focus trap effect
	useEffect(() => {
		const container = containerRef.current;

		if (!fadeIn || !container) return;

		const focusableSelector =
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

		const getFocusableElements = () =>
			Array.from(container.querySelectorAll(focusableSelector)).filter(
				el =>
					!el.hasAttribute('disabled') &&
					el.offsetParent !== null &&
					el.getAttribute('tabindex') !== '-1' &&
					el.name !== 'hiddenButton'
			);

		const handleKeyDown = e => {
			if (e.key !== 'Tab') return;

			const focusableElements = getFocusableElements();
			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			// If no element in modal is currently focused, focus the first element

			if (
				!container.contains(document.activeElement) ||
				document.activeElement === hiddenButton.current
			) {
				e.preventDefault();
				firstElement?.focus();
				return;
			}

			if (e.shiftKey) {
				// Shift + Tab (backward)
				if (document.activeElement === firstElement) {
					e.preventDefault();
					lastElement?.focus();
				}
			}
			// Tab (forward)
			if (!e.shiftKey && document.activeElement === lastElement) {
				e.preventDefault();
				firstElement?.focus();
			}
		};

		container.addEventListener('keydown', handleKeyDown);

		// Set initial focus after animation
		const focusTimeout = setTimeout(() => {
			const hiddenElement = hiddenButton.current;
			hiddenElement.focus();
		}, 250);

		return () => {
			clearTimeout(focusTimeout);
			if (container) {
				container.removeEventListener('keydown', handleKeyDown);
			}
		};
	}, [fadeIn]);

	return (
		<div
			ref={containerRef}
			className={`${fadeIn ? styles.zoomIn : styles.noSelect} ${styles.modal}`}
			{...(content.originPoint && fadeIn
				? {
						style,
					}
				: { style: (({ translate, ...rest }) => rest)(style) })}
		>
			<ScrollBar>
				<div className={styles.modalContentContainer}>
					<h2 className={styles.header}>{content.title}</h2>
					<div className={styles.body}>{content.body}</div>
					<div>{content.footer}</div>
					<button
						ref={crossBtnRef}
						className={styles.crossBtn}
						onClick={hideModal}
						type='button'
						tabIndex={0}
						aria-label='Close modal'
					>
						<span className={styles.cross} />
					</button>
					<button
						type='button'
						tabIndex={0}
						name='hiddenButton'
						ref={hiddenButton}
						style={{
							width: '0px',
							height: '0px',
							overflow: 'hidden',
							outline: 'none',
							border: 'none',
						}}
					/>
				</div>
			</ScrollBar>
		</div>
	);
}
export default ModalBody;
