import axios from "axios"

// in production there's no localhost so we have to make ths dynamic
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5100/api" : "/api"

const api = axios.create({
  baseURL: BASE_URL,
})
export default api
