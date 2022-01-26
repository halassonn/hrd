import { useReducer, useContext } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import Axios from "../config";
import { useTheme } from "../theme/useTheme";
import { getTokenFromCookie } from "../utils";
import { GlobalContext, KaryawanContext } from "./index";

const KaryawanState = {
  karyawans: [],
  riwayat_pendidikan: [],
  detail_riwayat_pendidikan: null,
  riwayat_keluarga: [],
  riwayat_pekerjaan: [],
  riwayat_pelatihan: [],
  riwayat_peringatan: [],
  detail_riwayat_pekerjaan: null,
  temp_riwayat_keluarga: [],
  karyawan: null,
  selected: null,
  selected_keluarga: null,
};

export const GET_KARYAWAN = "GET_KARYAWAN";
export const GET_KARYAWANS = "GET_KARYAWANS";
export const SAVE_KARYAWAN = "SAVE_KARYAWAN";
export const IMPORT_KARYAWANS = "IMPORT_KARYAWANS";
export const DELETE_KARYAWAN = "DELETE_KARYAWAN";
export const CHANGE_AVATAR_KARYAWAN = "CHANGE_AVATAR_KARYAWAN";
export const SELECTED = "SELECTED";
export const UPLOAD = "UPLOAD";
export const SET_TEMP_RIWAYAT_KELUARGA = "SET_TEMP_RIWAYAT_KELUARGA";
export const ADD_RIWAYAT_KELUARGA = "ADD_RIWAYAT_KELUARGA";
export const GET_RIWAYAT_KELUARGA = "GET_RIWAYAT_KELUARGA";
export const UPDATE_TEMP_RIWAYAT_KELUARGA = "UPDATE_TEMP_RIWAYAT_KELUARGA";
export const DELETE_TEMP_RIWAYAT_KELUARGA = "DELETE_TEMP_RIWAYAT_KELUARGA";
export const DELETE_RIWAYAT_KELUARGA = "DELETE_RIWAYAT_KELUARGA";
export const UPDATE_RIWAYAT_KELUARGA = "UPDATE_RIWAYAT_KELUARGA";

export const GET_PENDIDIKAN = "GET_PENDIDIKAN";
export const SET_PENDIDIKAN = "SET_PENDIDIKAN";
export const ADD_PENDIDIKAN = "ADD_PENDIDIKAN";
export const UPDATE_PENDIDIKAN = "UPDATE_PENDIDIKAN";
export const DELETE_PENDIDIKAN = "DELETE_PENDIDIKAN";

export const GET_DATA_PEKERJAAN = "GET_DATA_PEKERJAAN";
export const ADD_DATA_PEKERJAAN = "ADD_DATA_PEKERJAAN";
export const UPDATE_DATA_PEKERJAAN = "UPDATE_DATA_PEKERJAAN";
export const DELETE_DATA_PEKERJAAN = "DELETE_DATA_PEKERJAAN";

export const GET_DATA_PELATIHAN = "GET_DATA_PELATIHAN";
export const ADD_DATA_PELATIHAN = "ADD_DATA_PELATIHAN";
export const UPDATE_DATA_PELATIHAN = "UPDATE_DATA_PELATIHAN";
export const DELETE_DATA_PELATIHAN = "DELETE_DATA_PELATIHAN";

export const GET_DATA_PERINGATAN = "GET_DATA_PERINGATAN";
export const ADD_DATA_PERINGATAN = "ADD_DATA_PERINGATAN";
export const UPDATE_DATA_PERINGATAN = "UPDATE_DATA_PERINGATAN";
export const DELETE_DATA_PERINGATAN = "DELETE_DATA_PERINGATAN";

export const SELECTED_KELUARGA = "SELECTED_KELUARGA";

const KaryawanReducer = (state, action) => {
  switch (action.type) {
    case GET_KARYAWAN:
      return { ...state, karyawan: action.payload };
    case GET_KARYAWANS:
      return { ...state, karyawans: [...action.payload] };
    case IMPORT_KARYAWANS:
      return { ...state, karyawans: [...action.payload] };

    case SAVE_KARYAWAN:
      if (action.param) {
        return {
          ...state,
          karyawans: state.karyawans
            .map((item) => {
              return item._id.toString() === action.param.toString()
                ? action.payload
                : item;
            })
            .sort((a, b) => a.updatedAt - b.updatedAt, 1),
        };
      } else {
        return {
          ...state,
          karyawans: [...state.karyawans, action.payload],
          selected: action.payload,
        };
      }
    case DELETE_KARYAWAN:
      return {
        ...state,
        karyawans: state.karyawans
          .filter((item) => item.nik.toString() !== action.param.toString())
          .sort((a, b) => a.updatedAt - b.updatedAt, 1),
      };
    case SELECTED:
      return {
        ...state,
        selected: action.payload,
      };

    // data keluarga

    case SET_TEMP_RIWAYAT_KELUARGA:
      return {
        ...state,
        temp_riwayat_keluarga: [...state.temp_riwayat_keluarga, action.payload],
      };
    case UPDATE_TEMP_RIWAYAT_KELUARGA:
      return {
        ...state,
        temp_riwayat_keluarga: state.temp_riwayat_keluarga.map((item) => {
          return item.no_KTP.toString() === action.payload.no_KTP.toString()
            ? action.payload
            : item;
        }),
      };
    case DELETE_TEMP_RIWAYAT_KELUARGA:
      // return {
      //   ...state,
      //   temp_riwayat_keluarga: [],
      // };
      return {
        ...state,
        temp_riwayat_keluarga: state.temp_riwayat_keluarga
          .filter((item) => item.no_KTP.toString() !== action.param.toString())
          .sort((a, b) => a.updatedAt - b.updatedAt, 1),
      };

    case GET_RIWAYAT_KELUARGA:
      return {
        ...state,
        riwayat_keluarga: action.payload,
      };
    case ADD_RIWAYAT_KELUARGA:
      return {
        ...state,
        riwayat_keluarga: [...state.riwayat_keluarga, ...action.payload],
      };
    case UPDATE_RIWAYAT_KELUARGA:
      return {
        ...state,
        riwayat_keluarga: state.riwayat_keluarga.map((item) => {
          return item._id.toString() === action.param.toString()
            ? action.payload
            : item;
        }),
      };
    case DELETE_RIWAYAT_KELUARGA:
      return {
        ...state,
        riwayat_keluarga: state.riwayat_keluarga
          .filter((item) => item._id.toString() !== action.param.toString())
          .sort((a, b) => a.updatedAt - b.updatedAt, 1),
      };

    case SELECTED_KELUARGA:
      return {
        ...state,
        selected_keluarga: action.payload,
      };
    case "CLEAR_KARYAWAN":
      return {
        ...state,
        karyawan: null,
      };

    //pendidikan
    case GET_PENDIDIKAN:
      return {
        ...state,
        riwayat_pendidikan: action.payload.map((item) => {
          return { ...item };
        }),
      };
    // if (action.param.pendidikan_terakhir) {
    //   return { ...state, riwayat_pendidikan: action.payload };
    // } else {
    //   return { ...state, detail_riwayat_pendidikan: action.payload };
    // }

    case SET_PENDIDIKAN:
      if (action.param) {
        return {
          ...state,
          riwayat_pendidikan: state.riwayat_pendidikan
            .map((item) => {
              return item._id.toString() === action.param.toString()
                ? action.payload
                : item;
            })
            .sort((a, b) => a.updatedAt - b.updatedAt, 1),
        };
      } else {
        return {
          ...state,
          riwayat_pendidikan: [...state.riwayat_pendidikan, action.payload],
        };
      }
    case ADD_PENDIDIKAN:
      const da = state.riwayat_pendidikan.map((item) => {
        // if (action.payload.pendidikan_terakhir) {
        //   item.pendidikan_terakhir = "Y";
        // }

        return item;
      });
      return {
        ...state,
        riwayat_pendidikan: [...da, action.payload],
      };

    case UPDATE_PENDIDIKAN:
      return {
        ...state,
        riwayat_pendidikan: state.riwayat_pendidikan.map((item) => {
          return item._id.toString() === action.param.toString()
            ? {
                ...action.payload,
              }
            : {
                ...item,
              };
        }),
      };

    case DELETE_PENDIDIKAN:
      return {
        ...state,
        riwayat_pendidikan: state.riwayat_pendidikan
          .filter((item) => item._id.toString() !== action.param.toString())
          .sort((a, b) => a.updatedAt - b.updatedAt, 1),
      };
    //pekerjaan

    case ADD_DATA_PEKERJAAN:
      const daa = state.riwayat_pekerjaan.map((item) => {
        return {
          ...item,
          jabatan_aktif: action.payload.jabatan_aktif === "true" && "",
        };
      });
      return {
        ...state,
        riwayat_pekerjaan: [...daa, action.payload],
      };
    case GET_DATA_PEKERJAAN:
      if (action.param.id) {
        console.log(action.payload);
        return {
          ...state,
          detail_riwayat_pekerjaan: action.payload,
        };
      } else {
        return { ...state, riwayat_pekerjaan: action.payload };
      }

    case UPDATE_DATA_PEKERJAAN:
      return {
        ...state,
        riwayat_pekerjaan: state.riwayat_pekerjaan.map((item) => {
          return item._id.toString() === action.param.toString()
            ? action.payload
            : item;
        }),
      };
    case DELETE_DATA_PEKERJAAN:
      return {
        ...state,
        riwayat_pekerjaan: state.riwayat_pekerjaan
          .filter((item) => item._id.toString() !== action.param.toString())
          .sort((a, b) => a.updatedAt - b.updatedAt, 1),
      };

    //pelatihan
    case ADD_DATA_PELATIHAN:
      const dapel = state.riwayat_pelatihan.map((item) => {
        return {
          ...item,
        };
      });
      return {
        ...state,
        riwayat_pelatihan: [...dapel, action.payload],
      };

    case GET_DATA_PELATIHAN:
      return {
        ...state,
        riwayat_pelatihan: action.payload.map((item) => {
          return { ...item };
        }),
      };

    case UPDATE_DATA_PELATIHAN:
      return {
        ...state,
        riwayat_pelatihan: state.riwayat_pelatihan.map((item) => {
          return item._id.toString() === action.param.toString()
            ? action.payload
            : item;
        }),
      };
    case DELETE_DATA_PELATIHAN:
      return {
        ...state,
        riwayat_pelatihan: state.riwayat_pelatihan
          .filter((item) => item._id.toString() !== action.param.toString())
          .sort((a, b) => a.updatedAt - b.updatedAt, 1),
      };

    //peringatan
    case ADD_DATA_PERINGATAN:
      const daperinga = state.riwayat_peringatan.map((item) => {
        return {
          ...item,
        };
      });
      return {
        ...state,
        riwayat_peringatan: [...daperinga, action.payload],
      };

    case GET_DATA_PERINGATAN:
      return {
        ...state,
        riwayat_peringatan: action.payload.map((item) => {
          return { ...item };
        }),
      };

    case UPDATE_DATA_PERINGATAN:
      return {
        ...state,
        riwayat_peringatan: state.riwayat_peringatan.map((item) => {
          return item._id.toString() === action.param.toString()
            ? action.payload
            : item;
        }),
      };
    case DELETE_DATA_PERINGATAN:
      return {
        ...state,
        riwayat_peringatan: state.riwayat_pelatihan
          .filter((item) => item._id.toString() !== action.param.toString())
          .sort((a, b) => a.updatedAt - b.updatedAt, 1),
      };

    default:
      return state;
  }
};

const KaryawanContextProvider = (props) => {
  const [state, dispatchKaryawan] = useReducer(KaryawanReducer, KaryawanState);
  const { children } = props;
  const { theme } = useTheme();
  const { setLoading, setResponse } = useContext(GlobalContext);

  Axios.interceptors.request.use(function (config) {
    config.headers.Authorization = getTokenFromCookie();
    return config;
  });

  const errorres = (error = {}) => {
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

  const getKaryawans = async (params = null) => {
    Axios.interceptors.request.use(function (config) {
      config.headers.Authorization = getTokenFromCookie();
      return config;
    });
    let source = Axios.CancelToken.source();
    setLoading(true);
    await Axios.get(`/karyawan${params ? `?nik=${params}` : ""}`, {
      cancelToken: source.token,
    })
      .then((d) => {
        if (params) {
          if (d.data === null) {
            dispatchKaryawan({
              type: GET_KARYAWAN,
              payload: null,
            });
            setResponse({
              status: "false",
              message: `Data karyawan dengan nik ${params} tidak ditemukan`,
              show: true,
              children: null,
            });
          } else {
            dispatchKaryawan({
              type: GET_KARYAWAN,
              payload: d.data,
            });
          }
        } else {
          const data = d.data.map((e) => {
            return {
              ...e,
              alamat: e.alamat_ktp.alamat,
              // status_karyawan: e.status_karyawan ? (
              //   <FaCheck
              //     status={
              //       e.status_karyawan.toString() && e.status_karyawan.toString()
              //     }
              //     style={{ color: theme.colors.success }}
              //   />
              // ) : (
              //   <FaTimes
              //     status={
              //       e.status_karyawan.toString() && e.status_karyawan.toString()
              //     }
              //     style={{ color: theme.colors.error }}
              //   />
              // ),
            };
          });

          dispatchKaryawan({
            type: GET_KARYAWANS,
            payload: data,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (Axios.isCancel(error)) {
          console.log("AxiosCancel : cought cancle");
        } else {
          errorres(error);
        }
      });
    return () => {
      // console.log("Karyawans : unmount");
      source.cancel();
    };
  };

  const importDataKaryawan = async (file) => {
    const formData = new FormData();
    formData.append("import", file);
    setLoading(true);

    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "multipart/form-data";
      return config;
    });

    await Axios.post(`/karyawan/import`, formData)
      .then((res) => {
        const data = res.data.map((e) => {
          return {
            ...e,
            alamat: e.alamat_ktp.alamat,
            status_karyawan: e.status_karyawan ? (
              <FaCheck
                status={
                  e.status_karyawan.toString() && e.status_karyawan.toString()
                }
                style={{ color: theme.colors.success }}
              />
            ) : (
              <FaTimes
                status={
                  e.status_karyawan.toString() && e.status_karyawan.toString()
                }
                style={{ color: theme.colors.error }}
              />
            ),
          };
        });
        dispatchKaryawan({
          type: IMPORT_KARYAWANS,
          payload: data,
        });
        setResponse({
          status: "success",
          message: "Data Berhasil Di Import",
          show: true,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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
      });
  };

  const simpanDataKaryawan = async (params, data) => {
    // setLoading(true);
    // setResponse({
    //   status: "success",
    //   message: "Data Berhasil Disimpan",
    //   show: true,
    // });

    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });
    try {
      if (params) {
        await Axios.put(`/karyawan?id=${params}`, data).then((d) => {
          setLoading(false);
          console.log(d);
          const datares = {
            ...d.data.data,
            // status_karyawan: res.data.data.status_karyawan ? (
            //   <FaCheck
            //     status={
            //       res.data.data.status_karyawan.toString() &&
            //       res.data.data.status_karyawan.toString()
            //     }
            //     style={{ color: theme.colors.success }}
            //   />
            // ) : (
            //   <FaTimes
            //     status={
            //       res.data.data.status_karyawan.toString() &&
            //       res.data.data.status_karyawan.toString()
            //     }
            //     style={{ color: theme.colors.error }}
            //   />
            // ),
          };
          dispatchKaryawan({
            type: SAVE_KARYAWAN,
            payload: datares,
            param: params,
          });
          dispatchKaryawan({
            type: SELECTED,
            payload: datares,
            param: null,
          });
          setResponse({
            status: "success",
            message: "Data Berhasil Disimpan",
            show: true,
            children: null,
          });
          // dispatchKaryawan({
          //   type: SELECTED,
          //   payload: null,
          // });
        });
      } else
        await Axios.post("/karyawan", data).then((d) => {
          setLoading(false);

          const datares = {
            ...d.data.data,
            // status_karyawan: res.data.data.status_karyawan ? (
            //   <FaCheck
            //     status={
            //       res.data.data.status_karyawan.toString() &&
            //       res.data.data.status_karyawan.toString()
            //     }
            //     style={{ color: theme.colors.success }}
            //   />
            // ) : (
            //   <FaTimes
            //     status={
            //       res.data.data.status_karyawan.toString() &&
            //       res.data.data.status_karyawan.toString()
            //     }
            //     style={{ color: theme.colors.error }}
            //   />
            // ),
          };
          dispatchKaryawan({
            type: SAVE_KARYAWAN,
            payload: datares,
            param: null,
          });

          setResponse({
            status: "success",
            message: "Data Berhasil Disimpan",
            show: true,
            children: null,
          });
        });
    } catch (error) {
      setLoading(false);
      errorres(error);
    }
  };
  const deleteDataKaryawan = async (nik) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });

    try {
      await Axios.delete(`/karyawan?nik=${nik}`);
      dispatchKaryawan({
        type: DELETE_KARYAWAN,
        param: nik,
      });
      setLoading(false);
      setResponse({
        status: "success",
        message: "Data Berhasil DiHapus",
        show: true,
        children: null,
      });
    } catch (error) {
      setLoading(false);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setResponse({
              status: "error",
              message: error.response.data.msg,
              show: true,
              children: null,
            });
            break;
          case 401:
            setResponse({
              status: "error",
              message: "Username or Password not valid",
              show: true,
              children: null,
            });
            break;
          default:
            setResponse({
              status: "error",
              message: error.response.message,
              show: true,
              children: null,
            });
            break;
        }
      } else {
        console.log(error);
      }
    }
  };
  const aktivasiDataKaryawan = async (id, arg) => {
    setLoading(true);
    try {
      Axios.interceptors.request.use(function (config) {
        config.headers["Content-type"] = "  application/json";
        return config;
      });
      const res = await Axios.put(`/karyawan/aktivasi?id=${id}`, {});

      const datares = {
        ...res.data.data,
        status_karyawan: res.data.data.status_karyawan ? (
          <FaCheck
            status={
              res.data.data.status_karyawan.toString() &&
              res.data.data.status_karyawan.toString()
            }
            style={{ color: theme.colors.success }}
          />
        ) : (
          <FaTimes
            status={
              res.data.data.status_karyawan.toString() &&
              res.data.data.status_karyawan.toString()
            }
            style={{ color: theme.colors.error }}
          />
        ),
      };

      dispatchKaryawan({
        type: SAVE_KARYAWAN,
        payload: datares,
        param: id,
      });

      setLoading(false);
      setResponse({
        status: "success",
        message: `Data Berhasil di ${arg}`,
        show: true,
      });
    } catch (error) {
      setLoading(false);
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
    }
  };

  const changeAvatarKaryawan = async (nik, file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", file);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "multipart/form-data";
      return config;
    });
    try {
      const res = await Axios.post(`/karyawan/avatar?nik=${nik}`, formData);

      // const data = {
      //   ...res.data.data,
      //   status_karyawan: res.data.data.status_karyawan ? (
      //     <FaCheck
      //       status={
      //         res.data.data.status_karyawan.toString() &&
      //         res.data.data.status_karyawan.toString()
      //       }
      //       style={{ color: theme.colors.success }}
      //     />
      //   ) : (
      //     <FaTimes
      //       status={
      //         res.data.data.status_karyawan.toString() &&
      //         res.data.data.status_karyawan.toString()
      //       }
      //       style={{ color: theme.colors.error }}
      //     />
      //   ),
      // };
      dispatchKaryawan({
        type: SAVE_KARYAWAN,
        payload: res.data.data,
        param: res.data.data._id,
      });
      dispatchKaryawan({
        type: SELECTED,
        payload: res.data.data,
      });
      // setResponse({
      //   status: "success",
      //   message: "",
      //   show: true,
      //   children: null,
      // });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log(error.response);
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
              message: "Username or Password not valid",
              show: true,
              children: null,
            });
            break;
          default:
            setResponse({
              status: "error",
              message: error.response.message,
              show: true,
              children: null,
            });
            break;
        }
      } else {
        console.log(error);
      }
    }
  };

  const getpendidikan = async (params) => {
    let source = Axios.CancelToken.source();
    setLoading(true);

    try {
      await Axios.get(
        `/karyawan/data-pendidikan?nik=${params.nik}&pendidikan_terakhir=${params.pendidikan_terakhir}`,
        {
          cancelToken: source.token,
        }
      ).then((d) => {
        setLoading(false);

        // const xd = d.data.map((e) => {
        //   return {
        //     ...e,
        //     pendidikan_terakhir:
        //       e.pendidikan_terakhir === "true" ? (
        //         <FaCheck style={{ color: theme.colors.success }} />
        //       ) : (
        //         ""
        //       ),
        //   };
        // });

        dispatchKaryawan({
          type: GET_PENDIDIKAN,
          payload: d.data,
          param: params,
        });
      });
    } catch (error) {
      if (Axios.isCancel(error)) {
        console.log("AxiosCancel : cought cancle");
      } else {
        errorres(error);
      }
    }
    return () => {
      // console.log("Karyawans : unmount");
      source.cancel();
    };

    // await Axios.get(
    //   `/karyawan/data-pendidikan${params ? `?nik=${params}` : ""}`,
    //   {
    //     cancelToken: source.token,
    //   }
    // )
    //   .then((d) => {
    //     if (params) {
    //       if (d.data === null) {
    //         setResponse({
    //           status: "false",
    //           message: `Data pendidikan karyawan dengan nik ${params} tidak ditemukan`,
    //           show: true,
    //         });
    //       } else {
    //         // dispatchKaryawan({
    //         //   type: SET_PENDIDIKAN,
    //         //   payload: d.data,
    //         // });
    //       }
    //     } else {
    //       const xd = d.data.map((e) => {
    //         return {
    //           ...e,
    //           pendidikan_terakhir:
    //             e.pendidikan_terakhir === "true" ? (
    //               <FaCheck style={{ color: theme.colors.success }} />
    //             ) : (
    //               ""
    //             ),
    //         };
    //       });
    //       dispatchKaryawan({
    //         type: GET_PENDIDIKAN,
    //         payload: xd,
    //       });
    //     }
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     if (Axios.isCancel(error)) {
    //       console.log("AxiosCancel : cought cancle");
    //     } else {
    //       throw error;
    //     }
    //   });
    // return () => {
    //   // console.log("Karyawans : unmount");
    //   source.cancel();
    // };
  };
  const simpanPendidikan = async (params, data) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });
    await Axios.post(
      `/karyawan/data-pendidikan?nik=${params.nik}&id=${params.id}`,
      data
    ).then((d) => {
      const dataedit = d.data.data;
      console.log(dataedit);
      setLoading(false);
      dispatchKaryawan({
        type: ADD_PENDIDIKAN,
        payload: dataedit,
      });
      setResponse({
        status: "success",
        message: "Data Berhasil Disimpan",
        show: true,
        children: null,
      });
    });
  };

  const updatePendidikan = async (params, data) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });

    await Axios.put(
      `/karyawan/data-pendidikan?nik=${params.nik}&id=${params.id}`,
      data
    )
      .then(async (d) => {
        console.log(d);
        const dataedit = {
          ...d.data.data,
        };

        dispatchKaryawan({
          type: UPDATE_PENDIDIKAN,
          payload: dataedit,
          param: params.id,
        });
        setResponse({
          status: "success",
          message: "Data Berhasil Diupate",
          show: true,
          children: null,
        });
        setLoading(false);
      })
      .catch((error) => {
        errorres(error);
      });
  };

  const deletePendidikan = async (id) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });

    try {
      await Axios.delete(`/karyawan/data-pendidikan?id=${id}`);
      dispatchKaryawan({
        type: DELETE_PENDIDIKAN,
        param: id,
      });
      dispatchKaryawan({
        type: SELECTED,
        payload: null,
      });
      setLoading(false);
      setResponse({
        status: "success",
        message: "Data Berhasil DiHapus",
        show: true,
        children: null,
      });
    } catch (error) {
      setLoading(false);
      errorres(error);
    }
  };

  // const uploadIjazah = async (nik, file) => {
  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append("pdf", file);
  //   Axios.interceptors.request.use(function (config) {
  //     config.headers["Content-type"] = "multipart/form-data";
  //     return config;
  //   });

  //   try {
  //     await Axios.post(`/upload?nik=${nik}`, formData).then(
  //       (res) => {
  //         setLoading(false);
  //         dispatchKaryawan({
  //           type: UPLOAD,
  //           payload: res.data.url,
  //         });
  //       }
  //     );
  //   } catch (error) {
  //     errorres(error);
  //   }
  // };
  const uploadPdf = async (nik, file) => {
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "multipart/form-data";
      return config;
    });
    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      await Axios.post(`/upload?nik=${nik}`, formData).then((res) => {
        setLoading(false);
        dispatchKaryawan({
          type: UPLOAD,
          payload: res.data.url,
        });
      });
    } catch (error) {
      errorres(error);
    }
  };

  // data keluarga

  const getDataKeluarga = async (nik) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });
    try {
      await Axios.get(`/karyawan/data-keluarga?nik=${nik}`).then((d) => {
        setLoading(false);
        dispatchKaryawan({
          type: GET_RIWAYAT_KELUARGA,
          payload: d.data,
        });
      });
    } catch (error) {
      errorres(error);
    }
  };
  const simpanDataKeluarga = async (params, data) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });

    try {
      await Axios.post(
        `/karyawan/data-keluarga?nik=${params.nik}&id=${params.id}`,
        data
      ).then((d) => {
        setLoading(false);
        dispatchKaryawan({
          type: ADD_RIWAYAT_KELUARGA,
          payload: d.data.data,
        });
        setResponse({
          status: "success",
          message: "Data Berhasil Disimpan",
          show: true,
          children: null,
        });
      });
    } catch (error) {
      errorres(error);
    }
  };

  const updateDataKeluarga = async (params, data) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });
    try {
      await Axios.put(
        `/karyawan/data-keluarga?nik=${params.nik}&id=${params.id}`,
        data
      ).then((d) => {
        setLoading(false);
        dispatchKaryawan({
          type: UPDATE_RIWAYAT_KELUARGA,
          payload: d.data.data,
          param: params.id,
        });

        setResponse({
          status: "success",
          message: "Data Berhasil Disimpan",
          show: true,
          children: null,
        });
      });
    } catch (error) {
      errorres(error);
    }
  };

  const deleteDataKeluarga = async (params) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });

    try {
      await Axios.delete(
        `/karyawan/data-keluarga?id=${params.id}&noktp=${params.nik}`
      );
      dispatchKaryawan({
        type: DELETE_RIWAYAT_KELUARGA,
        param: params.id,
      });
      setLoading(false);
      setResponse({
        status: "success",
        message: "Data Berhasil DiHapus",
        show: true,
        children: null,
      });
    } catch (error) {
      errorres(error);
    }
  };

  // data pekerjaan

  const simpanDataPekerjaan = async (params, data) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "application/json";
      return config;
    });

    try {
      await Axios.post(
        `/karyawan/data-pekerjaan?nik=${params.nik}&id=${params.id}`,
        data
      ).then((d) => {
        setLoading(false);
        dispatchKaryawan({
          type: ADD_DATA_PEKERJAAN,
          payload: d.data.data,
        });
        setResponse({
          status: "success",
          message: "Data Berhasil Disimpan",
          show: true,
          children: null,
        });
      });
    } catch (error) {
      errorres(error);
    }
  };

  const updateDataPekerjaan = async (params, data) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "application/json";
      return config;
    });

    try {
      await Axios.put(
        `/karyawan/data-pekerjaan?nik=${params.nik}&id=${params.id}`,
        data
      ).then((d) => {
        setLoading(false);

        // const dres = {
        //   ...d.data.data,
        //   nik: d.data.data.id_karyawan.nik,
        //   nama: d.data.data.id_karyawan.nama,
        //   jenis_kelamin: d.data.data.id_karyawan.jenis_kelamin,
        //   kode_jabatan: d.data.data.jabatan.kode,
        //   kode_kantor: d.data.data.kantor_penempatan.kode,
        //   kode_jenis_karyawan: d.data.data.jenis_karyawan.kode,
        //   jenis_karyawan: d.data.data.jenis_karyawan.desc,
        //   jabatan: d.data.data.jabatan.desc,
        //   kantor_penempatan: ` ${d.data.data.kantor_penempatan.kode} || ${d.data.data.kantor_penempatan.desc} `,
        //   masa_kerja: `${d.data.data.masa_kerja.tahun} Thn || ${d.data.data.masa_kerja.bulan} Bln`,
        // };

        console.log(d.data.data);

        dispatchKaryawan({
          type: UPDATE_DATA_PEKERJAAN,
          payload: d.data.data,
          param: d.data.data._id,
        });
        setResponse({
          status: "success",
          message: "Data Berhasil DiUpdate",
          show: true,
          children: null,
        });
      });
    } catch (error) {
      console.log(error);
      errorres(error);
    }
  };

  const getDataPekerjaan = async (params) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });
    try {
      await Axios.get(
        `/karyawan/data-pekerjaan?nik=${params.nik}&id=${params.id}`
      ).then((d) => {
        const xd = d.data.map((e) => {
          return {
            ...e,
            // nik: e.id_karyawan.nik,
            // nama: e.id_karyawan.nama,
            // jenis_kelamin: e.id_karyawan.jenis_kelamin,
            // kode_jabatan: e.jabatan.kode,
            // kode_kantor: e.kantor_penempatan.kode,
            // kode_jenis_karyawan: e.jenis_karyawan.kode,
            // jenis_karyawan: e.jenis_karyawan.desc,
            // jabatan: e.jabatan.desc,
            // kantor_penempatan: ` ${e.kantor_penempatan.kode} || ${e.kantor_penempatan.desc} `,
            // masa_kerja: `${e.masa_kerja.tahun} Thn || ${e.masa_kerja.bulan} Bln`,
          };
        });

        setLoading(false);
        dispatchKaryawan({
          type: GET_DATA_PEKERJAAN,
          payload: xd,
          param: params,
        });
      });
    } catch (error) {
      errorres(error);
    }
  };

  const deleteDatapekerjaan = async (params) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });

    try {
      await Axios.delete(
        `/karyawan/data-pekerjaan?id=${params.id}&nik=${params.nik}`
      );
      dispatchKaryawan({
        type: DELETE_DATA_PEKERJAAN,
        param: params.id,
      });
      setLoading(false);
      setResponse({
        status: "success",
        message: "Data Berhasil DiHapus",
        show: true,
        children: null,
      });
    } catch (error) {
      errorres(error);
    }
  };

  // pelatihan

  const addPelatihan = async (params, data) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "application/json";
      return config;
    });

    try {
      await Axios.post(
        `/karyawan/data-pelatihan?nik=${params.nik}&id=${params.id}`,
        data
      ).then((d) => {
        setLoading(false);
        dispatchKaryawan({
          type: ADD_DATA_PELATIHAN,
          payload: d.data.data,
        });
        setResponse({
          status: "success",
          message: "Data Berhasil Disimpan",
          show: true,
          children: null,
        });
      });
    } catch (error) {
      errorres(error);
    }
  };

  const updatePelatihan = async (params, data) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });
    try {
      await Axios.put(
        `/karyawan/data-pelatihan?nik=${params.nik}&id=${params.id}`,
        data
      ).then((d) => {
        setLoading(false);
        dispatchKaryawan({
          type: UPDATE_DATA_PELATIHAN,
          payload: d.data.data,
          param: params.id,
        });

        setResponse({
          status: "success",
          message: "Data Berhasil Disimpan",
          show: true,
          children: null,
        });
      });
    } catch (error) {
      errorres(error);
    }
  };
  const getPelatihan = async (nik, data) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });
    try {
      await Axios.get(`/karyawan/data-pelatihan?nik=${nik}`).then((d) => {
        setLoading(false);
        dispatchKaryawan({
          type: GET_DATA_PELATIHAN,
          payload: d.data,
        });
      });
    } catch (error) {
      errorres(error);
    }
  };
  const deletePelatihan = async (params, data) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });

    try {
      await Axios.delete(`/karyawan/data-pelatihan?id=${params.id}`).then(
        () => {
          dispatchKaryawan({
            type: DELETE_DATA_PELATIHAN,
            param: params.id,
          });
          setLoading(false);
          setResponse({
            status: "success",
            message: "Data Berhasil DiHapus",
            show: true,
            children: null,
          });
        }
      );
    } catch (error) {
      errorres(error);
    }
  };
  //peringatan
  const addPeringatan = async (params, data) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "application/json";
      return config;
    });

    try {
      await Axios.post(
        `/karyawan/data-peringatan?nik=${params.nik}&id=${params.id}`,
        data
      ).then((d) => {
        setLoading(false);
        dispatchKaryawan({
          type: ADD_DATA_PERINGATAN,
          payload: d.data.data,
        });
        setResponse({
          status: "success",
          message: "Data Berhasil Disimpan",
          show: true,
          children: null,
        });
      });
    } catch (error) {
      errorres(error);
    }
  };
  const updatePeringatan = async (params, data) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });
    try {
      await Axios.put(
        `/karyawan/data-peringatan?nik=${params.nik}&id=${params.id}`,
        data
      ).then((d) => {
        setLoading(false);
        dispatchKaryawan({
          type: UPDATE_DATA_PERINGATAN,
          payload: d.data.data,
          param: params.id,
        });

        setResponse({
          status: "success",
          message: "Data Berhasil Disimpan",
          show: true,
          children: null,
        });
      });
    } catch (error) {
      errorres(error);
    }
  };
  const getPeringatan = async (nik, data) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });
    try {
      await Axios.get(`/karyawan/data-peringatan?nik=${nik}`).then((d) => {
        setLoading(false);
        dispatchKaryawan({
          type: GET_DATA_PERINGATAN,
          payload: d.data,
        });
      });
    } catch (error) {
      errorres(error);
    }
  };
  const deletePeringatan = async (params, data) => {
    setLoading(true);
    Axios.interceptors.request.use(function (config) {
      config.headers["Content-type"] = "  application/json";
      return config;
    });

    try {
      await Axios.delete(`/karyawan/data-peringatan?id=${params.id}`).then(
        () => {
          dispatchKaryawan({
            type: DELETE_DATA_PERINGATAN,
            param: params.id,
          });
          setLoading(false);
          setResponse({
            status: "success",
            message: "Data Berhasil DiHapus",
            show: true,
            children: null,
          });
        }
      );
    } catch (error) {
      errorres(error);
    }
  };
  return (
    <KaryawanContext.Provider
      value={{
        ...state,
        getKaryawans,
        importDataKaryawan,
        simpanDataKaryawan,
        deleteDataKaryawan,
        aktivasiDataKaryawan,
        changeAvatarKaryawan,
        getpendidikan,
        simpanPendidikan,
        updatePendidikan,
        deletePendidikan,
        simpanDataKeluarga,
        getDataKeluarga,
        updateDataKeluarga,
        deleteDataKeluarga,
        simpanDataPekerjaan,
        updateDataPekerjaan,
        getDataPekerjaan,
        deleteDatapekerjaan,
        dispatchKaryawan,
        addPelatihan,
        updatePelatihan,
        getPelatihan,
        deletePelatihan,
        addPeringatan,
        updatePeringatan,
        getPeringatan,
        deletePeringatan,
        // uploadIjazah,
        uploadPdf,
      }}
    >
      {children}
    </KaryawanContext.Provider>
  );
};

export default KaryawanContextProvider;
