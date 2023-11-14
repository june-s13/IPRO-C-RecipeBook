import axiosLib from "axios";

export const axios = axiosLib.create({
  baseURL: "http://localhost:3000",
  withCredentials: false
})