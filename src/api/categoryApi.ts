import {Axios} from "./Axios";

export const getAllCategory = () => Axios.get("/api/category/all");

export const editCategory = (id: number, data: {name: string | undefined; keyword: string | undefined}, token: string) =>
	Axios.post(`/api/category/update/${id}`, data, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});

export const addCategory = (token: string, data: {name: string | undefined; keyword: string | undefined}) =>
	Axios.post("/api/category/add", data, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});
