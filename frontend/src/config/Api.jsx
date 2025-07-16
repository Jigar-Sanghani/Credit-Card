
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4454/api",
});

export default API;
