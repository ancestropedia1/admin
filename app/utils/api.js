import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/admin/blog",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
