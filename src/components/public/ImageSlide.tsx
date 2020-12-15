import {useEffect, useState} from "react";

export default function ImageSlide() {
	const images = [
		"https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-pure-color-watercolor-graffiti-gradient-background-board-design-board-design-image_66713.jpg",
		"https://img.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1095.jpg?size=626&ext=jpg",
	];

	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const interval = window.setInterval(() => {
			setCurrent((current + 1) % images.length);
		}, 3000);
		return () => window.clearInterval(interval);
	}, [current, images.length]);

	return (
		<div className="image-slide overflow-hidden my-4 rounded-lg">
			<img className="w-full h-48 object-cover bg-gray-800" src={images[current]} alt="" />
		</div>
	);
}
