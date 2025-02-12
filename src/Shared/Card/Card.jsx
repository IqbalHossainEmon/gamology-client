import { useRef } from 'react';
import DiscountPriceWithPercent from '../DiscountPriceWithPercent/DiscountPriceWithPercent';
import ImageWithHover from '../ImageWithHover/ImageWithHover';
import styles from './Card.module.css';

export default function Card({ cardInfo, style, className, dotMenu, link }) {
	const parentRef = useRef(null);
	const { id, name, img, price } = cardInfo;

	const mainBody = (
		<>
			<div className={styles.cardImg}>
				<ImageWithHover
					data={img}
					alt={`${name}-cardThumb`}
					aspectRatioClassName={styles.aspectRatioClassName}
				/>
			</div>
			<h4 className={styles.name}>{name}</h4>
			<div className={styles.price}>
				<DiscountPriceWithPercent price={price} />
			</div>
		</>
	);

	return (
		<li
			className={`${className ? `${className} ` : ''}${styles.card}`}
			{...(style && { style })}
		>
			<div className='hover-shadow' ref={parentRef}>
				{link ? <a href={`${link}/${id}`}>{mainBody}</a> : mainBody}
				{dotMenu ? dotMenu(parentRef, cardInfo) : null}
			</div>
		</li>
	);
}
