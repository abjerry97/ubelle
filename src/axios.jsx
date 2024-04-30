import axios from "axios";

 
const makeRequest = axios.create({
  baseURL: process.env.BASE_URL, //http://localhost:3000
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "Application/json" ,
    // Authorization: Bearer ${token},
  },
});

makeRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = Array.isArray(error?.response?.data?.message)?.[0] ?? error?.response?.data?.message ?? error;

    throw new Error(errorMessage)
  }
);

export default makeRequest;