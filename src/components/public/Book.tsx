import React from "react";
import {Link} from "react-router-dom";
import Rating from "../Rating";

const VND = (price: number) => new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(price);

export default function Book(props: {book: any}) {
	const {book} = props;
	const starAvg = Math.ceil(book.star / book.rating_count);

	return (
		<div className="flex my-4">
			<img className="w-32 h-48 mr-4 object-cover transform hover:scale-110 duration-100" src={book.image} alt="" />
			<div className="flex flex-col justify-between h-48">
				<div>
					<h3 className="text-xl font-semibold text-indigo-900">{book.name}</h3>
					<p>{book.author}</p>
					<Rating star={starAvg} count={book.rating_count} color="yellow" />
					<p className="text-red-700 text-xl font-semibold flex-1">{VND(book.price)}</p>
				</div>
				<div className="flex justify-between">
					<button className="shadow rounded-lg p-2 bg-gray-800 hover:bg-gray-900 text-white mr-2 duration-200 text-sm">Thêm vào giỏ</button>
					<button className="shadow rounded-lg p-2 bg-gray-100 hover:bg-gray-200 text-sm">
						<Link to={{pathname: `/public/book/${book.id}`, state: {starAvg: starAvg, rating_count: book.rating_count}}}>Chi tiết</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
