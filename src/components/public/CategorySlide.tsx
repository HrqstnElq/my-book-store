/* eslint-disable eqeqeq */

import Slider from "react-slick";

const classNames = require("classnames");
export default function CategorySlide(props: {categories: any; current: any; setCurrent: Function}) {
	const {categories, current, setCurrent} = props;

	const images = [
		{img: "/images/category/1.jpg", color: "yellow-500"},
		{img: "/images/category/2.jpg", color: "green-400"},
		{img: "/images/category/3.jpg", color: "purple-400"},
		{img: "/images/category/4.jpg", color: "yellow-400"},
		{img: "/images/category/5.jpg", color: "blue-800"},
		{img: "/images/category/6.jpg", color: "gray-400"},
		{img: "/images/category/7.jpg", color: "red-400"},
	];

	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		slidesPerRow: 1,
		variableWidth: true,
		swipeToSlide: true,
	};
	return (
		<Slider {...settings} slide="li" className="bg-gray-100 rounded-xl my-5">
			{categories.map((category: any) => (
				<div
					key={category.id}
					className={`bg-${images[(category.id % 8) - 1].color} rounded-xl focus:outline-none focus:shadow-lg transform focus:scale-110`}>
					<div className="flex flex-col items-center p-2 w-32 h-44" onClick={() => setCurrent({...current, categoryId: category.id})}>
						<div className="flex justify-center pointer-events-none">
							<img className="m-5" src={images[(category.id % 8) - 1].img} alt="" style={{height: "80px"}} />
						</div>
						<h3 className={classNames("text-xs uppercase font-bold", {"text-white ": current.categoryId != category.id})}>
							{category.name}
						</h3>
					</div>
				</div>
			))}
		</Slider>
	);
}
