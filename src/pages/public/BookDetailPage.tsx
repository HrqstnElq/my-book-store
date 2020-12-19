import {getBooksDetail} from "api/productApi";
import SearchBar from "components/public/SearchBar";
import Rating from "components/Rating";
import React, {useEffect, useState} from "react";
import "./BookDetailPage.css";

const VND = (price: number) => new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(price);

export default function BookDetailPage(props: any) {
	const [book, setBook] = useState<any>();
	const [quantity, setQuantity] = useState(1);
	console.log(props);

	useEffect(() => window.scrollTo(0, 0), []);

	useEffect(() => {
		getBooksDetail(props.match.params.id).then((res) => {
			if (res.data.success) setBook(res.data.payload.book);
			else setBook(null);
		});
	}, [props.match.params.id]);

	return (
		<div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 max-w-screen-lg">
			<SearchBar />
			{(book && (
				<div className="space-x-4 flex w-full h-96 my-10">
					<img className="w-1/3 block bg-gray-700 rounded-lg" src={book.image} alt="" />
					<div className="flex justify-between flex-col">
						<div className="space-y-2">
							<div className="space-x-4">
								<span className="font-bold text-3xl uppercase">{book.name}</span>
								<span className="text-gray-600 text-sm uppercase">{book.author}</span>
							</div>
							<Rating star={props.location.state.starAvg} count={props.location.state.rating_count} color="red" />
							<div className="space-x-2">
								<span className="font-bold">Số lượng còn lại:</span>
								<span>{book.available}</span>
							</div>
							<div className="space-x-2">
								<span className="font-bold">Danh mục:</span>
								<span>{book.category}</span>
							</div>
							<div className="space-x-2">
								<span className="font-bold">Giá:</span>
								<span className="text-red-700 text-xl font-semibold flex-1">{VND(book.price)}</span>
							</div>
						</div>
						<div className="space-y-2">
							<div className="flex items-center space-x-2">
								<p className="font-bold">Chọn số lượng</p>
								<div className="flex flex-row h-10 rounded-lg relative bg-transparent w-32">
									<button
										onClick={() => quantity > 1 && setQuantity(quantity - 1)}
										className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
										-
									</button>
									<input
										className="text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
										onChange={(e: any) => e.target.value <= book.available && setQuantity(e.target.value)}
										value={quantity}
										min={1}
										max={book.available}
										type="number"
									/>
									<button
										onClick={() => book.available > quantity && setQuantity(quantity + 1)}
										className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
										+
									</button>
								</div>
							</div>
							<div className="space-x-4">
								<button className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-md text-white font-medium">Thêm vào giỏ</button>
								<button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md text-white font-medium">Mua ngay</button>
							</div>
						</div>
					</div>
				</div>
			)) || <h1 className="my-4 text-xl uppercase text-center">Không tìm thấy cuốn sách này</h1>}
		</div>
	);
}
