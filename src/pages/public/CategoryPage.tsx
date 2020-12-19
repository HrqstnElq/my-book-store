import GridBook from "components/public/GridBook";
import CategorySlide from "components/public/CategorySlide";
import SearchBar from "components/public/SearchBar";
import React, {useEffect, useState} from "react";
import {getAllCategory} from "api/categoryApi";
import Pagination from "components/Pagination";
import {getBooksPaging} from "api/productApi";

export default function CategoryPage() {
	const [categories, setCategories] = useState([]);
	const [paging, setPaging] = useState({totalPage: 0, books: []});

	const [query, setQuery] = useState({
		page: 1,
		categoryId: 1,
		size: 20,
	});
	useEffect(() => window.scrollTo(0, 0), []);
	useEffect(() => {
		window.scrollTo(0, 0);
		getAllCategory().then((res) => {
			if (res.data.success) setCategories(res.data.payload.categories);
		});
	}, []);

	useEffect(() => {
		getBooksPaging(query).then((res) => {
			if (res.data.success) setPaging(res.data.payload);
			else setPaging({totalPage: 0, books: []});
		});
	}, [query]);

	return (
		<div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 max-w-screen-lg">
			<SearchBar />
			<section className="w-full">
				<CategorySlide categories={categories} current={query} setCurrent={setQuery} />
				<GridBook books={paging.books} />
				<Pagination size={8} totalPage={paging.totalPage} query={query} setQuery={setQuery} />
			</section>
		</div>
	);
}
