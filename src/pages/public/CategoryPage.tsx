import GridBook from "components/public/GridBook";
import CategorySlide from "components/public/CategorySlide";
import SearchBar from "components/public/SearchBar";
import React, {useEffect, useRef, useState} from "react";
import {getAllCategory} from "api/categoryApi";
import Pagination from "components/Pagination";
import {getBooksPaging} from "api/productApi";
import LoadingBar from "react-top-loading-bar";
import SortBar from "components/public/SortBar";
import {Helmet} from "react-helmet";

export default function CategoryPage() {
	const [categories, setCategories] = useState([]);
	const [paging, setPaging] = useState({totalPage: 0, books: []});

	const loadingRef = useRef<any>(null);

	const [query, setQuery] = useState({
		page: 1,
		categoryId: 1,
		size: 20,
	});
	useEffect(() => window.scrollTo(0, 0), [query]);
	useEffect(() => {
		loadingRef?.current?.staticStart();
		getAllCategory().then((res) => {
			if (res.data.success) setCategories(res.data.payload.categories);
			loadingRef?.current?.complete();
		});
	}, []);

	useEffect(() => {
		loadingRef?.current?.staticStart();
		getBooksPaging(query).then((res) => {
			if (res.data.success) setPaging(res.data.payload);
			else setPaging({totalPage: 0, books: []});
			loadingRef?.current?.complete();
		});
	}, [query]);

	return (
		<>
			<Helmet>
				<title>{"Nhà sách An Nguyên - Danh mục"}</title>
			</Helmet>
			<div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 w-full max-w-screen-lg">
				<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
				<SearchBar />
				<section className="w-full">
					<CategorySlide categories={categories} current={query} setCurrent={setQuery} />
					<SortBar query={query} setQuery={setQuery} />
					<GridBook books={paging.books} />
					<Pagination size={8} totalPage={paging.totalPage} query={query} setQuery={setQuery} />
				</section>
			</div>
		</>
	);
}
