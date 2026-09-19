import axios from "axios";
import { ENV } from "./env.js";

export const axiosInstance = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
});