import { useReducer } from "react";
import { GlobalContext } from "./index";
import Axios from "../config";

export const LOADING = "LOADING";
export const RESPONSE = "RESPONSE";
export const CLOSE_RESPONSE = "CLOSE_RESPONSE";
export const GLOBAL_PARAMETERS = "GLOBAL_PARAMETERS";
export const SET_DATA_KANTORS = "SET_DATA_KANTORS";

const globalAppState = {
  pend_terakhir: "",
  time: 100,
  loading: false,
  response: {
    status: null,
    message: null,
    show: false,
    action: null,
    children: null,
  },
  app: {
    name: null,
    page: null,
  },
  file_upload: "",
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    case RESPONSE:
      return { ...state, response: action.payload };
    case CLOSE_RESPONSE:
      return { ...state, response: globalAppState.response };
    case GLOBAL_PARAMETERS:
      return { ...state, parameters: { ...action.payload } };
    case SET_DATA_KANTORS:
      return { ...state, parameters: { datakantor: { ...action.payload } } };
    case "LOGOUT":
      return { ...state, ...action.payload };
    case "APP":
      return { ...state, app: { ...action.payload } };
    case "UPLOAD":
      return {
        ...state,
        file_upload: action.payload,
      };
    default:
      return state;
  }
};

const GlobalContextProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, globalAppState);
  const { children } = props;

  const setLoading = (arg) => {
    dispatch({ type: LOADING, payload: arg });
  };

  const setResponse = (arg) => {
    dispatch({ type: RESPONSE, payload: arg });
  };
  const closeResponse = () => {
    dispatch({ type: CLOSE_RESPONSE, payload: {} });
  };
  const setApp = ({ name, page }) => {
    // console.log(name);
    dispatch({
      type: "APP",
      payload: { name, page: page === "#" ? null : page.toLowerCase() },
    });
  };

  const errorres = (error = new Object()) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          setResponse({
            status: "error",
            message: error.response.data.message,
            show: true,
            children: null,
          });
          break;
        case 401:
          setResponse({
            status: "error",
            message: "Unauthorized",
            show: true,
            children: null,
          });
          break;
        default:
          setResponse({
            status: "error",
            message: error.response.data.message,
            show: true,
            children: null,
          });
          break;
      }
    } else {
      setResponse({
        status: "error",
        message: error,
        show: true,
        children: null,
      });
    }
    setLoading(false);
  };

  const uploadPdf = async (nik, file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", file);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "multipart/form-data";
      return config;
    });

    try {
      await Axios.post(`/upload?nik=${nik}`, formData).then((res) => {
        setLoading(false);
        dispatch({
          type: "UPLOAD",
          payload: res.data.url,
        });
      });
    } catch (error) {
      errorres(error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        dispatch,
        setLoading,
        setResponse,
        closeResponse,
        setApp,
        uploadPdf,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
