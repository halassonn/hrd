import React, { useContext, useReducer } from "react";
import Axios from "../config";
import { GlobalContext, AuthContext } from "./index";
import Cookie from "universal-cookie";
import { removeTokenFromCookie, setTokenToCookie } from "../utils";

const cookietoken = new Cookie();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...action.payload };
    case "SETUSER":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return { ...action.payload };
    default:
      return state;
  }
};

const expiredAt = 1;
var date = new Date();
date.setTime(date.getTime() + expiredAt * 60 * 1000);

const initState = {
  isAuth: cookietoken.get("token")
    ? cookietoken.get("token").isauth
    : false || false,
  token: cookietoken.get("token")
    ? cookietoken.get("token").token
    : null || null,
  username: cookietoken.get("token")
    ? cookietoken.get("token").username
    : null || null,
  level: cookietoken.get("token")
    ? cookietoken.get("token").level
    : null || null,
  user_details: cookietoken.get("token")
    ? cookietoken.get("token").userdetails
    : null || null,
};

// const initState = {
//   isAuth: false,
//   token: null,
//   email: null,
//   level: null,
//   userdetails: null,
// };

const AuthContextProvider = (props) => {
  const { children } = props;
  const { setLoading, setResponse } = useContext(GlobalContext);
  const [authState, dispatch] = useReducer(authReducer, initState);

  const errorres = (error = new Object()) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          setResponse({
            status: "error",
            message: error.response.data.message,
            show: true,
            action: null,
            children: null,
          });
          break;
        case 401:
          setResponse({
            status: "error",
            message: "Username or Password not valid",
            show: true,
            action: null,
            children: null,
          });
          break;
        default:
          setResponse({
            status: "error",
            message: error.response.data.message,
            show: true,
            action: null,
            children: null,
          });
          break;
      }
    } else {
      setResponse({
        status: "error",
        message: error,
        show: true,
        action: null,
        children: null,
      });
    }
    setLoading(false);
  };

  const login = (user) => {
    console.log("console : ", user);
    setLoading(true);
    setTimeout(async () => {
      await Axios.post("/user/signin", { ...user })
        .then((res) => {
          console.log("console : ", res.data);
          dispatch({
            type: "LOGIN",
            payload: { isAuth: true, ...res.data },
          });
          setTokenToCookie(
            "token",
            {
              token: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              isauth: true,
              level: res.data.level,
              username: res.data.username,
              userdetails: res.data.user_details,
            },
            {
              path: "/",
              // expires:
            }
          );

          // Axios.interceptors.request.use(function (config) {
          //   config.headers.Authorization = res.data.accesToken;
          //   return config;
          // });
          // console.log(Axios.get("headers"));
          setLoading(false);
        })
        .catch((error) => {
          errorres(error);
          // setLoading(false);
          // if (!error.response) {
          //   console.log(error);
          //   setResponse({
          //     status: "error",
          //     message:
          //       "Cannot Connect to Server. Check Your Internet Connection",
          //     show: true,
          //     action: null,
          //     children: null,
          //   });
          // }
          // if (error.response) {
          //   // console.log(error.response.data);
          //   // console.log(error.response.status);
          //   switch (error.response.status) {
          //     case 400:
          //       setResponse({
          //         status: "error",
          //         message: error.response.data.msg,
          //         show: true,
          //         action: null,
          //         children: null,
          //       });
          //       break;
          //     case 401:
          //       setResponse({
          //         status: "error",
          //         message: "Username or Password not valid",
          //         show: true,
          //         action: null,
          //         children: null,
          //       });
          //       break;

          //     default:
          //       setResponse({
          //         status: "error",
          //         message: error.response.message,
          //         show: true,
          //         action: null,
          //         children: null,
          //       });
          //       break;
          //   }
          // }
        });
    }, 1000);
  };

  const logout = () => {
    removeTokenFromCookie("token");
    dispatch({
      type: "LOGOUT",
      payload: { isAuth: false, level: null },
    });
    // setTimeout(() => {
    //   return <Redirect to="/login" />;
    // }, 1000);
  };

  const loaduser = () => {
    Axios.get("/user/details")
      .then((res) => {
        // console.log(res);
        dispatch({
          type: "SETUSER",
          payload: { ...res.data.data },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changePassword = (username, data) => {
    setLoading(true);
    Axios.post(`/user/change-password?username=${username}`, data)
      .then((res) => {
        setLoading(false);
        logout();
        setResponse({
          status: "success",
          message: "Password Berhasil di Ganti, Silahkan Login Kembali",
          show: true,
          children: null,
          action: null,
        });
      })
      .catch((error) => {
        errorres(error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        loaduser,
        dispatch,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
