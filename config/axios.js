import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `https://server.ancestropedia.com/api`,
  withCredentials: true,
});