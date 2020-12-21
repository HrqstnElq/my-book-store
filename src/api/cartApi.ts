import {Axios} from "./Axios";

export type Cart = {
	bookId: number;
	quantity: number;
};

export const syncCart = (token: string, isReduce: boolean, listCart: Cart[]) =>
	Axios.post(
		"/api/cart/post",
		{
			cartRequests: listCart,
		},
		{
			params: {
				isReduce: isReduce,
			},
			headers: {
				Authorization: "Bearer " + token,
			},
		}
	);

export const getCart = (token: string) =>
	Axios.get("/api/cart/get", {
		headers: {
			Authorization: "Bearer " + token,
		},
	});
