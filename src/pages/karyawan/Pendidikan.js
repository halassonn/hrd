import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Button } from "../../components/shared";
import { useTheme } from "../../theme/useTheme";
import Listdata from "../../components/shared/Listdata";
import { MdDelete, MdEdit, MdFindInPage } from "react-icons/md";
import validate from "validate.js";
import { GlobalContext, KaryawanContext } from "../../context";
import { Inputfile } from "../../components";

const schema = {
  nik: {
    format: {
      pattern: "[0-9]+",
      message: "is required and can only contain 0-9",
    },
  },
  jurusan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  nama_sekolah: {
    presence: { allowEmpty: false, message: "is required" },
  },
  pendidikan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  no_ijazah: {
    presence: { allowEmpty: false, message: "is required" },
  },
  kota_kab: {
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

const colpendidikan = [
  { id: "nik", title: "NIK" },
  { id: "nama", title: "Nama" },
  { id: "pendidikan", title: "Pendidikan" },
  { id: "jurusan", title: "JURUSAN" },
  { id: "no_ijazah", title: "No Ijazah" },
  { id: "nama_sekolah", title: "Sekolah" },
  { id: "pendidikan_terakhir", title: "Pendidikan_terakhir" },
  { id: "ijazahfile", title: "file" },
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

function Pendidikan() {
  const [pendidikanData, setpendidikanData] = useState([]);
  const {
    getKaryawans,
    karyawan,
    simpanPendidikan,
    updatePendidikan,
    getpendidikan,
    riwayat_pendidikan,
    dispatchKaryawan,
    selected,
    deletePendidikan,
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
      nik: "",
      nama: "",
      no_ijazah: "",
      pendidikan: "",
      nama_sekolah: "",
      jurusan: "",
      kota_kab: "",
      pendidikan_terakhir: false,
      ijazahfile: "",
    },
    touched: {},
    errors: {},
  });
  const [btn, setBtn] = useState("Simpan");
  const { theme } = useTheme();

  const txtnik = useRef();
  const txtnoijazah = useRef();
  const txtpendidikan = useRef();
  const txtjurusan = useRef();
  const txtnamasekolah = useRef();
  const txtkotakab = useRef();
  const btnBatal = useRef();
  const btnSubmit = useRef();


  const HasError = (field, state) =>
    state.touched[field] && state.errors[field] ? true : false;

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
              deletePendidikan(aa._id.toString());
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
        pendidikan_terakhir: aa.pendidikan_terakhir === "true" ? true : false,
      },
    }));

    dispatch({
      type: "UPLOAD",
      payload: aa.ijazahfile,
    });

    txtpendidikan.current.focus();
  };

  const onBatal = () => {
    dispatchKaryawan({ type: "CLEAR_KARYAWAN" });
    dispatchKaryawan({
      type: "GET_PENDIDIKAN",
      payload: [],
    });
    setBtn("Simpan");
    setFormState((formState) => ({
      ...formState,
      values: {
        _id: null,
        nik: "",
        nama: "",
        no_ijazah: "",
        pendidikan: "",
        nama_sekolah: "",
        jurusan: "",
        kota_kab: "",
        pendidikan_terakhir: false,
        ijazahfile: "",
      },
      touched: {},
      errors: {},
    }));
  };

  const onClearform = () => {
    setFormState((formState) => ({
      ...formState,
      isValid: false,
      values: {
        ...formState.values,
        _id: null,
        no_ijazah: "",
        pendidikan: "",
        nama_sekolah: "",
        jurusan: "",
        kota_kab: "",
        pendidikan_terakhir: false,
        ijazahfile: "",
        nik: "",
        nama: "",
      },
      touched: {},
      errors: {},
    }));
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
      const errors = validate(formState.values, schema);
      setFormState((formState) => ({
        ...formState,
        isValid: errors ? false : true,
        touched: {
          nik: true,
          no_ijazah: true,
          pendidikan: true,
          nama_sekolah: true,
          jenis_kelamin: true,
          jurusan: true,
          kota_kab: true,
          pendidikan_terakhir: true,
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
        message: `Benar Data Pendidikan Karyawan ingin di ${
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
      no_ijazah: formState.values.no_ijazah,
      pendidikan: formState.values.pendidikan,
      nama_sekolah: formState.values.nama_sekolah,
      jurusan: formState.values.jurusan,
      kota_kab: formState.values.kota_kab,
      pendidikan_terakhir: formState.values.pendidikan_terakhir,
      ijazahfile: file_upload,
    };

    if (databody._id) {
      updatePendidikan({ nik: databody.nik, id: databody._id }, databody);
    } else {
      simpanPendidikan({ nik: databody.nik, id: databody._id }, databody);
    }

    // simpanPendidikan(
    //   { nik: formState.values.nik, id: formState.values._id },
    //   data_pendidikan
    // );
  };

  const onCheckPendidikanTerakhir = (e) => {
    setFormState((f) => ({
      ...f,
      values: {
        ...f.values,
        pendidikan_terakhir: e.target.checked,
      },
    }));
  };

  // const onchangefile = (e) => {
  //   console.log(e.target.files[0].name);
  //   setFormState((f) => ({
  //     ...f,
  //     values: {
  //       ...f.values,
  //       file: e.target.files[0].name,
  //     },
  //   }));
  // };

  const onchange = (e) => {
    const field = e.target.name;
    const val = e.target.value;
    const fileList = e.target.files;
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

  useEffect(() => {
    let a = true;
    if (a) {
      dispatchKaryawan({ type: "CLEAR_KARYAWAN" });
      dispatchKaryawan({
        type: "GET_PENDIDIKAN",
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
      if (riwayat_pendidikan) {
        setpendidikanData((f) =>
          riwayat_pendidikan.map((e) => {
            return {
              ...e,
              pendidikan_terakhir:
                e.pendidikan_terakhir === "true" ||
                e.pendidikan_terakhir === true
                  ? "Ya"
                  : "",
              ijazahfile:
                e.pendidikan_terakhir === "true" ? (
                  <a href={e.ijazahfile} autoCapitalize="true">
                    Download
                  </a>
                ) : (
                  ""
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
  }, [riwayat_pendidikan]);

  useEffect(() => {
    let a = true;
    if (a) {
      if (karyawan !== null) {
        setFormState((formState) => ({
          ...formState,
          values: {
            ...formState.values,
            nama: karyawan.nama,
          },
        }));
      } else {
        setFormState((formState) => ({
          ...formState,
          values: {
            ...formState.values,
            nama: "",
          },
        }));
      }
    }

    return () => {
      a = false;
    };
  }, [karyawan]);

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
      if (response.status === "success") {
        onClearform();
        setBtn("Simpan");
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
          <label id="title_field">Nik</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              ref={txtnik}
              value={formState.values.nik || ""}
              onChange={onchange}
              name="nik"
              placeholder="Cari Nik"
              minLength={7}
              maxLength={7}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getKaryawans(formState.values.nik);
                  getpendidikan({
                    nik: formState.values.nik,
                  });
                  txtpendidikan.current.focus()
                }
              }}
            />
            <MdFindInPage
              style={{ fontSize: "28px", cursor: "pointer" }}
              onClick={() => {
                getKaryawans(formState.values.nik);
                getpendidikan({
                  nik: formState.values.nik,
                });
              }}
            />
          </div>
        </div>
      </div>

      <label id="title_field">Nama :</label>
      <input name="nama" value={formState.values.nama || ""} disabled />

      <label id="title_field">Pendidikan :</label>
      <div style={{ display: "flex", gap: "25px" }}>
        <select
          onChange={onchange}
          ref={txtpendidikan}
          value={formState.values.pendidikan || ""}
          name="pendidikan"
          style={{ minWidth: "175px" }}
         
          onKeyDown={(e) => {
            if (e.key === "Enter") {
             txtnamasekolah.current.focus()
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

        <p
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginInline: "0",
            marginBlock: "0",
            fontWeight: "bold",
            fontStyle: "italic",
            fontSize: "10px",
          }}
        >
          <input
            style={{
              padding: "0px",
              marginRight: "5px",
              marginBottom: "0px",
              marginTop: "0",
              cursor: "pointer",
            }}
            name="pendidikan_terakhir"
            type="checkbox"
            onChange={onCheckPendidikanTerakhir}
            checked={false || formState.values.pendidikan_terakhir}
          />
          Set Sebagai Pendidiikan Terakhir
        </p>
      </div>
      <label id="error">
        {" "}
        {HasError("pendidikan", formState) ? formState.errors.pendidikan : ""}
      </label>

      <label id="title_field">Nama Sekolah :</label>
      <input
        name="nama_sekolah"
        value={formState.values.nama_sekolah || ""}
        onChange={onchange}
        ref={txtnamasekolah}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
           txtjurusan.current.focus()
          }
        }}
      />
      <label id="error">
        {HasError("nama_sekolah", formState)
          ? formState.errors.nama_sekolah
          : ""}
      </label>
      <label id="title_field">Jurusan :</label>
      <input
        name="jurusan"
        value={formState.values.jurusan || ""}u
        onChange={onchange}
        ref={txtjurusan}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
           txtnoijazah.current.focus()
          }
        }}u
      />
      <label id="error">
        {" "}
        {HasError("jurusan", formState) ? formState.errors.jurusan : ""}
      </label>

      <label id="title_field">No Ijazah :</label>
      <input
        name="no_ijazah"
        value={formState.values.no_ijazah || ""}
        onChange={onchange}
        ref={txtnoijazah}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
           txtkotakab.current.focus()
          }
        }}
      />
      <label id="error">
        {HasError("no_ijazah", formState) ? formState.errors.no_ijazah : ""}
      </label>

      <label id="title_field">Kota/Kab :</label>
      <input
        name="kota_kab"
        value={formState.values.kota_kab || ""}
        onChange={onchange}
        ref={txtkotakab}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
           btnSubmit.current.focus()
          }
        }}
      />
      <label id="error">
        {" "}
        {HasError("kota_kab", formState) ? formState.errors.kota_kab : ""}
      </label>

      {formState.values.pendidikan_terakhir ? (
        <>
          {" "}
          <label id="title_field">File Ijazah terakhir</label>
          <input
            type="file"
            value={formState.values.file}
            // onChange={onchangefile}
          />
          <Inputfile
            type="file"
            name="ijazah_file"
            // value={formState.values.ijazahfile }
            onChange={(e) => {
              onchangeFile(e);
            }}
          />
          <label>
            Current File :{" "}
            <a href={formState.values.ijazahfile || ""}>
              {formState.values.ijazahfile || ""}
            </a>
          </label>
        </>
      ) : (
        <></>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px 0px",
        }}
      >
        <Button ref={btnBatal} onClick={onBatal}>Batal</Button>
        <Button ref= {btnSubmit} onClick={onSubmit} disabled={formState.isValid ? false : true}>
          {btn}
        </Button>
      </div>
      <div>
        {/* <Tabledata
          theme={theme}
          rowperpage={5}
          rowsPerPageOptions={[5, 10, 15, "all"]}
          rowfilterby=""
          search_data=""
          cols={colpendidikan}
          datarows={pendidikanData}
          enableAction={true}
        /> */}
        <Tabledata
          theme={theme}
          rowperpage={5}
          rowsPerPageOptions={[5, 10, 15, "all"]}
          rowfilterby=""
          search_data=""
          cols={colpendidikan}
          datarows={pendidikanData || []}
          // datarows={riwayat_keluarga}

          // enableAction={true}
        />
      </div>
    </Div>
  );
}

export default Pendidikan;
