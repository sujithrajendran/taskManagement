import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use((config) => {
  const traceId = uuidv4();
  config.headers["x-trace-id"] = traceId;
  console.log(`Sending traceId: ${traceId}`);
  return config;
});

export default axiosInstance;
