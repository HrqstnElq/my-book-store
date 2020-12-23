import {Axios} from "./Axios";

export interface Order {
	userId: string;
	address: string;
	dateCreate?: string;
	dateReceive?: string | null;
	dateReturn?: string | null;
	orderStatus?: number;
}

export const getAllOrderUser = (token: string, isDelete: boolean = false) =>
	Axios.get("/api/order/user", {
		headers: {
			Authorization: "Bearer " + token,
		},
		params: {
			isDelete: isDelete,
		},
	});

export const getAllOrderAdmin = (token: string) =>
	Axios.get("/api/admin/order/all", {
		headers: {
			Authorization: "Bearer " + token,
		},
	});

export const getOrderDetails = (orderId: number, token: string) =>
	Axios.get(`/api/order/detail/${orderId}`, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});

export const updateOrder = (orderId: number, order: Order, token: string) =>
	Axios.post(`/api/order/admin/${orderId}`, order, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});

export const createOrder = (cart: any) => Axios.post("/api/order/create", {cartRequests: cart});

export const addOrder = (token: string, order: any) =>
	Axios.post("/api/order/add", order, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});

export const deleteOrder = (token: string, orderId: number) =>
	Axios.delete(`/api/order/delete/${orderId}`, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});
