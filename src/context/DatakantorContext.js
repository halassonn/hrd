/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   DatakantorContext.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: halasson <halasson@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/06 12:10:12 by halasson          #+#    #+#             */
/*   Updated: 2021/11/03 17:14:32 by halasson         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { useReducer, useContext } from "react";
import Axios from "../config";
import { getTokenFromCookie } from "../utils";
import { GlobalContext, DatakantorContext } from "./index";

export const GLOBAL_PARAMETERS = "GLOBAL_PARAMETERS";
export const SET_DATA_KANTORS = "SET_DATA_KANTORS";
export const UPDATE_DATA_KANTOR = "UPDATE_DATA_KANTOR";
export const SAVE_DATA_KANTOR = "SAVE_DATA_KANTOR";
export const DELETE_DATA_KANTOR = "DELETE_DATA_KANTOR";

const datakantorstate = {
  datakantor: [],
};

const parameterReducer = (state, action) => {
  switch (action.type) {
    case GLOBAL_PARAMETERS:
      return action.payload;
    case SET_DATA_KANTORS:
      return { ...state, datakantor: [...action.payload] };
    case SAVE_DATA_KANTOR:
      if (action.param) {
        return {
          ...state,
          datakantor: state.datakantor
            .map((item) => {
              return item.kode === action.param ? action.payload : item;
            })
            .sort((a, b) => a.updatedAt - b.updatedAt, 1),
        };
      } else {
        return {
          ...state,
          datakantor: [...state.datakantor, action.payload],
        };
      }
    case DELETE_DATA_KANTOR:
      return {
        ...state,
        datakantor: state.datakantor
          .filter((item) => item.kode.toString() !== action.param.toString())
          .sort((a, b) => a.updatedAt - b.updatedAt, 1),
      };

    default:
      return state;
  }
};

const DatakantorContextProvider = (props) => {
  const [state, dispatch] = useReducer(parameterReducer, datakantorstate);
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

  // Action for data kantor
  const simpanDataKantor = async (data) => {
    let source = Axios.CancelToken.source();
    setLoading(true);
    try {
      var res = null;
      if (data._id) {
        res = await Axios.put(`/datakantor?kode=${data.kode}`, data);
      } else res = await Axios.post("/datakantor", data);
      setLoading(false);
      dispatch({
        type: SAVE_DATA_KANTOR,
        payload: res.data.data,
        param: data._id ? data.kode : null,
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
    return () => {
      source.cancel();
    };
  };
  const getDataKantor = async () => {
    let source = Axios.CancelToken.source();
    setLoading(true);
    await Axios.get("/datakantor", { cancelToken: source.token })
      .then((data) => {
        dispatch({
          type: SET_DATA_KANTORS,
          payload: data.data.data,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        errorres(error);
      });
    return () => {
      source.cancel();
    };
  };

  const deleteDatakantor = async (kode) => {
    let source = Axios.CancelToken.source();
    setLoading(true);
    try {
      await Axios.delete(`/datakantor?kode=${kode}`);
      setLoading(false);
      dispatch({
        type: DELETE_DATA_KANTOR,
        param: kode,
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
    return () => {
      source.cancel();
    };
  };

  return (
    <DatakantorContext.Provider
      value={{
        ...state,
        simpanDataKantor,
        deleteDatakantor,
        getDataKantor,
        dispatch,
      }}
    >
      {children}
    </DatakantorContext.Provider>
  );
};

export default DatakantorContextProvider;
