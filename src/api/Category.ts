import {Axios} from "./Axios";

export const getAllCategory = () => Axios.get("/api/category/all");
