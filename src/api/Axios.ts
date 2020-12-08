import axios from "axios";
//query string se gui ca null
// const queryString = require("query-string");

export const Axios = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		"content-type": "application/json",
	},
	// paramsSerializer: (params) => queryString.stringify(params),
});
