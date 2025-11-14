import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `https://server.ancestropedia.com/api`,
  withCredentials: true,
});

export const axiosInstanceLocal = axios.create({
  baseURL: `http://localhost:7777/api`,
  withCredentials: true,
});