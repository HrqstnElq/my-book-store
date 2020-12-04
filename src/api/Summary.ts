import {BASE_URL} from "./BaseUrl";

const axios = require("axios");
const instance = axios.create({baseURL: BASE_URL});

export const getSummary = () => {
	return instance.get("/summary/get");
};
