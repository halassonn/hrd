import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Button } from "../../components/shared";
import { useTheme } from "../../theme/useTheme";
import Listdata from "../../components/shared/Listdata";
import { MdDelete, MdEdit } from "react-icons/md";
import validate from "validate.js";
import { GlobalContext, KaryawanContext } from "../../context";
import { MdFindInPage } from "react-icons/md";
import { Inputfile } from "../../components";

const schemakel = {
  hubungan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  no_kartu_keluarga: {
    format: {
      pattern: "[0-9]+",
      message: "is required and can only contain 0-9",
    },
  },
  no_KTP: {
    format: {
      pattern: "[0-9]+",
      message: "is required and can only contain 0-9",
    },
  },
  nama: {
    presence: { allowEmpty: false, message: "is required" },
  },
  jenis_kelamin: {
    presence: { allowEmpty: false, message: "is required" },
  },
  pendidikan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  tanggal_lahir: {
    presence: { allowEmpty: false, message: "is required" },
  },
  tempat_lahir: {
    presence: { allowEmpty: false, message: "is required" },
  },
  pekerjaan: {
    presence: { allowEmpty: false, message: "is required" },
  },
};

const Tabledata = styled(Listdata)`
  width: calc(100% - 0px);
  height: ${({ height }) => (height ? height : "auto")};
  box-shadow: 0.2px 4px 4px 0.2px rgba(0, 0, 0, 0.5);
  & table {
    & thead {
      color: ${({ theme }) => theme.colors.primary.text};
    }
  }
`;

const colKeluarga = [
  // { id: "id", title: "ID" },
  { id: "no_kartu_keluarga", title: "No KK" },
  { id: "no_KTP", title: "No KTP" },
  { id: "nama", title: "NAMA" },
  { id: "tempat_lahir", title: "TEMPAT LAHIR" },
  { id: "tanggal_lahir", title: "TANGGAL LAHIR" },
  { id: "pendidikan", title: "PENDIDIKAN" },
  { id: "pekerjaan", title: "PEKERJAAN" },
  { id: "hubungan", title: "HUBUNGAN" },
  { id: "file_kk", title: "Kartu Keluarga" },
  { id: "action", title: "" },
];

const Div = styled.div`
  display: flex;
  flex-direction: column;
  & input,
  select,
  textarea {
    margin: 9px 0px;
  }

  & #error {
    top: -10px;
    color: red;
    position: relative;
    font-size: 10px;
  }
  & #title_field {
    position: relative;
    top: 10px;
    font-weight: 800;
  }
`;

function Keluarga() {
  const [temp, setTemp] = useState(false);
  const [keluargaData, setKeluargaData] = useState([]);
  const [keluargaDataTemp, setKeluargaDataTemp] = useState([]);
  const {
    getKaryawans,
    riwayat_keluarga,
    getDataKeluarga,
    deleteDataKeluarga,
    karyawan,
    dispatchKaryawan,
    simpanDataKeluarga,
    temp_riwayat_keluarga,
    updateDataKeluarga,
    selected,
    selected_keluarga,
  } = useContext(KaryawanContext);
  const { setResponse, closeResponse, response, uploadPdf, file_upload } =
    useContext(GlobalContext);
  const [formState, setFormState] = useState({
    isValid: false,
    carinik: "",
    values: {
      id_karyawan: "",
      no_kartu_keluarga: "",
      no_KTP: "",
      nama: "",
      tanggal_lahir: "",
      tempat_lahir: "",
      jenis_kelamin: "",
      pendidikan: "",
      hubungan: "",
      pekerjaan: "",
      file_kk: "",
    },
    touched: {},
    errors: {},
  });
  const [btn, setBtn] = useState("Simpan");
  const [btnTemp, setBtnTemp] = useState("Tambah");
  const { theme } = useTheme();
  const txtno_kartu_keluarga = useRef();
  const txtnik = useRef();
  const txtnama = useRef();
  const txtpendidikan = useRef();
  const txtpekerjaan = useRef();
  const txthubungan = useRef();
  const txtno_KTP = useRef();
  const txt_tempatlahir = useRef();
  const txt_tgllahir = useRef();
  const txtjeniskelamin = useRef();
  const btnBatal = useRef();
  const btnSubmit = useRef();

  const HasError = (field, state) =>
    state.touched[field] && state.errors[field] ? true : false;

  const onHapus = (aa) => {
    // if (keluargaDataTemp.length > 0) {
    //   dispatchKaryawan({
    //     type: "DELETE_TEMP_RIWAYAT_KELUARGA",
    //     param: aa.no_KTP,
    //   });
    // } else if (keluargaData.length > 0) {
    // }

    setResponse({
      show: true,
      message: `Benar Data  ingin di hapus?`,
      action: null,
      children: (
        <div>
          <Button onClick={closeResponse}>Tidak</Button>
          <Button
            onClick={() => {
              // console.log(aa)
              deleteDataKeluarga({ id: aa._id, nik: aa.id_karyawan.nik });
            }}
          >
            Ya
          </Button>
        </div>
      ),
    });
  };

  const formatDatetoInput = (date, format = "yyyy-dd-mm") => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    // d = d.split(" ")[0];

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (format === "dd-mm-yyyy" || format === "dd-MM-yyyy") {
      return [day, month, year].join("/");
    } else {
      console.log([year, month, day].join("-"));
      return [year, month, day].join("-");
    }
  };
  const onEdit = (aa) => {
    console.log(formatDatetoInput(aa.tanggal_lahir));
    setFormState((f) => ({
      ...f,
      values: {
        ...aa,
        tanggal_lahir: formatDatetoInput(aa.tanggal_lahir),
      },
      touched: {
        nama: true,
        hubungan: true,
        tanggal_lahir: true,
        tempat_lahir: true,
        no_kartu_keluarga: true,
        no_KTP: true,
        pekerjaan: true,
        pendidikan: true,
        jenis_kelamin: true,
      },
    }));
    txtnama.current.focus();
    setBtnTemp("Edit");
    dispatchKaryawan({
      type: "SELECTED_KELUARGA",
      payload: aa,
    });
  };

  const onClearform = () => {
    setFormState((formState) => ({
      ...formState,
      isValid: false,
      values: {
        id_karyawan: "",
        no_kartu_keluarga: "",
        no_KTP: "",
        nama: "",
        tanggal_lahir: "",
        tempat_lahir: "",
        jenis_kelamin: "",
        pendidikan: "",
        hubungan: "",
        pekerjaan: "",
        file_kk: "",
      },
      touched: {},
      errors: {},
    }));
  };

  const onBatal = () => {
    setFormState((formState) => ({
      ...formState,
      values: {
        id: "",
        no_KTP: "",
        no_kartu_keluarga: "",
        nama: "",
        tanggal_lahir: "",
        tempat_lahir: "",
        jenis_kelamin: "",
        pendidikan: "",
        hubungan: "",
        pekerjaan: "",
      },
      touched: {},
      errors: {},
    }));
    setBtnTemp("Tambah");
  };

  const tableAction = (e) => {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
          fontSize: "16px",
        }}
      >
        <MdEdit
          style={{ cursor: "pointer", marginRight: "5px" }}
          onClick={() => {
            onEdit(e);
          }}
        />
        <MdDelete
          style={{ cursor: "pointer" }}
          onClick={() => {
            onHapus(e);
          }}
        />
      </div>
    );
  };

  const validdata = () => {
    try {
      const errors = validate(formState.values, schemakel);
      setFormState((formState) => ({
        ...formState,
        isValid: errors ? false : true,
        touched: {
          nama: true,
          hubungan: true,
          tanggal_lahir: true,
          tempat_lahir: true,
          no_kartu_keluarga: true,
          no_KTP: true,
          pekerjaan: true,
          pendidikan: true,
          jenis_kelamin: true,
        },
        errors: errors || {},
      }));
      return errors ? false : true;
    } catch (error) {
      return false;
    }
  };

  const onAddtemp = () => {
    if (validdata()) {
      const checkdata = temp_riwayat_keluarga.filter(
        (item) => item.no_KTP.toString() === formState.values.no_KTP.toString()
      );

      if (checkdata.length > 0 && btnTemp === "Tambah") {
        setResponse({
          status: "error",
          message: `No KTP ${formState.values.no_KTP} sudah terdaftar`,
          show: true,
          children: null,
        });

        // console.log(formState);
      } else {
        setTemp(true);
        if (btnTemp === "Edit") {
          dispatchKaryawan({
            type: "UPDATE_TEMP_RIWAYAT_KELUARGA",
            payload: {
              ...formState.values,
              id_karyawan: karyawan._id,
              action: "",
            },
          });
          setFormState((formState) => ({
            ...formState,
            values: {
              ...formState.values,
              id: "",
              no_KTP: "",
              nama: "",
              tanggal_lahir: "",
              tempat_lahir: "",
              jenis_kelamin: "",
              pendidikan: "",
              hubungan: "",
              pekerjaan: "",
            },
            touched: { no_kartu_keluarga: true },
            errors: {},
          }));
          setBtnTemp("Tambah");
        } else {
          dispatchKaryawan({
            type: "SET_TEMP_RIWAYAT_KELUARGA",
            payload: {
              ...formState.values,
              id_karyawan: karyawan._id,
              action: "",
            },
          });
          setFormState((formState) => ({
            ...formState,
            values: {
              ...formState.values,
              id: "",
              no_KTP: "",
              nama: "",
              tanggal_lahir: "",
              tempat_lahir: "",
              jenis_kelamin: "",
              pendidikan: "",
              hubungan: "",
              pekerjaan: "",
            },
            touched: { no_kartu_keluarga: true },
            errors: {},
          }));
        }
      }
    }
  };

  const onSaveToDB = () => {
    closeResponse();
    const databody = {
      ...formState.values,
      file_kk: file_upload,
    };

    if (!selected_keluarga) {
      simpanDataKeluarga({ nik: formState.carinik, id: null }, [
        { ...databody, id_karyawan: karyawan._id },
      ]);
    } else {
      const data = {
        ...databody,
        nik: formState.carinik,
      };

      updateDataKeluarga({ nik: formState.carinik, id: data._id }, data);
    }
  };

  const onSubmit = () => {
    setResponse({
      show: true,
      message: `Benar Data Keluarga Karyawan ingin di ${
        formState.values._id ? `Update` : `Simpan`
      }?`,
      action: null,
      children: (
        <div>
          <Button onClick={closeResponse}>Tidak</Button>
          <Button onClick={onSaveToDB}>Ya</Button>
        </div>
      ),
    });
  };

  const onchange = (e) => {
    const field = e.target.name;
    const val = e.target.value;
    e.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [field]: val,
      },
      touched: {
        ...formState.touched,
        [e.target.name]: true,
      },
    }));
  };
  const onchangeFile = (e) => {
    const fileList = e.target.files;
    const field = e.target.name;
    uploadPdf(formState.values.nik, fileList[0]);
  };

  const onchangecari = (e) => {
    const field = e.target.name;
    const val = e.target.value;
    e.persist();
    setFormState((formState) => ({
      ...formState,
      [field]: val,
    }));
  };

  useEffect(() => {
    let a = true;
    if (a) {
      const validateform = () => {
        const errors = validate(formState.values, schemakel);
        setFormState((formState) => ({
          ...formState,
          isValid: errors ? false : true,
          errors: errors || {},
        }));
      };
      validateform();
    }
    return () => (a = false);
    // eslint-disable-next-line
  }, [formState.values]);

  useEffect(() => {
    let a = true;
    if (a) {
      if (riwayat_keluarga)
        setKeluargaData((f) =>
          riwayat_keluarga.map((e) => {
            return {
              ...e,
              file_kk: (
                <a href={e.file_kk} autoCapitalize="true">
                  Download
                </a>
              ),
              action: tableAction(e),
            };
          })
        );
    }

    return () => {
      a = false;
    };
  }, [riwayat_keluarga]);

  useEffect(() => {
    let a = true;
    if (a) {
      setFormState((formState) => ({
        ...formState,
        isValid: false,
        carinik: "",
        values: {
          id_karyawan: "",
          no_kartu_keluarga: "",
          no_KTP: "",
          nama: "",
          tanggal_lahir: "",
          tempat_lahir: "",
          jenis_kelamin: "",
          pendidikan: "",
          hubungan: "",
          pekerjaan: "",
        },
        touched: {},
        errors: {},
      }));
      // getDataKeluarga(null);

      dispatchKaryawan({ type: "CLEAR_KARYAWAN" });
      dispatchKaryawan({
        type: "GET_RIWAYAT_KELUARGA",
        payload: [],
      });
    }

    return () => {
      a = false;
    };
  }, []);

  useEffect(() => {
    let a = true;
    if (a) {
      if (response.status === "success") {
        onClearform();
      }
    }

    return () => {
      a = false;
    };
  }, [response.status]);

  return (
    <Div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          columnGap: "5px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Nik</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              ref={txtnik}
              value={formState.carinik || ""}
              onChange={onchangecari}
              name="carinik"
              placeholder="Cari Nik"
              minLength={7}
              maxLength={7}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getKaryawans(formState.carinik);
                  getDataKeluarga(formState.carinik);
                  dispatchKaryawan({
                    type: "SELECTED_KELUARGA",
                    payload: null,
                  });
                  txtno_kartu_keluarga.current.focus();
                }
              }}
            />
            <MdFindInPage
              style={{ fontSize: "28px", cursor: "pointer" }}
              onClick={() => {
                getKaryawans(formState.carinik);
                getDataKeluarga(formState.carinik);
                dispatchKaryawan({
                  type: "SELECTED_KELUARGA",
                  payload: null,
                });
              }}
            />
          </div>
        </div>
      </div>

      <label>Nama Karyawan :</label>
      <input value={karyawan ? karyawan.nama : "" || ""} disabled />

      <label>No KK :</label>
      <input
        ref={txtno_kartu_keluarga}
        name="no_kartu_keluarga"
        value={formState.values.no_kartu_keluarga || ""}
        onChange={onchange}
        maxLength="16"
        minLength="16"
        disabled={temp === true ? true : false}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtno_KTP.current.focus();
          }
        }}
      />
      <label id="error">
        {HasError("no_kartu_keluarga", formState)
          ? formState.errors.no_kartu_keluarga
          : ""}
      </label>
      <label>No KTP :</label>
      <input
        ref={txtno_KTP}
        name="no_KTP"
        value={formState.values.no_KTP || ""}
        onChange={onchange}
        maxLength="16"
        minLength="16"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtnama.current.focus();
          }
        }}
      />
      <label id="error">
        {HasError("no_KTP", formState) ? formState.errors.no_KTP : ""}
      </label>

      <label>Nama :</label>
      <input
        ref={txtnama}
        name="nama"
        value={formState.values.nama || ""}
        onChange={onchange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtjeniskelamin.current.focus();
          }
        }}
      />
      <label id="error">
        {HasError("nama", formState) ? formState.errors.nama : ""}
      </label>

      <label id="title_field">Jenis Kelamin : </label>
      <select
        ref={txtjeniskelamin}
        value={formState.values.jenis_kelamin || ""}
        onChange={onchange}
        name="jenis_kelamin"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txt_tempatlahir.current.focus();
          }
        }}
      >
        <option defaultValue=""></option>
        <option value="L">Laki-Laki</option>
        <option value="P">Perempuan</option>
      </select>
      {HasError("jenis_kelamin", formState) && (
        <label id="error">{formState.errors.jenis_kelamin}</label>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          columnGap: "10px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label id="title_field">Tempat Lahir : </label>
          <input
            ref={txt_tempatlahir}
            value={formState.values.tempat_lahir || ""}
            onChange={onchange}
            name="tempat_lahir"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                txt_tgllahir.current.focus();
              }
            }}
          />
          {HasError("tempat_lahir", formState) && (
            <label id="error">{formState.errors.tempat_lahir}</label>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label id="title_field">Tanggal Lahir : </label>
          <input
            type="date"
            ref={txt_tgllahir}
            value={formState.values.tanggal_lahir || ""}
            onChange={onchange}
            name="tanggal_lahir"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                txtpendidikan.current.focus();
              }
            }}
          />
          {HasError("tanggal_lahir", formState) && (
            <label id="error">{formState.errors.tanggal_lahir}</label>
          )}
        </div>
      </div>

      <label>Pendidikan :</label>
      <select
        onChange={onchange}
        ref={txtpendidikan}
        value={formState.values.pendidikan || ""}
        name="pendidikan"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtpekerjaan.current.focus();
          }
        }}
      >
        <option defaultValue="" disabled></option>
        <option value="SD">SD</option>
        <option value="SMP">SMP</option>
        <option value="SMA">SMA</option>
        <option value="D3">D3</option>
        <option value="S1">S1</option>
        <option value="S2">S2</option>
        <option value="S3">S3</option>
      </select>
      <label id="error">
        {" "}
        {HasError("pendidikan", formState) ? formState.errors.pendidikan : ""}
      </label>

      <label>Pekerjaan :</label>
      <input
        onChange={onchange}
        ref={txtpekerjaan}
        value={formState.values.pekerjaan || ""}
        name="pekerjaan"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txthubungan.current.focus();
          }
        }}
      />

      <label id="error">
        {" "}
        {HasError("pekerjaan", formState) ? formState.errors.pekerjaan : ""}
      </label>

      <label>Hubungan :</label>
      <select
        onChange={onchange}
        ref={txthubungan}
        value={formState.values.hubungan || ""}
        name="hubungan"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            btnSubmit.current.focus();
          }
        }}
      >
        <option defaultValue=""></option>
        <option value="Ayah">Ayah</option>
        <option value="Ibu">Ibu</option>
        <option value="Ayah Mertua">Ayah Mertua</option>
        <option value="Ibu Mertua">Ibu Mertua</option>
        <option value="Suami">Suami</option>
        <option value="Istri">Istri</option>
        <option value="Anak">Anak</option>
      </select>
      <label id="error">
        {" "}
        {HasError("hubungan", formState) ? formState.errors.hubungan : ""}
      </label>

      <Inputfile
        type="file"
        name="file_kk"
        // value={formState.values.ijazahfile }
        onChange={(e) => {
          onchangeFile(e);
        }}
      />
      <label>
        Current File :{" "}
        <a href={formState.values.file_kk || ""}>
          {formState.values.file_kk || ""}
        </a>
      </label>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px 0px",
        }}
      >
        <Button ref={btnBatal} onClick={onBatal}>
          Batal
        </Button>
        {/* <Button onClick={onAddtemp}>{btnTemp}</Button> */}
        <Button
          ref={btnSubmit}
          onClick={onSubmit}
          disabled={formState.isValid ? false : true}
        >
          {btn}
        </Button>
      </div>
      <div>
        <Tabledata
          theme={theme}
          rowperpage={5}
          rowsPerPageOptions={[5, 10, 15, "all"]}
          rowfilterby=""
          search_data=""
          cols={colKeluarga}
          datarows={temp === true ? keluargaDataTemp : keluargaData}
          // datarows={riwayat_keluarga}

          // enableAction={true}
        />
      </div>
    </Div>
  );
}

export default Keluarga;
