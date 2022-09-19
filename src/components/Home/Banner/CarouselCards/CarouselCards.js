import React from "react";
import CarouselCard from "./CarouselCard/CarouselCard";
import "./CarouselCards.css";

const CarouselCards = ({ data, cardsPosition, clickCard }) => {
	return (
		<div className="carouselCards">
			{data.map((card) => (
				<CarouselCard
					key={card.id}
					cardsPosition={cardsPosition}
					clickCard={clickCard}
					data={card}
				/>
			))}
		</div>
	);
};

export default CarouselCards;
