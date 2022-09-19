import React from "react";
import "./CarouselCard.css";

const CarouselCard = ({ data, cardsPosition, clickCard }) => {
	const cardStyle = {
		translate: `${cardsPosition[data.id][0]}% ${cardsPosition[data.id][1]}%`,
	};
	return (
		<div
			id={cardsPosition[data.id][1] === -40 ? "downToUp" : ""}
			onClick={() => clickCard(cardsPosition[data.id][1])}
			style={cardStyle}
			className="CarouselCard"
		>
			<div>
				<img
					id={cardsPosition[data.id][1] === 200 ? "img_border" : ""}
					className="width-100 cardImg "
					src={data.carouselThumb}
					alt=""
				/>
			</div>
			<div
				id={cardsPosition[data.id][1] === 200 ? "showCardInfo" : ""}
				className="cardInfo"
			>
				<h5 className="width-100">{data.name}</h5>
			</div>
		</div>
	);
};

export default CarouselCard;
