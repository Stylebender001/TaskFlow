import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

const token = localStorage.getItem("token");
if (token) api.defaults.headers.common["x-auth-token"] = token;

export default api;
