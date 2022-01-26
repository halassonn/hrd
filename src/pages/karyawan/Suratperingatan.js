import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { GlobalContext, KaryawanContext } from "../../context";
import { MdDelete, MdEdit, MdFindInPage } from "react-icons/md";
import Listdata from "../../components/shared/Listdata";
import { useTheme } from "../../theme/useTheme";
import { Inputfile } from "../../components";
import { Button } from "../../components/shared";
import validate from "validate.js";

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

function Suratperingatan() {
  const [btn, setBtn] = useState("Simpan");
  const [peringatanData, setperingatanData] = useState([]);
  const { theme } = useTheme();
  const {
    dispatchKaryawan,
    getKaryawans,
    karyawan,
    riwayat_peringatan,
    deletePeringatan,
    addPeringatan,
    updatePeringatan,
    getPeringatan,
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
      jenis_peringatan: "",
      tingkat_peringatan: "",
      tgl_peringatan: "",
      file_peringatan: "",
    },
    touched: {},
    errors: {},
  });

  const txtnik = useRef();
  const txtjenisperingatan = useRef();
  const cmdtingkatperingatan = useRef();
  const txttglperingatan = useRef();
  const btnsubmit = useRef();
  const btnbatal = useRef();

  const HasError = (field, state) =>
    state.touched[field] && state.errors[field] ? true : false;

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
        message: `Benar Data Peringatan Karyawan ingin di ${
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
      jenis_peringatan: formState.values.jenis_peringatan,
      tingkat_peringatan: formState.values.tingkat_peringatan,
      tgl_peringatan: formState.values.tgl_peringatan,
      file_peringatan: file_upload,
    };

    if (databody._id) {
      updatePeringatan({ nik: databody.nik, id: databody._id }, databody);
    } else {
      addPeringatan({ nik: databody.nik, id: databody._id }, databody);
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
              deletePeringatan({ id: aa._id.toString() });
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

    txtjenisperingatan.current.focus();
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
        jenis_peringatan: "",
        tingkat_peringatan: "",
        tgl_peringatan: "",
        file_peringatan: "",
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
        txtjenisperingatan.current.focus();
      }
    }
    return () => {
      a = false;
    };
  }, [karyawan]);
  useEffect(() => {
    let a = true;
    if (a) {
      if (riwayat_peringatan) {
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

        setperingatanData((f) =>
          riwayat_peringatan.map((e) => {
            return {
              ...e,
              file_peringatan: (
                <a href={e.file_peringatan} autoCapitalize="true">
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
  }, [riwayat_peringatan]);

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
                  getPeringatan(formState.values.nik);
                }
              }}
            />
            <MdFindInPage
              style={{ fontSize: "28px", cursor: "pointer" }}
              onClick={() => {
                getKaryawans(formState.values.nik);
                getPeringatan(formState.values.nik);
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

      <label id="title_field">Jenis Peringatan :</label>
      <input
        name="jenis_peringatan"
        value={formState.values.jenis_peringatan || ""}
        onChange={onchange}
        ref={txtjenisperingatan}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            cmdtingkatperingatan.current.focus();
          }
        }}
      />
      <label id="error">
        {HasError("jenis_peringatan", formState)
          ? formState.errors.jenis_peringatan
          : ""}
      </label>
      <label id="title_field">Tingkat Peringatan :</label>
      <select
        onChange={onchange}
        ref={cmdtingkatperingatan}
        value={formState.values.tingkat_peringatan || ""}
        name="tingkat_peringatan"
        style={{ minWidth: "175px" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txttglperingatan.current.focus();
          }
        }}
      >
        <option defaultValue="" disabled></option>
        <option value="I">Peringatan I</option>
        <option value="II">Peringatan II</option>
        <option value="III">Peringatan III</option>
      </select>
      <label id="error">
        {HasError("tingkat_peringatan", formState)
          ? formState.errors.tingkat_peringatan
          : ""}
      </label>

      <label id="title_field">Tanggal Surat Peringatan :</label>
      <input
        name="tgl_peringatan"
        value={formState.values.tgl_peringatan || ""}
        onChange={onchange}
        type="date"
        ref={txttglperingatan}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            btnsubmit.current.focus();
          }
        }}
      />
      <label id="error">
        {HasError("tgl_peringatan", formState)
          ? formState.errors.tgl_peringatan
          : ""}
      </label>

      <Inputfile
        type="file"
        name="file_peringatan"
        // value={formState.values.ijazahfile }
        onChange={(e) => {
          onchangeFile(e);
        }}
      />
      <label>
        Current File :{" "}
        <a href={formState.values.file_peringatan || ""}>
          {formState.values.file_peringatan || ""}
        </a>
      </label>

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
      <p />
      <div>
        <Tabledata
          theme={theme}
          rowperpage={5}
          rowsPerPageOptions={[5, 10, 15, "all"]}
          rowfilterby=""
          search_data=""
          cols={colPeringatan}
          datarows={peringatanData || []}
        />
      </div>
    </Div>
  );
}

export default Suratperingatan;
const colPeringatan = [
  { id: "jenis_peringatan", title: "Jenis Surat Peringatan" },
  { id: "tingkat_peringatan", title: "Tingkat Surat Peringatan" },
  { id: "tgl_peringatan", title: "Tanggal Surat Peringatan" },
  { id: "file_peringatan", title: "File Surat Peringatan" },
  { id: "action", title: "" },
];

const schema = {
  nik: {
    presence: { allowEmpty: false, message: "is required" },
  },
  jenis_peringatan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  tgl_peringatan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  tingkat_peringatan: {
    presence: { allowEmpty: false, message: "is required" },
  },
};
