import axios from "axios";
import { baseURL } from "../Api/SummaryAPI";

const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default API;
