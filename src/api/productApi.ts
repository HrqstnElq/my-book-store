import {Axios} from "./Axios";

export const getBooksPaging = (query: any) =>
	Axios.get("/api/book/query", {
		params: query,
	});
