import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const BaseApi = axios.create({
  baseURL: BASE_URL,
});

export const DisplayPostApi = axios.create({
  baseURL: BASE_URL + "posts",
});

export const PostListApi = axios.create({
  baseURL: BASE_URL + "posts/user/",
});

export const FollowApi = axios.create({
  baseURL: BASE_URL + "follow/",
});

export const EditProfileApi = axios.create({
  baseURL: BASE_URL + "dashboard/edit-profile",
});

export const UserInfoApi = axios.create({
  baseURL: BASE_URL + "dashboard/profile-info",
});

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const selectedAccount = Cookies.get("selectedAccount");
    const currentTokenCookie = Cookies.get("token");
    const token =
      currentTokenCookie && selectedAccount
        ? JSON.parse(currentTokenCookie)[parseInt(selectedAccount)]
        : null;

    const currentUsernameCookie = Cookies.get("username");
    const cookieUsername =
      currentUsernameCookie && selectedAccount
        ? JSON.parse(currentUsernameCookie)[parseInt(selectedAccount)]
        : null;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("call the refresh token api here");
      // Handle 401 error, e.g., redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
export const EditPostApi = axios.create({
  baseURL: BASE_URL + "posts/",
});
