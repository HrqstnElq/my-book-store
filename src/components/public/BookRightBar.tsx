import Rating from "components/Rating";
import React from "react";
import {Link} from "react-router-dom";
const VND = (price: number) => new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(price);
export default function BookRightBar(props: {book: any}) {
	const {book} = props;
	const starAvg = Math.ceil(book.star / book.rating_count);

	return (
		<div className="book-right-bar flex p-4 pl-0">
			<div className="book--image">
				<img className="block" src={book.image} alt={book.name} style={{width: "100px", height: "146px", objectFit: "cover"}} />
			</div>
			<div className="book--content ml-2 flex flex-col justify-between" style={{width: "150px"}}>
				<div>
					<h3 className="font-medium">{book.name}</h3>
					<p className="font-thin text-xs">{book.author}</p>
					<Rating star={starAvg} count={book.rating_count} color="yellow" />
					<p className="text-red-700 text-xl font-semibold flex-1">{VND(book.price)}</p>
				</div>
				<div className="space-x-2">
					<button className="px-5 py-1 bg-gray-800 text-white rounded-lg text-sm hover:shadow-md hover:bg-gray-900">
						<i className="fas fa-cart-plus"></i>
					</button>
					<Link
						to={{pathname: `/public/book/${book.id}`, state: {starAvg: starAvg, rating_count: book.rating_count}}}
						className="px-5 py-1 bg-gray-100 text-black rounded-lg text-sm hover:shadow-md hover:bg-gray-200">
						<i className="fas fa-info"></i>
					</Link>
				</div>
			</div>
		</div>
	);
}
