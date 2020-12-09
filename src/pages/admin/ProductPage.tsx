import {getBooksPaging} from "api/productApi";
import Book from "components/admin/Book";
import FilterBar from "components/admin/FilterBar";
import Pagination from "components/Pagination";
import React, {useEffect, useRef, useState} from "react";
import LoadingBar from "react-top-loading-bar";
import "./ProductPage.css";

export default function ProductPage() {
	const loadingRef = useRef<any>(null);

	const [totalPage, setTotalPage] = useState(0);
	const [books, setBooks] = useState<Array<any>>([]);
	const [query, setQuery] = useState<any>({
		page: 1,
		size: 2,
		orderBy: "id",
		dsc: false,
		categoryId: null,
		search: null,
		isSuspend: false,
	});

	useEffect(() => {
		loadingRef.current?.staticStart();

		getBooksPaging(query).then((res) => {
			if (res.data.success) {
				setBooks(res.data.payload.books);
				setTotalPage(res.data.payload.totalPage);
			} else {
				setBooks([]);
			}
			if (loadingRef.current) loadingRef.current.complete();
		});
	}, [query]);

	return (
		<div className="w-4/5 mt-4 m-auto flex flex-col md:flex-row">
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
			<div className="md:w-72 flex justify-center md:block">
				<FilterBar query={query} setQuery={setQuery} />
			</div>
			<div className="w-full">
				<Pagination totalPage={totalPage} query={query} setQuery={setQuery} />
				<div className="book-list">
					{books.map((book) => (
						<Book key={book.id} book={book} />
					))}
				</div>
			</div>
		</div>
	);
}
