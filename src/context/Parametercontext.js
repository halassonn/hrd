/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Parametercontext.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: halasson <halasson@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/10/06 12:10:12 by halasson          #+#    #+#             */
/*   Updated: 2022/01/23 13:07:39 by halasson         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { useReducer, useContext } from "react";
import Axios from "../config";
import { getTokenFromCookie } from "../utils";
import { GlobalContext, ParameterContext } from "./index";

export const GLOBAL_PARAMETERS = "GLOBAL_PARAMETERS";

export const GET_PARAM_JABATAN = "GET_PARAM_JABATAN";
export const SAVE_PARAM_JABATAN = "SAVE_PARAM_JABATAN";
export const UPDATE_PARAM_JABATAN = "UPDATE_PARAM_JABATAN";
export const DELETE_PARAM_JABATAN = "DELETE_PARAM_JABATAN";

export const GET_PARAM_BPJS = "GET_PARAM_BPJS";
export const DELETE_PARAM_BPJS = "DELETE_PARAM_BPJS";
export const UPDATE_PARAM_BPJS = "UPDATE_PARAM_BPJS";
export const ADD_PARAM_BPJS = "ADD_PARAM_BPJS";

export const GET_PARAM_PPH21 = "GET_PARAM_PPH21";
export const UPDATE_PARAM_PPH21 = "UPDATE_PARAM_PPH21";
export const ADD_PARAM_PPH21 = "ADD_PARAM_PPH21";
export const DELETE_PTKP_SETAHUN = "DELETE_PTKP_SETAHUN";

export const SET_TANGGAL_PENGGAJIAN = "SET_TANGGAL_PENGGAJIAN";
export const GET_TANGGAL_PENGGAJIAN = "GET_TANGGAL_PENGGAJIAN";

const globalParameterState = {
  parameters: {
    agama: [],
    jenkel: [],
    jeniskaryawan: [],
    statuskawin: [],
    kodekantor: [],
    jabatan: [],
    kodetingkatjabatan: [],
    pph21: {
      persen_pajak: 0,
      persen_biaya_jabatan: 0,
      ptkp: [],
    },
    tanggal_penggajian: null,
  },
};

const parameterReducer = (state, action) => {
  switch (action.type) {
    case GLOBAL_PARAMETERS:
      return action.payload;
    case GET_PARAM_JABATAN:
      return {
        ...state,
        parameters: {
          ...state.parameters,
          jabatan: [...action.payload],
        },
      };

    case SAVE_PARAM_JABATAN:
      if (action.param) {
        return {
          ...state,
          parameters: {
            ...state.parameters,
            jabatan: state.parameters.jabatan
              .map((item) => {
                return item._id.toString() === action.param.toString()
                  ? action.payload
                  : item;
              })
              .sort((a, b) => a.updatedAt - b.updatedAt, 1),
          },
        };
      } else {
        return {
          ...state,
          parameters: {
            ...state.parameters,
            jabatan: [...state.parameters.jabatan, action.payload],
          },
        };
      }

    case DELETE_PARAM_JABATAN:
      return {
        ...state,
        parameters: {
          ...state.parameters,
          jabatan: state.parameters.jabatan
            .filter((item) => item._id.toString() !== action.param.toString())
            .sort((a, b) => a.updatedAt - b.updatedAt, 1),
        },
      };
    //BPJS
    case GET_PARAM_BPJS:
      return {
        ...state,
        parameters: {
          ...state.parameters,
          bpjs: [...action.payload],
        },
      };
    case ADD_PARAM_BPJS:
      const datasimpanbpjs = [...state.parameters.bpjs, action.payload].sort(
        (a, b) => a.createdAt - b.createdAt,
        0
      );
      return {
        ...state,
        parameters: {
          ...state.parameters,
          bpjs: datasimpanbpjs,
        },
      };
    case UPDATE_PARAM_BPJS:
      const dataUpdatebpjs = state.parameters.bpjs
        .map((item) => {
          return item._id.toString() === action.param.toString()
            ? action.payload
            : item;
        })
        .sort((a, b) => a.updatedAt - b.updatedAt, 1);
      return {
        ...state,
        parameters: {
          ...state.parameters,
          bpjs: dataUpdatebpjs,
        },
      };

    case DELETE_PARAM_BPJS:
      const deleteDatabpjs = state.parameters.bpjs
        .filter((item) => {
          return item._id.toString() !== action.param.toString();
        })
        .sort((a, b) => a.updatedAt - b.updatedAt, 1);
      return {
        ...state,
        parameters: {
          ...state.parameters,
          bpjs: deleteDatabpjs,
        },
      };

    //PPH21
    case GET_PARAM_PPH21:
      return {
        ...state,
        parameters: {
          ...state.parameters,
          pph21: { ...action.payload },
        },
      };

    case ADD_PARAM_PPH21:
      const datasimpan = [
        ...state.parameters.pph21.ptkp_setahun,
        action.payload.ptkp_setahun,
      ].sort((a, b) => a.createdAt - b.createdAt, 0);
      return {
        ...state,
        parameters: {
          ...state.parameters,
          pph21: {
            persen_pajak: action.payload.persen_pajak,
            persen_biaya_jabatan: action.payload.persen_biaya_jabatan,
            ptkp_setahun: datasimpan,
          },
        },
      };
    case UPDATE_PARAM_PPH21:
      const dataUpdate = state.parameters.pph21.ptkp_setahun
        .map((item) => {
          return item._id.toString() === action.param.toString()
            ? action.payload.ptkp_setahun
            : item;
        })
        .sort((a, b) => a.updatedAt - b.updatedAt, 1);
      return {
        ...state,
        parameters: {
          ...state.parameters,
          pph21: {
            persen_pajak: action.payload.persen_pajak,
            persen_biaya_jabatan: action.payload.persen_biaya_jabatan,
            ptkp_setahun: dataUpdate,
          },
        },
      };
    case DELETE_PTKP_SETAHUN:
      const deleteData = state.parameters.pph21.ptkp_setahun
        .filter((item) => {
          return item._id.toString() !== action.param.toString();
        })
        .sort((a, b) => a.updatedAt - b.updatedAt, 1);
      return {
        ...state,
        parameters: {
          ...state.parameters,
          pph21: {
            ...state.parameters.pph21,
            ptkp_setahun: deleteData,
          },
        },
      };

    case SET_TANGGAL_PENGGAJIAN:
      return {
        ...state,
        parameters: {
          ...state.parameters,
          tanggal_penggajian: action.payload,
        },
      };
    case GET_TANGGAL_PENGGAJIAN:
      return {};

    default:
      return state;
  }
};

const ParameterContextProvider = (props) => {
  const [state, dispatch] = useReducer(parameterReducer, globalParameterState);
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

  // Action get all parameters and data kantor
  const getParameters = async () => {
    let source = Axios.CancelToken.source();
    // console.log('*****************',source)
    // const getp = async () => {
    await Promise.all([
      Axios.get("/parameters", { cancelToken: source.token }),
      // Axios.get("/parameters/tingkat_jabatan", { cancelToken: source.token }),
      // Axios.get("/persediaan/kode persediaan", { cancelToken: source.token }),
      Axios.get("/datakantor", { cancelToken: source.token }),
    ])
      .then((res) => {
        const [params, kodetingkat, kode_persediaan, datakantor] = [...res];

        dispatch({
          type: GLOBAL_PARAMETERS,
          payload: {
            parameters: {
              agama: params.data.agama,
              jenkel: params.data.jenkel,
              jeniskaryawan: params.data.jeniskaryawan,
              statuskawin: params.data.statuskawin,
              kodekantor: params.data.kodekantor,
              jabatan: params.data.jabatan,
              // kodetingkatjabatan: kodetingkat.data,
              // kode_persediaan: kode_persediaan.data,
            },
            // datakantor: datakantor.data.data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        errorres(error);
      });
    // };

    // getp();
    return () => {
      source.cancel();
    };
  };

  // Action for data jabatan

  const getParameterJabatan = async () => {
    let source = Axios.CancelToken.source();
    setLoading(true);
    await Axios.get("/parameters/jabatan", { cancelToken: source.token })
      .then((data) => {
        dispatch({
          type: GET_PARAM_JABATAN,
          payload: data.data,
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

  const savejabatan = async (data) => {
    let source = Axios.CancelToken.source();
    setLoading(true);
    data._id
      ? await Axios.put(`/parameters/jabatan?id=${data._id}`, data, {
          cancelToken: source.token,
        })
          .then((data) => {
            dispatch({
              type: SAVE_PARAM_JABATAN,
              payload: data.data.data,
              param: data._id,
            });
            setLoading(false);
            setResponse({
              status: "success",
              message: "Data berhasil di simpan",
              show: true,
            });
          })
          .catch((error) => {
            setLoading(false);
            errorres(error);
          })
      : await Axios.post("/parameters/jabatan", data, {
          cancelToken: source.token,
        })
          .then((data) => {
            console.log(data);
            dispatch({
              type: SAVE_PARAM_JABATAN,
              payload: data.data.data,
            });
            setLoading(false);
            setResponse({
              status: "success",
              message: "Data berhasil di simpan",
              show: true,
            });
          })
          .catch((error) => {
            setLoading(false);
            errorres(error);
          });
    return () => {
      source.cancel();
    };
  };

  const deletejabatan = async (id) => {
    let source = Axios.CancelToken.source();
    setLoading(true);
    try {
      await Axios.delete(`/parameters/jabatan?id=${id}`);
      setLoading(false);
      dispatch({
        type: DELETE_PARAM_JABATAN,
        param: id,
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

  // Parameter BPJS

  const getParameterBPJS = async () => {
    let source = Axios.CancelToken.source();
    setLoading(true);
    await Axios.get("/parameters/bpjs", { cancelToken: source.token })
      .then((data) => {
        dispatch({
          type: GET_PARAM_BPJS,
          payload: data.data,
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

  const saveParameterBpjs = async (id, fasilitas, data) => {
    let source = Axios.CancelToken.source();
    setLoading(true);
    id
      ? await Axios.put(
          `/parameters/bpjs?id=${id}&fasilitas=${fasilitas}`,
          data,
          {
            cancelToken: source.token,
          }
        )
          .then((data) => {
            dispatch({
              type: UPDATE_PARAM_BPJS,
              payload: data.data.data,
              param: id,
            });
            setLoading(false);
            setResponse({
              status: "success",
              message: "Data berhasil di simpan",
              show: true,
            });
          })
          .catch((error) => {
            setLoading(false);
            errorres(error);
          })
      : await Axios.post("/parameters/bpjs", data, {
          cancelToken: source.token,
        })
          .then((data) => {
            console.log(data);
            dispatch({
              type: ADD_PARAM_BPJS,
              payload: data.data.data,
            });
            setLoading(false);
            setResponse({
              status: "success",
              message: "Data berhasil di simpan",
              show: true,
            });
          })
          .catch((error) => {
            setLoading(false);
            errorres(error);
          });
    return () => {
      source.cancel();
    };
  };

  const deleteParameterBPJS = async (id, fasilitas) => {
    let source = Axios.CancelToken.source();
    setLoading(true);

    await Axios.delete(`/parameters/bpjs?id=${id}&fasilitas=${fasilitas}`, {
      cancelToken: source.token,
    })
      .then((d) => {
        dispatch({
          type: DELETE_PARAM_BPJS,
          param: id,
        });
        setLoading(false);
        setResponse({
          status: "success",
          message: d.data.msg,
          show: true,
        });
      })
      .catch((error) => {
        setLoading(false);
        errorres(error);
      });
    return () => {
      source.cancel();
    };
  };

  // Parameter PPH21

  const getParameterPph21 = async () => {
    let source = Axios.CancelToken.source();
    setLoading(true);
    await Axios.get("/parameters/ptkp", { cancelToken: source.token })
      .then((data) => {
        dispatch({
          type: GET_PARAM_PPH21,
          payload: data.data,
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

  const saveParameterPph21 = async (id, data) => {
    let source = Axios.CancelToken.source();
    setLoading(true);
    id
      ? await Axios.put(`/parameters/ptkp?id=${id}`, data, {
          cancelToken: source.token,
        })
          .then((data) => {
            dispatch({
              type: UPDATE_PARAM_PPH21,
              payload: data.data.data,
              param: id,
            });
            setLoading(false);
            setResponse({
              status: "success",
              message: "Data berhasil di simpan",
              show: true,
            });
          })
          .catch((error) => {
            setLoading(false);
            errorres(error);
          })
      : await Axios.post("/parameters/ptkp", data, {
          cancelToken: source.token,
        })
          .then((data) => {
            console.log(data.data.data.ptkp_setahun);
            dispatch({
              type: ADD_PARAM_PPH21,
              payload: data.data.data,
            });
            setLoading(false);
            setResponse({
              status: "success",
              message: "Data berhasil di simpan",
              show: true,
            });
          })
          .catch((error) => {
            setLoading(false);
            errorres(error);
          });
    return () => {
      source.cancel();
    };
  };

  const deletePTKP = async (id, status) => {
    let source = Axios.CancelToken.source();
    setLoading(true);

    await Axios.delete(`/parameters/ptkp?id=${id}&status=${status}`, {
      cancelToken: source.token,
    })
      .then((d) => {
        dispatch({
          type: DELETE_PTKP_SETAHUN,
          param: id,
        });
        setLoading(false);
        setResponse({
          status: "success",
          message: d.data.msg,
          show: true,
        });
      })
      .catch((error) => {
        setLoading(false);
        errorres(error);
      });
    return () => {
      source.cancel();
    };
  };

  const getTanggalPenggajian = async () => {
    let source = Axios.CancelToken.source();

    await Axios.get(`/parameters/tanggal_penggajian`, {
      cancelToken: source.token,
    })
      .then((d) => {
        dispatch({
          type: SET_TANGGAL_PENGGAJIAN,
          payload: d.data.tanggal_penggajian,
        });
      })
      .catch((error) => {
        errorres(error);
      });
    return () => {
      source.cancel();
    };
  };
  const setTanggalPenggajian = async (data) => {
    let source = Axios.CancelToken.source();
    setLoading(true);
    await Axios.post(`/parameters/tanggal_penggajian`, data, {
      cancelToken: source.token,
    })
      .then((d) => {
        dispatch({
          type: SET_TANGGAL_PENGGAJIAN,
          payload: d.data.data.tanggal_penggajian,
        });
        setLoading(false);
        setResponse({
          status: "success",
          message: d.data.msg,
          show: true,
        });
      })
      .catch((error) => {
        setLoading(false);
        errorres(error);
      });
    return () => {
      source.cancel();
    };
  };

  return (
    <ParameterContext.Provider
      value={{
        ...state,
        getParameters,
        getParameterJabatan,
        savejabatan,
        deletejabatan,
        getParameterBPJS,
        saveParameterBpjs,
        deleteParameterBPJS,
        getParameterPph21,
        saveParameterPph21,
        deletePTKP,
        dispatch,
        getTanggalPenggajian,
        setTanggalPenggajian,
      }}
    >
      {children}
    </ParameterContext.Provider>
  );
};

export default ParameterContextProvider;
