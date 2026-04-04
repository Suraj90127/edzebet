import axios from "axios";
export const api = axios.create({
  baseURL: `http://localhost:5505/api`,
  // baseURL: `/api`,
});
// export const host = "http://localhost:5505";
export const host = "/";
