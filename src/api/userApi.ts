import {Axios} from "./Axios";

//

type RegisterData = {
	username: string;
	fullName: string;
	isMale: boolean;
	dob: string;
	email: string;
	address: string;
	phoneNumber: string;
	password: string;
	confirmPassword: string;
};

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

export const Register = (data: RegisterData) => Axios.post("/api/account/register", data);
