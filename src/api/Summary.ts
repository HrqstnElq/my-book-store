import {Axios} from "./Axios";
export const getSummary = (params: any) =>
	Axios.get("/summary/get", {
		params,
	});
