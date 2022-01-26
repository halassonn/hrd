import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Button } from "../../components/shared";
import { useTheme } from "../../theme/useTheme";
import Listdata from "../../components/shared/Listdata";
import { MdDelete, MdEdit, MdFindInPage } from "react-icons/md";
import validate from "validate.js";
import { v4 as uuid } from "uuid";
import {
  GlobalContext,
  KaryawanContext,
  ParameterContext,
} from "../../context";
import { Inputfile } from "../../components";

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

const colpekerjaan = [
  { id: "nik", title: "Nik" },
  { id: "nama", title: "Nama" },
  { id: "jenis_karyawan", title: "Jenis Karyawan" },
  { id: "jabatan", title: "Jabatan" },
  { id: "jabatan_aktif", title: "Jabatan Aktif" },
  { id: "kantor_penempatan", title: "Kantor" },
  { id: "file_sk", title: "SK / Kontrak Karyawan" },
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
function Pekerjaan() {
  const [pekerjaanData, setpekerjaanData] = useState([]);
  const {
    getKaryawans,
    karyawan,
    simpanDataPekerjaan,
    riwayat_pekerjaan,
    updateDataPekerjaan,
    deleteDatapekerjaan,
    getDataPekerjaan,
    dispatchKaryawan,
  } = useContext(KaryawanContext);
  const { parameters, getParameters } = useContext(ParameterContext);
  const { setResponse, closeResponse, response, uploadPdf, file_upload } =
    useContext(GlobalContext);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      _id: null,
      id_karyawan: "",
      kantor_penempatan: "",
      nik: "",
      nama: "",
      status_kawin: "",
      status_ptkp: "",
      jenis_karyawan: "",
      jabatan: "",
      golongan: "",
      tanggal_bergabung: "",
      nomor_sk: "",
      jenis_sk: "",
      tanggal_sk: "",
      file_sk: "",
      pendidikan: "",
      masa_kerja: null,
      jabatan_aktif: false,
    },
    touched: {},
    errors: {},
  });
  const [btn, setBtn] = useState("Simpan");
  const { theme } = useTheme();
  const txtnik = useRef();
  const cmdpendidikan = useRef();
  const cmdjeniskaryawan = useRef();
  const cmdjabatan = useRef();
  const cmdkantor = useRef();
  const txtstatusptkp = useRef();
  const txtgolongan = useRef();

  const txtnomor_sk = useRef();
  const txtjenis_sk = useRef();
  const txttanggal_sk = useRef();
  const txtfile_sk = useRef();
  const txttanggal_bergabung = useRef();

  const btnSubmit = useRef();
  const btnBatal = useRef();

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
              deleteDatapekerjaan({ nik: null, id: aa._id.toString() });
            }}
          >
            Ya
          </Button>
        </div>
      ),
    });
  };
  const onEdit = (aa) => {
    console.log(aa);
    setFormState((f) => ({
      ...f,
      values: {
        ...aa,
        nama: aa.id_karyawan.nama,
        nik: aa.id_karyawan.nik,
        pendidikan: aa.id_karyawan.data_pendidikan.filter(
          (e) => e.pendidikan_terakhir === "true"
        )[0].pendidikan,
        jenis_karyawan: aa.jenis_karyawan.kode,
        kantor_penempatan: aa.kantor_penempatan.kode,
        masa_kerja: aa.id_karyawan.masa_kerja,
        status_kawin: aa.id_karyawan.status_kawin,
        tanggal_bergabung: aa.id_karyawan.tgl_bergabung,
        jabatan: aa.jabatan.kode,
        jabatan_aktif: aa.jabatan_aktif,
      },
    }));
  };

  const onBatal = () => {
    setFormState((formState) => ({
      ...formState,
      values: {
        _id: null,
        id_karyawan: "",
        kantor_penempatan: "",
        nik: "",
        nama: "",
        status_kawin: "",
        status_ptkp: "",
        jenis_karyawan: "",
        jabatan: "",
        golongan: "",
        tanggal_bergabung: "",
        nomor_sk: "",
        jenis_sk: "",
        tanggal_sk: "",
        file_sk: "",
        pendidikan: "",
        masa_kerja: null,
        jabatan_aktif: false,
      },
      touched: {},
      errors: {},
    }));
  };

  const tableAction = (e) => {
    // if (e && e.jabatan_aktif === "true")
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
          style={{
            cursor: "pointer",
            marginRight: "5px",
          }}
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
      const errors = validate(
        formState.values,
        formState.values.jenis_karyawan === "PKWT"
          ? schemaPkwt
          : formState.values.jenis_karyawan === "TR"
          ? schematr
          : schema
      );

      setFormState((formState) => ({
        ...formState,
        isValid: errors ? false : true,
        touched:
          formState.values.jenis_karyawan === "PKWT"
            ? {
                kantor_penempatan: true,
                nik: true,
                pendidikan: true,
                status_kawin: true,
                status_ptkp: true,
                jabatan: true,
              }
            : formState.values.jenis_karyawan === "TR"
            ? {
                kantor_penempatan: true,
                nik: true,
                pendidikan: true,
                status_kawin: true,
                status_ptkp: true,
                jabatan: true,
              }
            : {
                kantor_penempatan: true,
                nik: true,
                pendidikan: true,
                status_kawin: true,
                status_ptkp: true,
                jenis_karyawan: true,
                jabatan: true,

                golongan: true,
                tanggal_bergabung: true,
                nomor_sk: true,
                jenis_sk: true,
                tanggal_sk: true,
                file_sk: true,
              },
        errors: errors || {},
      }));
      return true;
    } catch (error) {
      return;
    }
  };

  const onSubmit = () => {
    setResponse({
      show: true,
      message: `Benar Data Pekerjaan Karyawan ingin di ${
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
    if (validdata()) {
      const databody = {
        jenis_karyawan: formState.values.jenis_karyawan,
        golongan:
          formState.values.jenis_karyawan === "T" ||
          formState.values.jenis_karyawan === "85"
            ? formState.values.golongan
            : "",
        nomor_sk: formState.values.nomor_sk,
        jenis_sk: formState.values.jenis_sk,
        tanggal_sk: formState.values.tanggal_sk,
        jabatan: formState.values.jabatan,
        status_ptkp: formState.values.status_ptkp,
        kantor_penempatan: formState.values.kantor_penempatan,
        file_sk: file_upload,
        jabatan_aktif: formState.values.jabatan_aktif,
      };

      console.log(databody);

      if (formState.values._id) {
        updateDataPekerjaan(
          { nik: formState.values.nik, id: formState.values._id },
          databody
        );
      } else {
        simpanDataPekerjaan(
          { nik: formState.values.nik, id: formState.values._id },
          databody
        );
      }
    }
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
    console.log(fileList[0].name);
    setFormState((f) => ({
      ...f,
      values: {
        ...f.values,
        file_sk: fileList[0].name,
      },
    }));

    uploadPdf(formState.values.nik, fileList[0]);
  };

  const onCheckJAbatanaktif = (e) => {
    setFormState((f) => ({
      ...f,
      values: {
        ...f.values,
        jabatan_aktif: e.target.checked,
      },
    }));
  };

  useEffect(() => {
    let a = true;
    if (a) getParameters();
    return () => {
      a = false;
    };
  }, []);

  useEffect(() => {
    let a = true;
    if (a) {
      const validateform = () => {
        const errors = validate(
          formState.values,
          formState.values.jenis_karyawan === "PKWT"
            ? schemaPkwt
            : formState.values.jenis_karyawan === "TR"
            ? schematr
            : schema
        );
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
      if (riwayat_pekerjaan) {
        const x = riwayat_pekerjaan.map((f) => {
          return {
            ...f,
            nik: f.id_karyawan.nik,
            nama: f.id_karyawan.nama,
            jabatan: f.jabatan.desc,
            kantor_penempatan: f.kantor_penempatan.desc,
            jenis_karyawan: f.jenis_karyawan.desc,
            jabatan_aktif: f.jabatan_aktif === "true" ? "Ya" : "",
            file_sk: (
              <a href={f.file_sk} autoCapitalize="true">
                Download
              </a>
            ),
            action: tableAction(f),
          };
        });

        setpekerjaanData(x);
      }
    }
    return () => {
      a = false;
    };
  }, [riwayat_pekerjaan]);

  useEffect(() => {
    let a = true;
    if (a) {
      if (karyawan) {
        const pendi = karyawan
          ? karyawan.data_pendidikan.filter(
              (e) => e.pendidikan_terakhir === "true"
            )[0].pendidikan
          : null;
        setFormState((e) => ({
          ...e,
          values: {
            ...e.values,
            pendidikan: pendi,
            nama: karyawan.nama,
            status_kawin: karyawan.status_kawin,
            masa_kerja: karyawan.masa_kerja,
            tanggal_bergabung: karyawan.tgl_bergabung,
          },
        }));

        if (karyawan.data_pendidikan.length === 0) {
          setResponse({
            show: true,
            message: (
              <div>
                <label>`Input Data Pendidikan Terlebih Dahulu!!!`</label>
              </div>
            ),
            action: null,
            children: null,
          });
        }
      }
    }
    return () => {
      a = false;
    };
  }, [karyawan]);

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
              value={formState.values.nik || ""}
              onChange={onchange}
              name="nik"
              placeholder="Cari Nik"
              minLength={7}
              maxLength={7}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getKaryawans(formState.values.nik);
                  getDataPekerjaan({ nik: formState.values.nik, id: null });
                }
              }}
            />
            <MdFindInPage
              style={{ fontSize: "28px", cursor: "pointer" }}
              onClick={() => {
                getKaryawans(formState.values.nik);
                getDataPekerjaan({ nik: formState.values.nik, id: null });
              }}
            />
          </div>
        </div>
      </div>
      <label id="title_field">
        Nama :{formState.values.nama ? formState.values.nama : ""}
      </label>
      <label id="title_field">
        Status Kawin :{" "}
        {formState.values.status_kawin ? formState.values.status_kawin : ""}
        {formState.values.status_kawin
          ? ` / ${
              parameters.statuskawin.filter(
                (e) => e.kode === formState.values.status_kawin
              )[0].desc
            }`
          : ""}
      </label>
      <label id="title_field">
        Pendidikan :{" "}
        {formState.values.pendidikan ? formState.values.pendidikan : ""}
      </label>
      <label id="title_field">
        Tanggal Bergabung :{" "}
        {formState.values.tanggal_bergabung
          ? formState.values.tanggal_bergabung
          : ""}
      </label>
      <label id="title_field">
        Masa Kerja :{" "}
        {formState.values.masa_kerja
          ? `${formState.values.masa_kerja.tahun} Tahun ${formState.values.masa_kerja.bulan} Bulan`
          : ""}
      </label>
      <p />
      <label id="title_field">Jenis Karyawan :</label>
      <select
        onChange={onchange}
        ref={cmdjeniskaryawan}
        value={formState.values.jenis_karyawan || ""}
        name="jenis_karyawan"
        disabled={formState.values.nik && formState.values.nama ? false : true}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            cmdjabatan.current.focus();
          }
        }}
      >
        <option value=""></option>

        {parameters.jeniskaryawan
          ? formState.values.masa_kerja &&
            formState.values.masa_kerja.tahun === 0 &&
            formState.values.masa_kerja.bulan < 3
            ? parameters.jeniskaryawan
                .filter((f) => f.kode === "TR")
                .map((e, i) => (
                  <option key={uuid()} value={e.kode}>
                    {e.desc}
                  </option>
                ))
            : parameters.jeniskaryawan
                .filter((f) => f.kode !== "TR")
                .map((e, i) => (
                  <option key={uuid()} value={e.kode}>
                    {e.desc}
                  </option>
                ))
          : null}
      </select>
      <label id="error">
        {" "}
        {HasError("jenis_karyawan", formState)
          ? formState.errors.jenis_karyawan
          : ""}
      </label>
      {formState.values.jenis_karyawan &&
      formState.values.jenis_karyawan !== "TR" ? (
        <>
          <label id="title_field">Jabatan:</label>
          <div style={{ display: "flex", gap: "25px" }}>
            <select
              onChange={onchange}
              ref={cmdjabatan}
              value={formState.values.jabatan || ""}
              name="jabatan"
              style={{ minWidth: "175px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  txtgolongan.current.focus();
                }
              }}
            >
              <option value=""></option>
              {formState.values.jenis_karyawan === "PKWT"
                ? parameters.jabatan
                  ? parameters.jabatan
                      .filter((ee) => ee.kode_tingkat_jabatan === "6")
                      .map((e, i) => (
                        <option key={uuid()} value={e.kode}>
                          {e.desc}
                        </option>
                      ))
                  : null
                : parameters.jabatan
                ? parameters.jabatan
                    .filter((ee) => ee.kode_tingkat_jabatan !== "6")
                    .map((e, i) => (
                      <option key={uuid()} value={e.kode}>
                        {e.desc}
                      </option>
                    ))
                : null}
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
                onChange={onCheckJAbatanaktif}
                checked={false || formState.values.jabatan_aktif}
              />
              Set Sebagai Jabatan Aktif
            </p>
          </div>
          <label id="error">
            {" "}
            {HasError("jabatan", formState) ? formState.errors.jabatan : ""}
          </label>

          {formState.values.jenis_karyawan === "T" ||
          formState.values.jenis_karyawan === "85" ? (
            <>
              <label id="title_field">Golongan:</label>
              <select
                onChange={onchange}
                ref={txtgolongan}
                value={
                  formState.values.golongan ? formState.values.golongan : ""
                }
                name="golongan"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    txtstatusptkp.current.focus();
                  }
                }}
              >
                {formState.values.pendidikan === "SMP" ? (
                  <>
                    <option key={uuid()} disabled value="">
                      Golongan I
                    </option>
                    <option key={uuid()} value="1a">
                      1a
                    </option>
                    <option key={uuid()} value="1b">
                      1b
                    </option>
                    <option key={uuid()} value="1c">
                      1c
                    </option>
                    <option key={uuid()} value="1d">
                      1d
                    </option>
                  </>
                ) : formState.values.pendidikan === "SMA" ? (
                  <>
                    <option key={uuid()} disabled value="">
                      Golongan II
                    </option>
                    <option key={uuid()} value="2a">
                      2a
                    </option>
                    <option key={uuid()} value="2b">
                      2b
                    </option>
                    <option key={uuid()} value="2c">
                      2c
                    </option>
                    <option key={uuid()} value="2d">
                      2d
                    </option>
                    <option key={uuid()} disabled value="">
                      Golongan III
                    </option>
                    <option key={uuid()} value="3a">
                      3a
                    </option>
                  </>
                ) : formState.values.pendidikan === "D3" ? (
                  <>
                    <option key={uuid()} disabled value="">
                      Golongan II
                    </option>
                    <option key={uuid()} value="2b">
                      2b
                    </option>
                    <option key={uuid()} value="2c">
                      2c
                    </option>
                    <option key={uuid()} value="2d">
                      2d
                    </option>
                    <option key={uuid()} disabled value="">
                      Golongan III
                    </option>
                    <option key={uuid()} value="3a">
                      3a
                    </option>
                    <option key={uuid()} value="3b">
                      3b
                    </option>
                    <option key={uuid()} value="3c">
                      3c
                    </option>
                    <option key={uuid()} value="3d">
                      3d
                    </option>
                    <option key={uuid()} disabled value="">
                      Golongan IV
                    </option>
                    <option key={uuid()} value="4a">
                      4a
                    </option>
                  </>
                ) : (
                  <>
                    <option key={uuid()} disabled value="">
                      Golongan III
                    </option>
                    <option key={uuid()} value="3a">
                      3a
                    </option>
                    <option key={uuid()} value="3b">
                      3b
                    </option>
                    <option key={uuid()} value="3c">
                      3c
                    </option>
                    <option key={uuid()} value="3d">
                      3d
                    </option>
                    <option key={uuid()} disabled value="">
                      Golongan IV
                    </option>
                    <option key={uuid()} value="4a">
                      4a
                    </option>
                    <option key={uuid()} value="4b">
                      4b
                    </option>
                    <option key={uuid()} value="4c">
                      4c
                    </option>
                    <option key={uuid()} value="4d">
                      4d
                    </option>
                    <option key={uuid()} value="4e">
                      4e
                    </option>
                  </>
                )}
              </select>
              <label id="error">
                {" "}
                {HasError("golongan", formState)
                  ? formState.errors.golongan
                  : ""}
              </label>
            </>
          ) : (
            <></>
          )}
          <label id="title_field">
            Status PTKP (Pendapatan Tidak Kena Pajak) :
          </label>
          <select
            onChange={onchange}
            ref={txtstatusptkp}
            value={formState.values.status_ptkp || ""}
            name="status_ptkp"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                txtnomor_sk.current.focus();
              }
            }}
          >
            <option value=""></option>
            {parameters.statuskawin
              ? parameters.statuskawin.map((e, i) => (
                  <option key={uuid()} value={e.kode}>
                    {e.desc}
                  </option>
                ))
              : null}
          </select>
          <label id="error">
            {" "}
            {HasError("status_ptkp", formState)
              ? formState.errors.status_ptkp
              : ""}
          </label>

          <label id="title_field">No SK / Surat Kontrak PKWT :</label>
          <input
            ref={txtnomor_sk}
            name="nomor_sk"
            value={formState.values.nomor_sk ? formState.values.nomor_sk : ""}
            type="text"
            onChange={onchange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                txtjenis_sk.current.focus();
              }
            }}
          />

          <label id="error">
            {" "}
            {HasError("nomor_sk", formState) ? formState.errors.nomor_sk : ""}
          </label>
          <label id="ket">
            Jika Nomor untuk Surat Kontrak PKWT tidak ada, maka dapat di isi
            dengan "-"
          </label>
          <label id="title_field">Jenis SK / Surat Kontrak PKWT :</label>

          <input
            name="jenis_sk"
            value={formState.values.jenis_sk ? formState.values.jenis_sk : ""}
            type="text"
            onChange={onchange}
            ref={txtjenis_sk}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                txttanggal_sk.current.focus();
              }
            }}
          />

          <label id="error">
            {" "}
            {HasError("jenis_sk", formState) ? formState.errors.jenis_sk : ""}
          </label>
          <label id="ket">
            Jika Jenis Karyawan adalah PKWT maka dapat di isi dengan "-"
          </label>

          <label id="title_field">Tanggal SK / Surat Kontrak PKWT :</label>
          <input
            ref={txttanggal_sk}
            name="tanggal_sk"
            value={
              formState.values.tanggal_sk ? formState.values.tanggal_sk : ""
            }
            type="date"
            onChange={onchange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                cmdkantor.current.focus();
              }
            }}
          />
          <label id="error">
            {" "}
            {HasError("tanggal_sk", formState)
              ? formState.errors.tanggal_sk
              : ""}
          </label>
        </>
      ) : (
        <></>
      )}{" "}
      {formState.values.jenis_karyawan &&
      formState.values.jenis_karyawan !== "TR" ? (
        <>
          {" "}
          <label style={{ marginBottom: "10px" }} id="title_field">
            File SK Karyawan / Kontrak PKWT:
          </label>
          <Inputfile
            name="file_sk"
            // value={formState.values.file_sk ? formState.values.file_sk : ""}
            type="file"
            onChange={onchangeFile}
          />
          <label>
            Current File SK Karyawan / Kontrak PKWT :{" "}
            <a href={formState.values.file_sk || ""}>
              {formState.values.file_sk || ""}
            </a>
          </label>
        </>
      ) : (
        <></>
      )}
      <label id="title_field">Kantor Penempatan :</label>
      <select
        onChange={onchange}
        ref={cmdkantor}
        value={formState.values.kantor_penempatan || ""}
        name="kantor_penempatan"
        disabled={formState.values.nik && formState.values.nama ? false : true}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            btnSubmit.current.focus();
          }
        }}
      >
        <option value=""></option>
        {parameters.kodekantor
          ? parameters.kodekantor.map((e, i) => (
              <option key={e.kode} value={e.kode}>
                {e.nama}
              </option>
            ))
          : null}
      </select>
      <label id="error">
        {" "}
        {HasError("kantor_penempatan", formState)
          ? formState.errors.kantor_penempatan
          : ""}
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
        <Button
          ref={btnSubmit}
          disabled={formState.isValid ? false : true}
          onClick={onSubmit}
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
          cols={colpekerjaan}
          datarows={pekerjaanData || []}
          // enableAction={true}
        />
      </div>
    </Div>
  );
}

export default Pekerjaan;

const schema = {
  nik: {
    format: {
      pattern: "[0-9]+",
      message: "is required and can only contain 0-9",
    },
  },
  jenis_karyawan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  jabatan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  status_ptkp: {
    presence: { allowEmpty: false, message: "is required" },
  },
  kantor_penempatan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  golongan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  nomor_sk: {
    presence: { allowEmpty: false, message: "is required" },
  },
  jenis_sk: {
    presence: { allowEmpty: false, message: "is required" },
  },
  tanggal_sk: {
    presence: { allowEmpty: false, message: "is required" },
  },
  // file_sk: {
  //   presence: { allowEmpty: false, message: "is required" },
  // },
};
const schematr = {
  nik: {
    format: {
      pattern: "[0-9]+",
      message: "is required and can only contain 0-9",
    },
  },
  jenis_karyawan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  // jabatan: {
  //   presence: { allowEmpty: false, message: "is required" },
  // },
  // status_ptkp: {
  //   presence: { allowEmpty: false, message: "is required" },
  // },
  kantor_penempatan: {
    presence: { allowEmpty: false, message: "is required" },
  },
};

const schemaPkwt = {
  nik: {
    format: {
      pattern: "[0-9]+",
      message: "is required and can only contain 0-9",
    },
  },
  jenis_karyawan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  jabatan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  status_ptkp: {
    presence: { allowEmpty: false, message: "is required" },
  },
  kantor_penempatan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  nomor_sk: {
    presence: { allowEmpty: false, message: "is required" },
  },
  jenis_sk: {
    presence: { allowEmpty: false, message: "is required" },
  },
  tanggal_sk: {
    presence: { allowEmpty: false, message: "is required" },
  },
};
