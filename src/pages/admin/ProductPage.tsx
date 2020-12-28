/* eslint-disable react-hooks/exhaustive-deps */
import {getBooksDetail, getBooksPaging} from "api/productApi";
import Book from "components/admin/Book";
import FilterBar from "components/admin/FilterBar";
import BookDetail from "components/admin/BookDetail";
import Pagination from "components/Pagination";
import React, {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import "./ProductPage.css";
import BookEdit from "components/admin/BookEdit";
import ConfirmForm from "components/admin/ConfirmForm";
const queryString = require("query-string");

export default function ProductPage() {
	const categoryId = queryString.parse(useHistory().location.search).category;

	const loadingRef = useRef<any>(null);
	const [totalPage, setTotalPage] = useState(0);
	const [bookAction, setBookAction] = useState<{bookId: number; action: string}>({bookId: 0, action: "ALL"});

	const [books, setBooks] = useState<Array<any>>([]);
	const [bookDetail, setBookDetail] = useState();
	const [query, setQuery] = useState<any>({
		page: 1,
		size: 10,
		orderBy: "id",
		dsc: false,
		categoryId: categoryId,
		search: null,
		isSuspend: false,
	});

	const exitDetails = (event: any) => {
		if (event.target.classList.contains("exit")) setBookAction({bookId: 0, action: "ALL"});
	};

	useEffect(() => {
		setQuery({
			...query,
			categoryId: categoryId,
		});
	}, [categoryId]);

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
	}, [query, bookAction.action === "ALL"]);

	return (
		<div className="w-4/5 mt-4 m-auto flex flex-col md:flex-row">
			<LoadingBar color="#f11946" ref={loadingRef} waitingTime={500} />
			<div className="md:w-72 flex justify-center md:block">
				<FilterBar categoryId={categoryId} query={query} setQuery={setQuery} />
			</div>

			<div className="w-full">
				<Pagination size={8} totalPage={totalPage} query={query} setQuery={setQuery} />
				<div className="book-list">
					{books.map((book, index) => (
						<Book setBookAction={setBookAction} key={index} book={book} />
					))}
				</div>
			</div>
			{bookAction.action === "DETAIL" && bookDetail && (
				<div
					onClick={exitDetails}
					className="exit fixed w-screen h-screen bg-black bg-transparent bg-opacity-60 top-0 left-0 flex justify-center py-4 ">
					<BookDetail bookAction={bookAction} bookDetail={bookDetail} setBookAction={setBookAction} />
				</div>
			)}
			{bookAction.action === "EDIT" && bookDetail && (
				<div
					onClick={exitDetails}
					className="exit fixed w-screen h-screen bg-black bg-transparent bg-opacity-60 top-0 left-0 flex justify-center py-4 ">
					<BookEdit bookAction={bookAction} bookDetail={bookDetail} setBookAction={setBookAction} />
				</div>
			)}

			{bookAction.action === "ADD" && (
				<div
					onClick={exitDetails}
					className="exit fixed w-screen h-screen bg-black bg-transparent bg-opacity-60 top-0 left-0 flex justify-center py-4 ">
					<BookEdit bookAction={bookAction} bookDetail={{}} setBookAction={setBookAction} />
				</div>
			)}

			{bookAction.action === "DELETE" && <ConfirmForm bookAction={bookAction} setBookAction={setBookAction} />}

			{bookAction.action === "ALL" && (
				<button
					onClick={() => setBookAction({...bookAction, action: "ADD"})}
					className="fixed bottom-8 right-8 w-12 h-12 bg-purple-700 rounded-full shadow-md cursor-pointer hover:bg-purple-800">
					<i title="Thêm sản phẩm" className="fas fa-plus font-bold text-white"></i>
				</button>
			)}
		</div>
	);
}
