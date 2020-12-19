import {getBooksPaging} from "api/productApi";
import Pagination from "components/Pagination";
import GridBook from "components/public/GridBook";
import SearchBar from "components/public/SearchBar";
import React, {useEffect, useState} from "react";

export default function SearchPage() {
	const [paging, setPaging] = useState({totalPage: 0, books: []});
	const [query, setQuery] = useState({
		page: 1,
		size: 20,
		search: null,
	});

	useEffect(() => window.scrollTo(0, 0), []);

	useEffect(() => {
		console.log(query);
		getBooksPaging(query).then((res) => {
			if (res.data.success) setPaging(res.data.payload);
			else setPaging({totalPage: 0, books: []});
		});
	}, [query]);

	return (
		<div className="px-10 lg:px-20 xl:px-32 mt-5 flex-1 max-w-screen-lg space-y-4">
			<SearchBar query={query} setQuery={setQuery} />
			<GridBook books={paging.books} />
			<Pagination size={query.size} totalPage={paging.totalPage} query={query} setQuery={setQuery} />
		</div>
	);
}
