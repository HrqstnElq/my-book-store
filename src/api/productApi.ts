import {Axios} from "./Axios";

export const getBooksPaging = (query: any) =>
	Axios.get("/api/book/query", {
		params: query,
	});

export const getTopBooks = (option: string, page: number, size: number) =>
	Axios.get(`/api/admin/book/top/${option}`, {
		params: {
			page: page,
			size: size,
		},
	});

export const getBooksDetail = (bookId: number) => Axios.get(`/api/book/${bookId}`);

export const getBookDetailByUrl = (url: string) => Axios.get(`/api/book/url/${url}`);

export const addBook = (book: any, token: string) =>
	Axios.post("/api/admin/book", book, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});

export const editBook = (bookId: any, book: any, token: string) =>
	Axios.post(`/api/admin/book/${bookId}`, book, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});

export const deleteBook = (bookId: any, token: string) =>
	Axios.delete(`/api/admin/book?id=${bookId}`, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});
