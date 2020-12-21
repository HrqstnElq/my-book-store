import {getTopBooks} from "api/productApi";
import Pagination from "components/Pagination";
import BannerSlide from "components/public/BannerSlide";
import GridBook from "components/public/GridBook";
import SearchBar from "components/public/SearchBar";
import React, {useEffect, useRef, useState} from "react";
import LoadingBar from "react-top-loading-bar";

const classNames = require("classnames");

export default function HighLightPage() {
	const [paging, setPaging] = useState({totalPage: 0, books: []});
	const [option, setOption] = useState("week");
	const loadingRef = useRef<any>(null);

	const [query, setQuery] = useState({
		page: 1,
		size: 20,
	});

	useEffect(() => window.scrollTo(0, 0), []);
	useEffect(() => {
		loadingRef?.current?.staticStart();
		getTopBooks(option, query.page, query.size).then((res) => {
			if (res.data.success) setPaging(res.data.payload);
			else setPaging({totalPage: 0, books: []});
			loadingRef?.current?.complete();
		});
	}, [query, option]);
	return (
		<div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 max-w-screen-lg">
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
			<SearchBar />
			<BannerSlide />
			<section className="w-full mb-5">
				<h3 className="text-indigo-900 text-2xl font-bold my-2">Danh mục</h3>
				<div className="category w-full flex justify-between font-bold">
					<button className={classNames({"font-bold border-b-4 border-blue-500": option === "week"})} onClick={() => setOption("week")}>
						Bán chạy theo tuần
					</button>
					<button className={classNames({"font-bold border-b-4 border-blue-500": option === "month"})} onClick={() => setOption("month")}>
						Bán chạy theo tháng
					</button>
					<button className={classNames({"font-bold border-b-4 border-blue-500": option === "year"})} onClick={() => setOption("year")}>
						Bán chạy của năm
					</button>
				</div>
			</section>
			<section className="w-full">
				<GridBook books={paging.books} />
				<Pagination size={8} query={query} setQuery={setQuery} totalPage={paging.totalPage} />
			</section>
		</div>
	);
}
