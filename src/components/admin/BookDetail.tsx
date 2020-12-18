import React, {useState} from "react";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import Comment from "../Comment";
import Rating from "../Rating";

export default function BookDetail(props: {bookAction: any; setBookAction: Function; bookDetail: any}) {
	const {bookDetail, bookAction, setBookAction} = props;

	const [rating, setRating] = useState(0);
	useEffect(() => {
		if (bookDetail.comments.length) {
			setRating(Math.ceil(bookDetail.comments.reduce((x: any, y: any) => x.rating + y.rating) / bookDetail.comments.length));
		}
	}, [bookDetail]);

	return (
		<div className="bg-white w-11/12 rounded-lg overflow-y-scroll p-2 scrollbar-thin scrollbar-thumb-gray-300">
			<div onClick={() => setBookAction({bookId: 0, action: "ALL"})} className="-top-1 w-5 h-5 cursor-pointer sticky">
				<i className="fas fa-times text-lg"></i>
			</div>
			<div className="px-10 w-full">
				<section className="text-gray-700 body-font lg:space-x-4 flex flex-col lg:flex-row">
					<div className="lg:mr-10 mb-10">
						<div className="h-96 w-64">
							<div className="bg-gray-500 rounded-lg">
								<img
									style={{width: "256px", height: "384px"}}
									className="rounded-lg bg-gray-500 block m-auto object-cover"
									src={bookDetail.image}
									alt=""
								/>
							</div>
						</div>
						<div className="flex justify-between mt-4">
							<button
								onClick={() => setBookAction({...bookAction, action: "EDIT"})}
								className="w-24 px-2 py-1 rounded text-white focus:outline-none bg-yellow-400 hover:bg-yellow-500 shadow-sm transition active:bg-yellow-600">
								Chỉnh sửa
							</button>
							<button
								onClick={() => setBookAction({...bookAction, action: "DELETE"})}
								className="w-24 px-2 py-1 rounded text-white focus:outline-none bg-red-400 hover:bg-red-500 shadow-sm transition active:bg-red-600">
								Xóa
							</button>
						</div>
					</div>
					<div className="h-96 w-full">
						<section className="base-info">
							<h3 className="font-bold text-2xl inline-block lg:mr-4">{bookDetail.name}</h3>
							<span className="text-sm uppercase block lg:inline">Số lượng còn lại : {bookDetail.available}</span>
							<Link
								to={`/admin/product?category=${bookDetail.categoryId}`}
								onClick={() => setBookAction({bookId: 0, action: "ALL"})}
								className="text-gray-500 text-base uppercase block hover:text-blue-900">
								Danh mục: {bookDetail.category}
							</Link>
							<Rating star={rating} count={bookDetail.comments.length} color="red" />
						</section>
						<section
							className="description border p-2 rounded-lg overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 w-full"
							style={{height: "19rem"}}>
							<h4 className="text-lg font-semibold">Mô tả </h4>
							<p className="w-full">{bookDetail.description}</p>
						</section>

						{bookDetail.comments.length > 0 && (
							<section className="comment--list p-2 mt-4 rounded-lg border overflow-y-scroll h-64 bg-gray-100 scrollbar-thin scrollbar-thumb-gray-200">
								<h4 className="text-lg font-semibold">Bình luận </h4>
								{bookDetail.comments.map((comment: any, index: number) => (
									<Comment key={index} comment={comment} />
								))}
							</section>
						)}
					</div>
				</section>
			</div>
		</div>
	);
}
