import axios from "axios";

export const apiClient = axios.create({ baseURL: "http://localhost:3000/api" });
// export const apiClient = axios.create({ baseURL: "https://dinetable.vercel.app/api" });
