import GridBook from "components/public/GridBook";
import ImageSlide from "components/public/ImageSlide";
import SearchBar from "components/public/SearchBar";
import React from "react";
import {Link} from "react-router-dom";

export default function HomePage() {
	const categories = [{}, {}, {}, {}, {}, {}, {}];
	const books = [{}, {}, {}, {}, {}, {}];

	return (
		<div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 max-w-screen-lg">
			<SearchBar />
			<ImageSlide />
			<section className="my-4">
				<h2 className="text-indigo-900 text-2xl font-bold">Sách nổi bật</h2>
				<GridBook books={books} />
				<div className="clearfix">
					<Link to="/public/highlight" className="float-right font-bold" href="#">
						Xem thêm ...
					</Link>
				</div>
			</section>
			<hr />
			<section className="w-full">
				<h3 className="text-indigo-900 text-2xl font-bold my-2">Danh mục</h3>
				<ul className="category w-full flex justify-between font-bold">
					{categories.map((category, index) => (
						<li>Văn học</li>
					))}
					<li>Xem thêm ...</li>
				</ul>
				<GridBook books={books} />
			</section>
		</div>
	);
}
