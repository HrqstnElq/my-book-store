import {getAllCategory} from "api/categoryApi";
import {getBooksPaging, getTopBooks} from "api/productApi";
import BannerSlide from "components/public/BannerSlide";
import CategoryBar from "components/public/CategoryBar";
import GridBook from "components/public/GridBook";
import ScrollTop from "components/public/ScrollTop";
import SearchBar from "components/public/SearchBar";
import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function HomePage() {
	const [topBooks, setTopBooks] = useState([]);
	const [categories, setCategories] = useState([]);
	const [currentCategory, setCurrentCategory] = useState(1);
	const [books, setBooks] = useState([]);
	const loadingRef = useRef<any>(null);

	useEffect(() => window.scrollTo(0, 0), []);
	useEffect(() => {
		loadingRef?.current?.staticStart();
		getAllCategory().then((res) => {
			if (res.data.success) setCategories(res.data.payload.categories);
			loadingRef?.current?.complete();
		});
	}, []);

	useEffect(() => {
		loadingRef?.current.staticStart();
		getTopBooks("year", 1, 6).then((res) => {
			if (res.data.success) setTopBooks(res.data.payload.books);
			loadingRef?.current?.complete();
		});
	}, []);

	useEffect(() => {
		loadingRef?.current.staticStart();
		getBooksPaging({orderBy: "MonthScore", dsc: true, categoryId: currentCategory}).then((res) => {
			if (res.data.success) setBooks(res.data.payload.books);
			else setBooks([]);
			loadingRef?.current?.complete();
		});
	}, [currentCategory]);

	return (
		<div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 max-w-screen-lg">
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
			<SearchBar />
			<BannerSlide />
			<section className="my-4">
				<h2 className="text-i text-indigo-900 text-2xl font-bold">Sách nổi bật</h2>
				<GridBook books={topBooks} />
				<div className="clearfix">
					<Link to="/book-store/highlight" className="float-right font-bold" href="#">
						Xem thêm ...
					</Link>
				</div>
			</section>
			<hr />
			<section className="w-full">
				<CategoryBar current={currentCategory} setCurrent={setCurrentCategory} categories={categories} />
				<GridBook books={books} />
			</section>
			<ScrollTop />
		</div>
	);
}
