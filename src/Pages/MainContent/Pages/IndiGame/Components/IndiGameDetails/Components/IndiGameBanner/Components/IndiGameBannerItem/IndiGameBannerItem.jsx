import { useEffect, useRef, useState } from 'react';
import Image from '../../../../../../../../../../Shared/Image/Image';
import VideoPlayer from '../../../../../../../../../../Shared/VideoPlayer/VideoPlayer/VideoPlayer';
import styles from './IndiGameBannerItem.module.css';

export default function IndiGameBannerItem({ data, active, index }) {
	const [shouldShow, setShouldShow] = useState(false);
	const shouldShowRef = useRef(false);

	useEffect(() => {
		if (active === index && !shouldShowRef.current) {
			if (data.type === 'photo') {
				setShouldShow(true);
				shouldShowRef.current = true;
			} else {
				setTimeout(() => {
					setShouldShow(true);
					shouldShowRef.current = true;
				}, 250);
			}
		}
	}, [active, data, index]);

	return (
		<li className={styles.individualGameBannerItem}>
			{shouldShow ? (
				data.type === 'photo' ? (
					<Image
						alt={`Carousel number-${index}`}
						data={data.cover}
						aspectRatioClassName={styles.aspectRatioClassName}
					/>
				) : (
					<VideoPlayer
						changePause={active}
						src={data.cover}
						{...(data.captions && { captions: data.captions })}
						aspectRatioClassName={styles.aspectRatioClassName}
					/>
				)
			) : null}
		</li>
	);
}
