import React from "react";
import "./Carousel.css";

const Carousel = ({ coverImg, logoImg, price, activeBanner, id }) => {
	return (
		<div
			className={
				activeBanner.fadeIn === id
					? "carousel_fadeIn width-100"
					: activeBanner.active === id
					? "carousel_active"
					: activeBanner.fadeOut === id
					? "carousel_fadeOut width-100"
					: "carousel width-100"
			}
		>
			<div className="carouselCover">
				<img className="width-100 coverImg" src={coverImg} alt="" />
				<div className="carouselInfo">
					<div
						className={
							activeBanner.active === id
								? "carousel_logo_fadeIn carouselImgDiv"
								: "carouselImgDiv"
						}
					>
						<img className="width-100" src={logoImg} alt="" />
					</div>
					<div className="carouselPrice">
						<h5 className="carouselDes_h5">
							{price
								? isNaN(price)
									? price
									: `Starting at $${price}`
								: "COMMING SOON"}
						</h5>
						<button className="carousel_btn_1">
							{price
								? price === "Free"
									? "PLAY FOR FREE"
									: "BUY NOW"
								: "WISH LIST"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Carousel;
