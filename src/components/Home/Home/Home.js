import React from "react";
import Banner from "../Banner/Banner";

const data = [
	{
		id: 0,
		name: "Marvel's Spider-Man Remastered",
		coverImg: "https://i.ibb.co/SRTnwG7/spiderman.png",
		logoImg: "https://i.ibb.co/wWJ85k7/spiderman-logo.png",
		carouselThumb: "https://i.ibb.co/KhyqrYM/spiderman-carousel-thumb.png",
		price: 59,
	},
	{
		id: 1,
		name: "UNCHARTED™: Legacy of Thieves Collection",
		coverImg: "https://i.ibb.co/hM6WSCn/fortnite.png",
		logoImg: "https://i.ibb.co/n7cSm73/fortnite-logo.png",
		carouselThumb: "https://i.ibb.co/2WD5cNZ/fortnite-carousel-thumb.jpg",
		price: "49.99",
	},
	{
		id: 2,
		name: "Fall Guy",
		coverImg: "https://i.ibb.co/n8NVH98/fall-guy.png",
		logoImg: "https://i.ibb.co/QF3t3jQ/fall-guy-logo.png",
		carouselThumb: "https://i.ibb.co/vvQfMp7/fall-guys-carousel-thumb.jpg",
		price: "Free",
	},
	{
		id: 3,
		name: "Genshin impact",
		coverImg: "https://i.ibb.co/s3wrQ4j/geshin-impact.png",
		logoImg: "https://i.ibb.co/SwhFtwB/genshin-impact-logo.png",
		carouselThumb: "https://i.ibb.co/nCptvH4/genshin-impact-carousel-thumb.jpg",
		price: "Free",
	},
	{
		id: 4,
		name: "Assassin's Creed Mirage",
		coverImg: "https://i.ibb.co/vQ0NHVc/ac-mirage.png",
		logoImg: "https://i.ibb.co/D15wh7r/ac-mirage-logo.png",
		carouselThumb: "https://i.ibb.co/p1709fM/ac-mirage-carousel-thumb.jpg",
		price: "",
	},
];

const Home = () => {
	return (
		<>
			<Banner data={data} />
		</>
	);
};

export default Home;
