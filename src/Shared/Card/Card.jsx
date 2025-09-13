import { useRef } from 'react';
import useTextConverter from '../../Utils/Hooks/useTextConverter';
import DiscountPriceWithPercent from '../DiscountPriceWithPercent/DiscountPriceWithPercent';
import ImageWithHover from '../ImageWithHover/ImageWithHover';
import styles from './Card.module.css';

export default function Card({ cardInfo, style, className, dotMenu, link, isCurrentlyActive }) {
	const parentRef = useRef(null);
	const { name, img, price } = cardInfo;

	const { convertNameToLink } = useTextConverter();

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
				{link ? (
					<a
						href={isCurrentlyActive ? `${link}/${convertNameToLink(name)}` : undefined}
						tabIndex={isCurrentlyActive ? 0 : -1}
						aria-disabled={!isCurrentlyActive}
						{...(isCurrentlyActive && {
							href: `${link}/${convertNameToLink(name)}`,
							className: styles.activeNow,
						})}
					>
						{mainBody}
					</a>
				) : (
					mainBody
				)}
				{dotMenu && isCurrentlyActive ? dotMenu(parentRef, cardInfo) : null}
			</div>
		</li>
	);
}
