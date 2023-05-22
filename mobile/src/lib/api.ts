import axios from "axios";

const BASE_URL = "http://10.0.0.101:3333";

const userAgent = "mobile";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "User-Agent": userAgent,
  },
});
