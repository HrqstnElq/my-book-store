import {Axios} from "./Axios";

export interface pagingQuery {
	page?: number;
	size?: number;
	orderBy?: string;
	dsc?: boolean;
	categoryId?: number;
	search?: string;
	isSuspend?: boolean;
}

export const getBooksPaging = (query: pagingQuery) =>
	Axios.get("/api/book/query", {
		params: query,
	});
