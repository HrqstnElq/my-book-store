import {Axios} from "./Axios";

export const getBooksPaging = (query: any) =>
	Axios.get("/api/book/query", {
		params: query,
	});

export const getBooksDetail = (bookId: number) => Axios.get(`/api/book/${bookId}`)