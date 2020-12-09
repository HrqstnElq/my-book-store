import React from "react";
import Rating from "./Rating";

export default function BookDetail(props: {setBookAction: Function; bookDetail: any}) {
	const {bookDetail, setBookAction} = props;

	return (
		<div className="bg-white w-11/12 rounded-lg overflow-y-scroll p-2 scrollbar-thin scrollbar-thumb-gray-300">
			<div onClick={() => setBookAction({bookId: 0, action: "ALL"})} className="-top-1 w-5 h-5 cursor-pointer sticky">
				<i className="fas fa-times text-lg"></i>
			</div>
			<section className="text-gray-700 body-font px-10 flex flex-col lg:flex-row">
				<div className="lg:mr-10 mb-10">
					<div className="">
						<div className="p-10 bg-gray-100 rounded-lg">
							<img
								style={{width: "240px", height: "360px", objectFit: "cover"}}
								className="rounded-lg block m-auto"
								src={bookDetail.image}
								alt=""
							/>
						</div>
					</div>
				</div>
				<div className="">
					<h3 className="font-bold text-2xl inline-block">{bookDetail.name}</h3>
					<span className="ml-4 text-sm uppercase">Số lượng còn lại : {bookDetail.available}</span>
					<h6 className="text-gray-500 text-base uppercase">Danh mục: {bookDetail.category}</h6>
					<Rating star={4} color="red" />
				</div>
			</section>
		</div>
	);
}
