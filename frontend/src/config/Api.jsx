
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8090/api",
});

export default API;
