import { useReducer, useContext } from "react";
import Axios from "../config";
import { getTokenFromCookie } from "../utils";
import { GlobalContext, UserContext } from "./index";

const userstate = {
  user: [],
};

export const GET_USERS = "GET_USERS";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

const UserReducers = (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return { user: [...action.payload] };
    case ADD_USER:
      if (action.param) {
        return {
          ...state,
          user: state.user.map((item) => {
            return item._id === action.param ? action.payload : item;
          }),
        };
      } else {
        return {
          ...state,
          user: [...state.user, action.payload],
        };
      }
    case DELETE_USER:
      return {
        ...state,
        user: state.user.filter((item) => item.username !== action.param),
      };
    default:
      return state;
  }
};

const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(UserReducers, userstate);
  const { children } = props;
  const { setLoading, setResponse } = useContext(GlobalContext);

  Axios.interceptors.request.use(function (config) {
    config.headers.Authorization = getTokenFromCookie();
    return config;
  });

  const errorres = (error = new Object()) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          setResponse({
            status: "error",
            message: error.response.data.message,
            show: true,
          });
          break;
        case 401:
          setResponse({
            status: "error",
            message: "Unauthorized",
            show: true,
          });
          break;
        default:
          setResponse({
            status: "error",
            message: error.response.data.message,
            show: true,
          });
          break;
      }
    } else {
      setResponse({
        status: "error",
        message: error,
        show: true,
      });
    }
    setLoading(false);
  };

  const getUsers = async () => {
    Axios.interceptors.request.use(function (config) {
      config.headers.Authorization = getTokenFromCookie();
      return config;
    });
    let source = Axios.CancelToken.source();
    setLoading(true);
    try {
      await Axios.get("/user")
        .then((res) => {
          const data = res.data.data;
          console.log(data);
          dispatch({
            type: GET_USERS,
            payload: data,
          });
          setLoading(false);
        })
        .catch((error) => {
          errorres(error);

          setLoading(false);
        });
    } catch (error) {
      errorres(error);
    }

    return () => {
      source.cancel();
    };
  };
  const addUser = async (data) => {
    setLoading(true);
    try {
      var res = null;
      if (data.id) {
        res = await Axios.put(`/user?id=${data.id}`, data);
      } else res = await Axios.post("/user", data);
      setLoading(false);
      dispatch({
        type: ADD_USER,
        payload: res.data.data,
        param: data.id ? data.id : null,
      });
      setResponse({
        status: "success",
        message: "Data berhasil di simpan",
        show: true,
      });
    } catch (error) {
      setLoading(false);
      errorres(error);
    }
  };

  const deleteUser = async (username) => {
    setLoading(true);
    try {
      await Axios.delete(`/user?username=${username}`);
      setLoading(false);
      dispatch({
        type: DELETE_USER,
        param: username,
      });
      setResponse({
        status: "success",
        message: "Data berhasil di hapus",
        show: true,
      });
    } catch (error) {
      setLoading(false);
      errorres(error);
    }
  };

  const gantiPassword = async () => {};

  return (
    <UserContext.Provider
      value={{
        ...state,
        getUsers,
        addUser,
        deleteUser,
        dispatch,
        gantiPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
