import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  GlobalContext,
  KaryawanContext,
  ParameterContext,
} from "../../context";
import { MdDelete, MdEdit, MdFindInPage } from "react-icons/md";
import Listdata from "../../components/shared/Listdata";
import { useTheme } from "../../theme/useTheme";
import { Inputfile } from "../../components";
import { Button } from "../../components/shared";
import validate from "validate.js";
import { cekTgl } from "../../utils";

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
  & #ket {
    /* top: -20px; */
    /* color: red; */
    font-weight: 200;
    font-style: italic;
    position: relative;
    font-size: 10px;
  }
  & #title_field {
    position: relative;
    top: 10px;
    font-weight: 800;
  }
`;
const colpelatihan = [
  { id: "nik", title: "NIK" },
  { id: "nama", title: "Nama" },
  { id: "nama_pelatihan", title: "nama pelatihan" },
  { id: "tempat_pelatihan", title: "tempat Pelatihan" },
  { id: "nama_tentor", title: "Tentor" },
  { id: "nama_penyelenggara", title: "Penyelenggara" },
  { id: "tgl_pelatihan", title: "TAnggal Pelatihan" },
  { id: "file_sertifikat", title: "File Setifikat" },
  { id: "action", title: "" },
];

function Pelatihan() {
  const [btn, setBtn] = useState("Simpan");
  const [pelatihanData, setpelatihanData] = useState([]);
  const { theme } = useTheme();
  const {
    getKaryawans,
    karyawan,
    getPelatihan,
    dispatchKaryawan,
    riwayat_pelatihan,
    deletePelatihan,
    addPelatihan,
    updatePelatihan,
  } = useContext(KaryawanContext);
  const {
    setResponse,
    closeResponse,
    response,
    file_upload,
    dispatch,
    uploadPdf,
  } = useContext(GlobalContext);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      _id: null,
      id_karyawan: "",
      nik: "",
      nama: "",
      jenis_karyawan: "",
      jabatan: "",
      masa_kerja: null,
      nama_pelatihan: "",
      tempat_pelatihan: "",
      nama_tentor: "",
      nama_penyelenggara: "",
      tgl_pelatihan: "",
      file_sertifikat: "",
    },
    touched: {},
    errors: {},
  });
  const txtnik = useRef();
  const txtnamapelatihan = useRef();
  const txttempatpelatihan = useRef();
  const txtnamatentor = useRef();
  const txtpenyelenggara = useRef();
  const txttglpelatihan = useRef();
  const btnsubmit = useRef();
  const btnbatal = useRef();

  const HasError = (field, state) =>
    state.touched[field] && state.errors[field] ? true : false;

  const onchange = (e) => {
    const field = e.target.name;
    const val = e.target.value;

    if (field === "tgl_pelatihan") {
      if(cekTgl(val)){
        console.log("error")
      }
    }
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

  const validdata = () => {
    try {
      const errors = validate(formState.values, schema);
      setFormState((formState) => ({
        ...formState,
        isValid: errors ? false : true,
        touched: {
          nama_pelatihan: true,
          tempat_pelatihan: true,
          nama_tentor: true,
          nama_penyelenggara: true,
          tgl_pelatihan: true,
        },
        errors: errors || {},
      }));
      return errors ? false : true;
    } catch (error) {
      return false;
    }
  };

  const onSubmit = () => {
    if (validdata())
      setResponse({
        show: true,
        message: `Benar Data Pelatihan Karyawan ingin di ${
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

  const onSaveToDB = () => {
    closeResponse();
    const databody = {
      _id: formState.values._id,
      nama: formState.values.nama,
      nik: formState.values.nik,
      nama_pelatihan: formState.values.nama_pelatihan,
      tempat_pelatihan: formState.values.tempat_pelatihan,
      nama_tentor: formState.values.nama_tentor,
      nama_penyelenggara: formState.values.nama_penyelenggara,
      tgl_pelatihan: formState.values.tgl_pelatihan,
      file_sertifikat: file_upload,
    };

    if (databody._id) {
      updatePelatihan({ nik: databody.nik, id: databody._id }, databody);
    } else {
      addPelatihan({ nik: databody.nik, id: databody._id }, databody);
    }
  };
  const onHapus = (aa) => {
    setResponse({
      show: true,
      message: `Benar Data  ingin di hapus?`,
      action: null,
      children: (
        <div>
          <Button onClick={closeResponse}>Tidak</Button>
          <Button
            onClick={() => {
              deletePelatihan({ id: aa._id.toString() });
            }}
          >
            Ya
          </Button>
        </div>
      ),
    });
  };
  const onEdit = (aa) => {
    setFormState((f) => ({
      ...f,
      values: {
        ...f.values,
        ...aa,
      },
    }));

    dispatch({
      type: "UPLOAD",
      payload: aa.ijazahfile,
    });

    txtnamapelatihan.current.focus();
  };

  const onBatal = () => {
    dispatchKaryawan({ type: "CLEAR_KARYAWAN" });
    dispatchKaryawan({
      type: "GET_PELATIHAN",
      payload: [],
    });
    setBtn("Simpan");
    setFormState((formState) => ({
      ...formState,
      values: {
        _id: null,
        id_karyawan: "",
        nik: "",
        nama: "",
        jenis_karyawan: "",
        jabatan: "",
        masa_kerja: null,
        nama_pelatihan: "",
        tempat_pelatihan: "",
        nama_tentor: "",
        nama_penyelenggara: "",
        tgl_pelatihan: "",
        file_sertifikat: "",
      },
      touched: {},
      errors: {},
    }));
  };

  useEffect(() => {
    let a = true;
    if (a) {
      dispatchKaryawan({ type: "CLEAR_KARYAWAN" });
      dispatchKaryawan({
        type: "GET_DATA_PELATIHAN",
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
      const validateform = () => {
        const errors = validate(formState.values, schema);
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
      if (karyawan) {
        const pekerjaan = karyawan
          ? karyawan.data_pekerjaan.filter((e) => e.jabatan_aktif === "true")[0]
          : null;
        setFormState((e) => ({
          ...e,
          values: {
            ...e.values,
            jabatan: pekerjaan.jabatan.desc,
            nama: karyawan.nama,
            jenis_karyawan: pekerjaan.jenis_karyawan.desc,
            masa_kerja: karyawan.masa_kerja,
          },
        }));
        txtnamapelatihan.current.focus();
      }
    }
    return () => {
      a = false;
    };
  }, [karyawan]);

  useEffect(() => {
    let a = true;
    if (a) {
      if (riwayat_pelatihan) {
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

        setpelatihanData((f) =>
          riwayat_pelatihan.map((e) => {
            return {
              ...e,
              file_sertifikat: (
                <a href={e.file_sertifikat} autoCapitalize="true">
                  Download
                </a>
              ),
              action: tableAction(e),
            };
          })
        );
      }
    }

    return () => {
      a = false;
    };
  }, [riwayat_pelatihan]);
  useEffect(() => {
    let a = true;
    if (a) {
      if (response.status === "success") {
        setBtn("Simpan");
        onBatal();
        dispatchKaryawan({ type: "CLEAR_KARYAWAN" });
      }
    }

    return () => {
      a = false;
    };
  }, [response.status, dispatchKaryawan]);

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
              value={formState.values.nik || ""}
              onChange={onchange}
              name="nik"
              placeholder="Cari Nik"
              minLength={7}
              maxLength={7}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getKaryawans(formState.values.nik);
                  getPelatihan(formState.values.nik);
                }
              }}
              ref={txtnik}
            />
            <MdFindInPage
              style={{ fontSize: "28px", cursor: "pointer" }}
              onClick={() => {
                getKaryawans(formState.values.nik);
                getPelatihan();
              }}
            />
          </div>
        </div>
      </div>

      <label id="title_field">
        Nama :{formState.values.nama ? formState.values.nama : ""}
      </label>

      <label id="title_field">
        Jenis Karyawan :{" "}
        {formState.values.jenis_karyawan ? formState.values.jenis_karyawan : ""}
      </label>
      <label id="title_field">
        Jabatan : {formState.values.jabatan ? formState.values.jabatan : ""}
      </label>
      <label id="title_field">
        Masa Kerja :{" "}
        {formState.values.masa_kerja
          ? `${formState.values.masa_kerja.tahun} Tahun ${formState.values.masa_kerja.bulan} Bulan`
          : ""}
      </label>
      <p />

      <label id="title_field">Nama Pelatihan :</label>
      <input
        name="nama_pelatihan"
        value={formState.values.nama_pelatihan || ""}
        onChange={onchange}
        ref={txtnamapelatihan}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txttempatpelatihan.current.focus();
          }
        }}
      />
      <label id="error">
        {HasError("nama_pelatihan", formState)
          ? formState.errors.nama_pelatihan
          : ""}
      </label>

      <label id="title_field">Tempat Pelatihan :</label>
      <input
        name="tempat_pelatihan"
        value={formState.values.tempat_pelatihan || ""}
        onChange={onchange}
        ref={txttempatpelatihan}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtnamatentor.current.focus();
          }
        }}
      />
      <label id="error">
        {HasError("tempat_pelatihan", formState)
          ? formState.errors.tempat_pelatihan
          : ""}
      </label>

      <label id="title_field">Nama Tentor:</label>
      <input
        name="nama_tentor"
        value={formState.values.nama_tentor || ""}
        onChange={onchange}
        ref={txtnamatentor}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtpenyelenggara.current.focus();
          }
        }}
      />
      <label id="error">
        {HasError("nama_tentor", formState) ? formState.errors.nama_tentor : ""}
      </label>

      <label id="title_field">Nama Penyelenggara :</label>
      <input
        name="nama_penyelenggara"
        value={formState.values.nama_penyelenggara || ""}
        onChange={onchange}
        ref={txtpenyelenggara}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txttglpelatihan.current.focus();
          }
        }}
      />
      <label id="error">
        {HasError("nama_penyelenggara", formState)
          ? formState.errors.nama_penyelenggara
          : ""}
      </label>

      <label id="title_field">Tanggal Pelatihan :</label>
      <input
        name="tgl_pelatihan"
        value={formState.values.tgl_pelatihan || ""}
        onChange={onchange}
        type="date"
        ref={txttglpelatihan}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            btnsubmit.current.focus();
          }
        }}
      />
      <label id="error">
        {HasError("tgl_pelatihan", formState)
          ? formState.errors.tgl_pelatihan
          : ""}
      </label>

      <label style={{ marginBottom: "10px" }} id="title_field">
        File Sertifikat
      </label>

      <Inputfile
        type="file"
        name="file_sertifikat"
        // value={formState.values.ijazahfile }
        onChange={(e) => {
          onchangeFile(e);
        }}
      />
      <label>
        Current File :{" "}
        <a href={formState.values.file_sertifikat || ""}>
          {formState.values.file_sertifikat || ""}
        </a>
      </label>
      <p />
      <p />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px 0px",
        }}
      >
        <Button ref={btnbatal} onClick={onBatal}>
          Batal
        </Button>
        <Button
          ref={btnsubmit}
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
          cols={colpelatihan}
          datarows={pelatihanData || []}
        />
      </div>
    </Div>
  );
}

export default Pelatihan;

const schema = {
  nik: {
    presence: { allowEmpty: false, message: "is required" },
  },
  nama_pelatihan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  tempat_pelatihan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  nama_tentor: {
    presence: { allowEmpty: false, message: "is required" },
  },
  nama_penyelenggara: {
    presence: { allowEmpty: false, message: "is required" },
  },
  tgl_pelatihan: {
    presence: { allowEmpty: false, message: "is required" },
  },
};
