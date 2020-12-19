import {useEffect, useState} from "react";

export default function BannerSlide() {
	const images = ["/images/0.png", "/images/1.png", "/images/2.png", "/images/3.png", "/images/4.png", "/images/5.png"];

	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const interval = window.setInterval(() => {
			setCurrent((current + 1) % images.length);
		}, 3000);
		return () => window.clearInterval(interval);
	}, [current, images.length]);

	return (
		<div className="image-slide overflow-hidden my-4 max-h-48">
			<img className="w-full max-h-48 object-cover bg-white  rounded-lg" src={images[current]} alt="" />
		</div>
	);
}
