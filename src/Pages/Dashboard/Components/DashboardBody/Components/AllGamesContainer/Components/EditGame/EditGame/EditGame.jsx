import { useEffect, useRef, useState } from 'react';
import useObjectUtilities from '../../../../../../../../../Utils/Hooks/useObjectUtilities';
import useToast from '../../../../../../../../../Utils/Hooks/useToast';
import GameInfoField from '../../../../GameInfoField/GameInfoField/GameInfoField';
import styles from './EditGame.module.css';

const data = {
	gameInfo: {
		name: 'Spiderman - Miles Morales',
		developer: 'Playstation',
		publisher: 'Sony',
		logo: '/assets/images/CarouselInfo/spiderman-logo.png',
		phoneLogo: '/assets/images/spiderman-logo-cover.avif',
		releaseDate: {
			day: 3,
			month: 2,
			year: 2012,
		},
		price: '0.69',
	},
	gameBanner: [
		{
			id: 0,
			type: 'video',
			cover: `/assets/images/IndiGameBanner/spider-carousel-v-1.mp4`,
			thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-1.avif`,
		},
		{
			id: 1,
			type: 'video',
			cover: `/assets/images/IndiGameBanner/spider-carousel-v-2.mp4`,
			thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-2.avif`,
		},
		{
			id: 2,
			type: 'video',
			cover: `/assets/images/IndiGameBanner/spider-carousel-v-3.mp4`,
			thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-3.avif`,
		},
		{
			id: 3,
			type: 'image',
			cover: `/assets/images/IndiGameBanner/spider-carousel-1.jpg`,
			thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-4.avif`,
		},
		{
			id: 4,
			type: 'image',
			cover: `/assets/images/IndiGameBanner/spider-carousel-2.jpg`,
			thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-5.avif`,
		},
		{
			id: 5,
			type: 'image',
			cover: `/assets/images/IndiGameBanner/spider-carousel-3.jpg`,
			thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-6.avif`,
		},
		{
			id: 6,
			type: 'image',
			cover: `/assets/images/IndiGameBanner/spider-carousel-4.jpg`,
			thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-7.avif`,
		},
		{
			id: 8,
			type: 'image',
			cover: `/assets/images/IndiGameBanner/spider-carousel-6.jpg`,
			thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-9.avif`,
		},
		{
			id: 7,
			type: 'image',
			cover: `/assets/images/IndiGameBanner/spider-carousel-5.jpg`,
			thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-8.avif`,
		},
		{
			id: 9,
			type: 'image',
			cover: `/assets/images/IndiGameBanner/spider-carousel-7.jpg`,
			thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-10.avif`,
		},
		{
			id: 10,
			type: 'image',
			cover: `/assets/images/IndiGameBanner/spider-carousel-8.jpg`,
			thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-11.avif`,
		},
		{
			id: 11,
			type: 'image',
			cover: `/assets/images/IndiGameBanner/spider-carousel-9.jpg`,
			thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-12.avif`,
		},
	],
	gameDescriptions: {
		descriptions: [
			{
				mainHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
				subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. ',
			},
			{
				subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. ',
			},
			{
				description:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. ',
				subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			},
			{
				mainHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
				subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. ',
			},
			{
				description:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. ',
				subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			},
			{
				description:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. ',
				subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			},
			{
				subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			},
			{
				subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			},
			{
				subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			},
		],
		shortDesc:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. ',
	},
	gameSpecifications: {
		spec: [
			{
				for: 'Windows',
				systemReq: [
					[
						{
							key: 'CPU',
							value: 'dual Core',
						},
						{
							key: 'CPU',
							value: 'Ryzen 5 3600',
						},
					],
					[
						{
							key: 'Memory',
							value: '8GB',
						},
						{
							key: 'Memory',
							value: '16GB',
						},
					],
					[
						{
							key: 'GPU',
							value: 'GTX 1060',
						},
						{
							key: 'GPU',
							value: 'RTX 3060',
						},
					],
					[
						{
							key: 'Storage',
							value: '100GB',
						},
						{
							key: 'Storage',
							value: '100GB SSD',
						},
					],
					[
						{
							key: 'VRM',
							value: '4GB',
						},
						{
							key: 'VRM',
							value: '8GB',
						},
					],
					[
						{
							key: 'DirectX',
							value: 'DirectX 11',
						},
						{
							key: 'DirectX',
							value: 'DirectX 12',
						},
					],
					[
						{
							key: 'Others',
							value: 'sfasdf',
						},
						{
							key: 'Peripherals',
							value: 'WKWK',
						},
					],
				],
			},
			{
				for: 'Linux',
				systemReq: [
					[
						{
							key: 'CPU',
							value: 'dual Core',
						},
						{
							key: 'CPU',
							value: 'Ryzen 5 3600',
						},
					],
					[
						{
							key: 'Memory',
							value: '8GB',
						},
						{
							key: 'Memory',
							value: '16GB',
						},
					],
					[
						{
							key: 'GPU',
							value: 'GTX 1060',
						},
						{
							key: 'GPU',
							value: 'RTX 3060',
						},
					],
					[
						{
							key: 'Storage',
							value: '100GB',
						},
						{
							key: 'Storage',
							value: '100GB SSD',
						},
					],
					[
						{
							key: 'VRM',
							value: '4GB',
						},
						{
							key: 'VRM',
							value: '8GB',
						},
					],
					[
						{
							key: 'DirectX',
							value: 'DirectX 11',
						},
						{
							key: 'DirectX',
							value: 'DirectX 12',
						},
					],
					[
						{
							key: 'Others',
							value: 'sfasdf',
						},
						{
							key: 'Peripherals',
							value: 'WKWK',
						},
					],
				],
			},
		],
		others: {
			key: 'Language Supported',
			value: ['English, Bangla, French, Hindi', 'English, Bangla, French, Hindi'],
		},
		copyWrite:
			'© 2022 MARVEL © 2022 Sony Interactive Entertainment LLC Created and developed by Insomniac Games, Inc. PC version by Nixxes Software BV.',
		policy: 'https://www.playstation.com/country-selector/index.html',
	},
	gameTags: {
		Genre: {
			action: true,
			adventure: true,
			rolePlaying: true,
		},
		Features: {
			singlePlayer: true,
		},
	},
};

function EditGame() {
	const [AddGameDetails, setAddGameDetails] = useState({});
	const mainDefaultData = useRef(data);

	const { cloneObject } = useObjectUtilities();

	useEffect(() => {
		setTimeout(() => {
			const defaultData = cloneObject(data);

			defaultData.gameSpecifications.spec.forEach((spec, index) => {
				defaultData.gameSpecifications.spec[index].isActive = true;
			});
			setAddGameDetails(defaultData);
		}, 10);
	}, [cloneObject]);

	const { setToast } = useToast();

	const { areObjectsEqual } = useObjectUtilities();

	const handleSubmit = newData => {
		if (areObjectsEqual(mainDefaultData.current, newData)) {
			console.log('Data Updated');

			setToast({
				title: 'Game Details Updated',
				message: 'Game details have been updated successfully.',
				type: 'success',
			});
			return '';
		}
		return 'No changes made.';
	};

	return (
		<div className={styles.editGames}>
			<div className={styles.backBtnContainer}>
				<button
					className={styles.backBtn}
					onClick={() => console.log('Back')}
					type='button'
				>
					<svg
						id='arrow-circle-down'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Z' />
						<path d='M17.5,11.5H7.096c.063-.177,.155-.345,.287-.493,.266-.301,.527-.587,.717-.777l2.828-2.879c.194-.197,.191-.514-.006-.708-.198-.193-.515-.191-.707,.006l-2.825,2.876c-.198,.198-.475,.5-.756,.818-.837,.944-.837,2.368,0,3.312,.282,.318,.559,.621,.753,.815l2.828,2.879c.098,.1,.227,.149,.356,.149,.126,0,.253-.048,.351-.143,.197-.194,.2-.51,.006-.708l-2.831-2.882c-.187-.187-.448-.473-.715-.774-.131-.148-.224-.316-.286-.493h10.404c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5Z' />
					</svg>
				</button>
			</div>
			<GameInfoField defaultData={AddGameDetails} handleGameInfo={handleSubmit} hasDefault />
		</div>
	);
}
export default EditGame;
