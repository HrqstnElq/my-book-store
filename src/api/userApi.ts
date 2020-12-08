import {Axios} from "./Axios";

//

export const LoginApi = (username: string, password: string) =>
	Axios.post("/api/account/login", {
		username: username,
		password: password,
	});

export const GetInfo = (userId: string, token: string) =>
	Axios.get(`/api/account`, {
		headers: {
			Authorization: "Bearer " + token,
		},
		params: {
			id: userId,
		},
	});
