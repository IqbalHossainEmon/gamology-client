import React, { useRef, useState } from "react";
import Carousel from "./Carousel/Carousel";
import CarouselCards from "./CarouselCards/CarouselCards";
import arrow from "./images/arrow.png";
import "./Banner.css";
import { useLayoutEffect } from "react";
import { useEffect } from "react";

const [first, second, third, fourth, fifth] = [
	[0, -40],
	[200, 40],
	[300, 200],
	[200, 380],
	[0, 440],
];

const Banner = ({ data }) => {
	const timeoutRef = useRef(null);
	const [activeBanner, setactiveBanner] = useState({
		active: 0,
		fadeIn: data.length,
		fadeOut: data.length,
		cardsPosition: [third, second, first, fifth, fourth],
	});

	useLayoutEffect(() => {
		switch (activeBanner.active) {
			case 0:
				setactiveBanner({
					...activeBanner,
					cardsPosition: [third, second, first, fifth, fourth],
				});
				break;
			case 1:
				setactiveBanner({
					...activeBanner,
					cardsPosition: [fourth, third, second, first, fifth],
				});
				break;
			case 2:
				setactiveBanner({
					...activeBanner,
					cardsPosition: [fifth, fourth, third, second, first],
				});
				break;
			case 3:
				setactiveBanner({
					...activeBanner,
					cardsPosition: [first, fifth, fourth, third, second],
				});
				break;
			case 4:
				setactiveBanner({
					...activeBanner,
					cardsPosition: [second, first, fifth, fourth, third],
				});
				break;
			default:
				break;
		}
	}, [activeBanner.active]);

	const callAfterSometime = (check) => {
		timeoutRef.current = setTimeout(() => changeCarousel(check), 300);
	};
	useEffect(() => {
		return () => clearTimeout(timeoutRef.current);
	}, []);

	const clickCard = (active) => {
		console.log(active);
		switch (active) {
			case -40:
				changeCarousel("+");
				callAfterSometime("+");
				break;
			case 40:
				changeCarousel("+");
				break;
			case 380:
				changeCarousel("-");
				break;
			case 440:
				changeCarousel("-");
				callAfterSometime("-");
				break;
			default:
				break;
		}
	};
	const changeCarousel = (check) => {
		if (check === "+") {
			setactiveBanner((state) => ({
				...state,
				active: (state.active + 1) % data.length,
				fadeIn: (state.fadeIn + 1) % data.length,
				fadeOut: state.active,
			}));
		} else {
			setactiveBanner((state) => ({
				...state,
				active: (state.active + (data.length - 1)) % data.length,
				fadeIn: (state.fadeIn + (data.length - 1)) % data.length,
				fadeOut: state.active,
			}));
		}
	};
	useLayoutEffect(() => {
		const timer = setInterval(() => {
			changeCarousel("+");
		}, 8000);
		return () => clearInterval(timer);
	}, [activeBanner.active]);

	return (
		<div id="banner">
			<CarouselCards
				data={data}
				cardsPosition={activeBanner.cardsPosition}
				clickCard={clickCard}
			/>
			<button onClick={() => changeCarousel("+")} className="nextButton">
				<img className="width-100 arrow" src={arrow} alt="" />
			</button>
			<div className="carousels">
				{data.map((carousel) => (
					<Carousel
						key={carousel.id}
						activeBanner={activeBanner}
						{...carousel}
					/>
				))}
			</div>
			<button onClick={() => changeCarousel("-")} className="prevButton">
				<img className="width-100 arrow" src={arrow} alt="" />
			</button>
		</div>
	);
};

export default Banner;
