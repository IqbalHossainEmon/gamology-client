import Image from '../Image/Image/Image';
import styles from './ImageWithHover.module.css';

function ImageWithHover({ cardHover, ...props }) {
	return (
		<div className={styles.imageWithHover}>
			<Image {...props} />
			{cardHover}
		</div>
	);
}
export default ImageWithHover;
