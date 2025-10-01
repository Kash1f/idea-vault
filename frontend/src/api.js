import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

//we're going to set up axios Interceptor where anytime we send a request it's going to check if we have an access token and if we do it will auto automatically added to that request

const apiUrl = "/choreo-apis/idea-vault/backend/v1"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

//we will look for the access token in local storage, if it exists we will add it as authorization header in the request headers, otherwise we don't need to do anything because the request will be sent without the authorization header