import {getAllCategory} from "api/categoryApi";
import {getBooksPaging, getTopBooks} from "api/productApi";
import BannerSlide from "components/public/BannerSlide";
import CategoryBar from "components/public/CategoryBar";
import GridBook from "components/public/GridBook";
import SearchBar from "components/public/SearchBar";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function HomePage() {
	const [topBooks, setTopBooks] = useState([]);
	const [categories, setCategories] = useState([]);
	const [currentCategory, setCurrentCategory] = useState(1);
	const [books, setBooks] = useState([]);
	useEffect(() => window.scrollTo(0, 0), []);
	useEffect(() => {
		getAllCategory().then((res) => {
			if (res.data.success) setCategories(res.data.payload.categories);
		});
	}, []);

	useEffect(() => {
		getTopBooks("year", 1, 6).then((res) => {
			if (res.data.success) setTopBooks(res.data.payload.books);
		});
	}, []);

	useEffect(() => {
		getBooksPaging({orderBy: "MonthScore", dsc: true, categoryId: currentCategory}).then((res) => {
			if (res.data.success) setBooks(res.data.payload.books);
			else setBooks([]);
		});
	}, [currentCategory]);

	return (
		<div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 max-w-screen-lg">
			<SearchBar />
			<BannerSlide />
			<section className="my-4">
				<h2 className="text-i text-indigo-900 text-2xl font-bold">Sách nổi bật</h2>
				<GridBook books={topBooks} />
				<div className="clearfix">
					<Link to="/public/highlight" className="float-right font-bold" href="#">
						Xem thêm ...
					</Link>
				</div>
			</section>
			<hr />
			<section className="w-full">
				<CategoryBar current={currentCategory} setCurrent={setCurrentCategory} categories={categories} />
				<GridBook books={books} />
			</section>
		</div>
	);
}
