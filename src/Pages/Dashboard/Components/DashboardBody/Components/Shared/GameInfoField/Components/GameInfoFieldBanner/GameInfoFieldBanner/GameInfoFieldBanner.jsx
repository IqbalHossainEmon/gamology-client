import { useState } from 'react';
import ButtonWithRipple from '../../../../../../../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import BannerInputFieldContainer from '../BannerInputFieldContainer/BannerInputFieldContainer';
import styles from './GameInfoFieldBanner.module.css';

export default function GameInfoFieldBanner({
	gameBanner,
	errorMessages,
	errorChange,
	hasDefault,
	defaultGameBanner,
}) {
	const [fieldCount, setFieldCount] = useState(hasDefault ? defaultGameBanner.length : 1);

	return (
		<section className={styles.addGameBanner}>
			<h3 className={styles.header}>
				{hasDefault ? 'Edit' : 'Add'} Game&#39;s Banner Images or Videos
			</h3>
			<div className={styles.textFieldContainer}>
				{[...Array(fieldCount).keys()].map((arr, i) => (
					<BannerInputFieldContainer
						errorChange={errorChange}
						errorMessages={errorMessages.current.gameBannerError}
						gameBanner={gameBanner}
						hasDefault={hasDefault}
						key={arr}
						number={arr}
						{...(hasDefault && { defaultGameBanner: defaultGameBanner[i] })}
					/>
				))}
			</div>
			<div className={styles.btnContainer}>
				<div className={styles.btn}>
					<ButtonWithRipple
						{...(fieldCount === 15 && { disabled: true })}
						onClick={() => {
							setFieldCount(prev => prev + 1);
							gameBanner.current.gameBanner.push({ cover: '', thumb: '', type: '' });
						}}
					>
						Add More +
					</ButtonWithRipple>
				</div>
				<div className={styles.btn}>
					<ButtonWithRipple
						{...(fieldCount === 1 && { disabled: true })}
						onClick={() => {
							setFieldCount(prev => --prev);
							gameBanner.current.gameBanner.pop();
						}}
					>
						Remove One -
					</ButtonWithRipple>
				</div>
			</div>
		</section>
	);
}
