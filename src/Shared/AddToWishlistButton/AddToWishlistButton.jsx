import styles from './AddToWishlistButton.module.css';

function AddToWishlistButton(game, setHoverShow, shouldHideRef) {
	return (
		<div className={styles.addToWishlistButton}>
			<button type='button' className={styles.addToWishlistButton}>
				<span className={styles.addToWishlistButtonIcon} />
				<span className={styles.addToWishlistButtonText}>Add to Wishlist</span>
			</button>
		</div>
	);
}
export default AddToWishlistButton;
