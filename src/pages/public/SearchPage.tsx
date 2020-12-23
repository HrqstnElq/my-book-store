import {getBooksPaging} from "api/productApi";
import Pagination from "components/Pagination";
import GridBook from "components/public/GridBook";
import SearchBar from "components/public/SearchBar";
import SortBar from "components/public/SortBar";
import React, {useEffect, useRef, useState} from "react";
import LoadingBar from "react-top-loading-bar";

export default function SearchPage() {
	const [paging, setPaging] = useState({totalPage: 0, books: []});

	const loadingRef = useRef<any>(null);

	const [query, setQuery] = useState({
		page: 1,
		size: 20,
		search: null,
	});

	useEffect(() => window.scrollTo(0, 0), []);

	useEffect(() => {
		loadingRef?.current?.staticStart();
		getBooksPaging(query).then((res) => {
			if (res.data.success) setPaging(res.data.payload);
			else setPaging({totalPage: 0, books: []});
			loadingRef?.current?.complete();
		});
	}, [query]);

	return (
		<div className="px-10 lg:px-20 xl:px-32 mt-2 flex-1 max-w-screen-lg space-y-4">
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
			<SearchBar query={query} setQuery={setQuery} />
			<SortBar query={query} setQuery={setQuery} />
			<GridBook books={paging.books} />
			<Pagination size={query.size} totalPage={paging.totalPage} query={query} setQuery={setQuery} />
		</div>
	);
}
