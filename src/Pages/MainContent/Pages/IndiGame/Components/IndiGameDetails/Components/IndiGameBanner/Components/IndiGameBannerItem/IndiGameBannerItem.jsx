import { useEffect, useRef, useState } from 'react';
import Image from '../../../../../../../../../../Shared/Image/Image/Image';
import VideoPlayer from '../../../../../../../../../../Shared/VideoPlayer/VideoPlayer/VideoPlayer';
import styles from './IndiGameBannerItem.module.css';

export default function IndiGameBannerItem({ data, active, index }) {
	const [shouldShow, setShouldShow] = useState(false);
	const shouldShowRef = useRef(false);

	useEffect(() => {
		if (active === index && !shouldShowRef.current) {
			setShouldShow(true);
			shouldShowRef.current = true;
		}
	}, [active, data, index]);

	return (
		<li className={styles.individualGameBannerItem}>
			{shouldShow || index === 0 ? (
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
