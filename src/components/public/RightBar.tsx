import React from "react";
import BookRightBar from "./BookRightBar";

export default function RightBar() {
	const books = [{}, {}, {}];

	return (
		<div className="right-bar mr-4 mt-4 sticky hidden xl:block top-4 w-80 h-screen">
			<div className="right-bar--user mb-4 float-right flex flex-row space-x-4">
				<div className="cart text-2xl relative">
					<i className="fal fa-shopping-cart font-medium text-gray-600"></i>
					<div className="absolute top-0 -right-2 bg-blue-500 w-4 h-4 rounded-full flex">
						<p className="text-xs m-auto text-white font-medium">4</p>
					</div>
				</div>
				<div className="alert text-2xl relative">
					<i className="fal fa-bell font-medium text-gray-600"></i>
					<div className="absolute top-0 -right-2 bg-blue-500 w-4 h-4 rounded-full flex">
						<p className="text-xs m-auto text-white font-medium">4</p>
					</div>
				</div>
				<img
					className="w-10 h-10 object-cover rounded-full"
					src="https://i.pinimg.com/originals/bb/59/c9/bb59c90c3062e5cced0be5bcdb3f8d6c.jpg"
					alt=""
				/>
			</div>
			<div className="clear-right"></div>
			<div className="right-bar--title">
				<h3 className="text-lg font-bold ">Sách nổi bật trong tuần</h3>
				<div className="h-1 w-full bg-blue-600 rounded-full"></div>
			</div>
			<div className="right-bar--books">
				{books.map((book, index) => (
					<BookRightBar key={index} />
				))}
			</div>
		</div>
	);
}
