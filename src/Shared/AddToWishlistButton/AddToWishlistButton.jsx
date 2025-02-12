import styles from './AddToWishlistButton.module.css';

function AddToWishlistButton(game, setHoverShow, shouldHideRef) {
	return (
		<div className={styles.addToWishlistButton}>
			<div className={`${isWishlistLoading ? `${styles.rotate} ` : ''}${styles.outerCircle}`}>
				{wishlist ? (
					<svg viewBox='-10 -10 468.8 468.8' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M142.8 323.85L35.7 216.75 0 252.45l142.8 142.8 306-306-35.7-35.7z'
							strokeWidth='10'
							fill='currentColor'
							stroke='currentColor'
						/>
					</svg>
				) : (
					<div className={styles.plus} />
				)}
			</div>
		</div>
	);
}
export default AddToWishlistButton;
