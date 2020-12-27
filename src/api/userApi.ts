import {Axios} from "./Axios";

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

export const ChangePasswordAPI = (token: string, data: any) =>
	Axios.post("/api/account/changepassword", null, {
		headers: {
			Authorization: "Bearer " + token,
		},
		params: {
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
		},
	});

export const UpdateAccount = (token: string, data: any) => Axios.post("/api/account/update", data, {headers: {Authorization: "Bearer " + token}});

export const GetAllUser = (token: string) =>
	Axios.get("/api/admin/account/user/all", {
		headers: {
			Authorization: "Bearer " + token,
		},
	});

export const DeleteAccount = (token: string, accountId: string) =>
	Axios.delete("/api/admin/account", {
		headers: {
			Authorization: "Bearer " + token,
		},
		params: {
			id: accountId,
		},
	});

export const RestoreAccount = (token: string, accountId: string) =>
	Axios.get("/api/admin/account/restore", {
		headers: {
			Authorization: "Bearer " + token,
		},
		params: {
			id: accountId,
		},
	});

export const ResetPassword = (token: string, accountId: string, password: string) =>
	Axios.post("/api/account/resetpassword", null, {
		headers: {Authorization: "Bearer " + token},
		params: {
			userId: accountId,
			newPassword: password,
		},
	});

export const GetAllSales = (token: string) =>
	Axios.get("/api/admin/account/sales/all", {
		headers: {
			Authorization: "Bearer " + token,
		},
	});

export const CreateSales = (data: RegisterData, token: string) =>
	Axios.post("/api/admin/account/sales", data, {
		headers: {
			Authorization: "Bearer " + token,
		},
	});
