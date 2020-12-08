import {Axios} from "./Axios";

export interface Order {
	userId: string;
	address: string;
	dateCreate?: string;
	dateReceive?: string | null;
	dateReturn?: string;
	orderStatus?: number;
}

export const getAllOrderAdmin = () => Axios.get("/api/admin/order/all");
export const getOrderDetails = (orderId: number) => Axios.get(`/api/order/detail/${orderId}`);
export const updateOrder = (orderId: number, order: Order) => Axios.post(`/api/order/update/${orderId}`, order);
