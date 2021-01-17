import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {AddItem} from "store/cartSlice";
import Rating from "../Rating";
import {VND} from "common/function";

import LoadingBar from "react-top-loading-bar";

export default function Book(props: {book: any}) {
	const {book} = props;
	const starAvg = Math.ceil(book.star / book.rating_count);

	const loadingRef = useRef<any>(null);

	const dispatch = useDispatch();

	const addBookHandel = () => {
		loadingRef?.current?.staticStart();
		dispatch(
			AddItem({bookId: book.id, bookName: book.name, bookImage: book.image, price: book.price, bookUrl: book.url, sale: book.sale, quantity: 1})
		);
		loadingRef?.current?.complete();
	};

	return (
		<div className="flex my-4">
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
			<img className="w-32 h-48 mr-4 object-cover transform hover:scale-110 duration-100" src={book.image} alt="" />
			<div className="flex flex-col justify-between h-48">
				<div>
					<Link title={book.name} to={`/book-store/book/${book.url}`} className="text-xl font-semibold text-indigo-900">
						{book.name.length > 30 ? book.name.slice(0, 30) + "..." : book.name}
					</Link>
					<p>{book.author}</p>
					<Rating star={starAvg} count={book.rating_count} color="yellow" />
					<div className="flex items-end">
						<p className="text-red-700 text-xl font-semibold flex-1">{VND(book.price - book.sale * book.price)}</p>
						{book.sale > 0 && <p className="text-gray-700 text-sm line-through flex-1">{VND(book.price)}</p>}
					</div>
				</div>
				<div className="flex justify-between">
					<button
						onClick={addBookHandel}
						className="shadow rounded-lg p-2 bg-gray-800 hover:bg-gray-900 text-white mr-2 duration-200 text-sm">
						Thêm vào giỏ
					</button>
					<button className="shadow rounded-lg p-2 bg-gray-100 hover:bg-gray-200 text-sm">
						<Link to={{pathname: `/book-store/book/${book.url}`, state: {starAvg: starAvg, rating_count: book.rating_count}}}>
							Chi tiết
						</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
