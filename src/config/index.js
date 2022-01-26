import axios from "axios";
import { getTokenFromCookie } from "../utils";
// export const cancleToken = axios.CancelToken.source();
// export const isCancel = axios.isCancel();

// const expiredAt = 1;
// var date = new Date();
// date.setTime(date.getTime() + expiredAt * 60 * 1000);
// const token = cookietoken.get("token");
const token = getTokenFromCookie();

// const axios = Axios.create({ baseURL: process.env.REACT_APP_BASE_URL_LOCAL });

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_LOCAL;
axios.defaults.baseURL = "api/v1/";
axios.defaults.headers["X-API-KEY"] = "12345";
axios.defaults.headers["Content-type"] = "application/json";

if (token !== undefined) {
  axios.defaults.headers["Authorization"] = token;
}

axios.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const errorhandler = (error, contex) => {
  const { setResponse } = contex;
  if (error.response) {
    switch (error.response.status) {
      case 400:
        setResponse({
          status: "error",
          message: error.response.data.msg,
          show: true,
        });
        break;
      case 401:
        setResponse({
          status: "error",
          message: "Username or Password not valid",
          show: true,
        });
        break;
      default:
        setResponse({
          status: "error",
          message: error.response.message,
          show: true,
        });
        break;
    }
  } else {
    console.log(error);
  }
};

export default axios;
