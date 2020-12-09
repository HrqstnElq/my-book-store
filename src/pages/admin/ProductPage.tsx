/* eslint-disable react-hooks/exhaustive-deps */
import {getBooksDetail, getBooksPaging} from "api/productApi";
import Book from "components/admin/Book";
import FilterBar from "components/admin/FilterBar";
import BookDetail from "components/BookDetail";
import Pagination from "components/Pagination";
import React, {useEffect, useRef, useState} from "react";
import LoadingBar from "react-top-loading-bar";
import "./ProductPage.css";

export default function ProductPage() {
	const loadingRef = useRef<any>(null);

	const [totalPage, setTotalPage] = useState(0);
	const [bookAction, setBookAction] = useState<{bookId: number; action: string}>({bookId: 0, action: "ALL"});

	const [books, setBooks] = useState<Array<any>>([]);
	const [bookDetail, setBookDetail] = useState();
	const [query, setQuery] = useState<any>({
		page: 1,
		size: 2,
		orderBy: "id",
		dsc: false,
		categoryId: null,
		search: null,
		isSuspend: false,
	});

	const exitDetails = (event: any) => {
		if (event.target.classList.contains("exit")) setBookAction({bookId: 0, action: "ALL"});
	};

	useEffect(() => {
		if (bookAction.action !== "ALL") {
			if (loadingRef.current) loadingRef.current.staticStart();
			getBooksDetail(bookAction.bookId).then((res) => {
				if (res.data.success) {
					setBookDetail(res.data.payload.book);
					if (loadingRef.current) loadingRef.current.complete();
				}
			});
		}
	}, [bookAction]);

	console.log(bookDetail);

	useEffect(() => {
		if (loadingRef.current) loadingRef.current.staticStart();
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
				<Pagination size={8} totalPage={totalPage} query={query} setQuery={setQuery} />
				<div className="book-list">
					{books.map((book) => (
						<Book setBookAction={setBookAction} key={book.id} book={book} />
					))}
				</div>
			</div>
			{bookAction.action !== "ALL" && (
				<div
					onClick={exitDetails}
					className="exit fixed w-screen h-screen bg-black bg-transparent bg-opacity-60 top-0 left-0 flex justify-center py-4 ">
					<BookDetail bookDetail={bookDetail} setBookAction={setBookAction} />
				</div>
			)}
		</div>
	);
}
