import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Button } from "../../components/shared";
import validate from "validate.js";

import { GlobalContext, KaryawanContext } from "../../context";

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

function Pokok(props) {
  const { setResponse, closeResponse, response, loading } =
    useContext(GlobalContext);
  const { simpanDataKaryawan, selected, dispatchKaryawan } =
    useContext(KaryawanContext);
  const txtnik = useRef();
  const txtnoktp = useRef();
  const txtnpwp = useRef();
  const txtnama = useRef();
  const txtalamat_domisili = useRef();
  const txtjalan = useRef();
  const cmdkec = useRef();
  const cmdkabkota = useRef();
  const cmdprop = useRef();
  const cmdnegara = useRef();
  const txtkodepos = useRef();
  const txtemail = useRef();
  const cmdagama = useRef();
  const cmdstatuskawin = useRef();
  const cmdjenkel = useRef();
  const txt_tgllahir = useRef();
  const txt_tempatlahir = useRef();
  const txtnohp = useRef();
  const txttglbergabung = useRef();
  const btnSubmit = useRef();
  const btnBatal = useRef();

  const HasError = (field, state) =>
    state.touched[field] && state.errors[field] ? true : false;

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      _id: null,
      nik: "",
      noktp: "",
      npwp: "",
      nama: "",
      jenis_kelamin: "",
      alamat: "",
      kecamatan: "",
      kota_kab: "",
      propinsi: "",
      negara: "",
      kode_pos: "",
      sesuaiktp: false,
      alamat_domisili: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      email: "",
      agama: "",
      status_kawin: "",
      tgl_bergabung: "",
      no_hp: "",
      avatar: "",
    },
    touched: {},
    errors: {},
  });

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
  const onChangealamatsesuaiktp = (e) => {
    const field = e.target.name;
    const val = e.target.value;
    e.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [field]: val,
        alamat_domisili:
          formState.values.sesuaiktp === true
            ? `${field === "alamat" ? val : formState.values.alamat}, kec. ${
                field === "kecamatan" ? val : formState.values.kecamatan
              }, kota/kab. ${
                field === "kota_kab" ? val : formState.values.kota_kab
              }, prop. ${
                field === "propinsi" ? val : formState.values.propinsi
              } ${
                field === "kode_pos"
                  ? val
                  : formState.values.kode_pos
                  ? formState.values.kode_pos
                  : ""
              }, ${field === "negara" ? val : formState.values.negara}`
            : "",
      },

      touched: {
        ...formState.touched,
        [e.target.name]: true,
      },
    }));
  };
  const onCheck = (e) => {
    setFormState((f) => ({
      ...f,
      values: {
        ...f.values,
        alamat_domisili: e.target.checked
          ? `${formState.values.alamat}, kec. ${formState.values.kecamatan}, kota/kab. ${formState.values.kota_kab}, prop. ${formState.values.propinsi} ${formState.values.kode_pos},  ${formState.values.negara}`
          : "",
        sesuaiktp: e.target.checked,
      },
    }));
    if (!e.target.checked) {
      txtalamat_domisili.current.focus();
    }
  };
  const clearForm = () => {
    dispatchKaryawan({
      type: "SELECTED",
      payload: null,
      param: null,
    });
    setFormState(() => ({
      isValid: false,
      values: {
        _id: null,
        nik: "",
        noktp: "",
        npwp: "",
        nama: "",
        jenis_kelamin: "",
        alamat: "",
        kecamatan: "",
        kota_kab: "",
        propinsi: "",
        negara: "",
        kode_pos: "",
        sesuaiktp: false,
        alamat_domisili: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        email: "",
        agama: "",
        status_kawin: "",
        tgl_bergabung: "",
        no_hp: "",
        avatar: "",
      },
      touched: {},
      errors: {},
    }));
  };

  const onValiddata = () => {
    try {
      const errors = validate(formState.values, schema);
      setFormState((formState) => ({
        ...formState,
        isValid: errors ? false : true,
        touched: {
          nik: true,
          nama: true,
          noktp: true,
          email: true,
          agama: true,
          jenis_kelamin: true,
          status_kawin: true,
          tempat_lahir: true,
          tanggal_lahir: true,
          alamat: true,
          alamat_domisili: true,
          kecamatan: true,
          kota_kab: true,
          propinsi: true,
          negara: true,
        },
        errors: errors || {},
      }));
      return errors ? false : true;
    } catch (error) {
      return false;
    }
  };

  const onSave = () => {
    closeResponse();
    const data_karyawan = {
      _id: formState.values._id,

      nik: formState.values.nik,
      noktp: formState.values.noktp,
      npwp: formState.values.npwp,
      nama: formState.values.nama,
      jenis_kelamin: formState.values.jenis_kelamin,
      alamat_ktp: {
        alamat: formState.values.alamat,
        kecamatan: formState.values.kecamatan,
        kota_kab: formState.values.kota_kab,
        propinsi: formState.values.propinsi,
        negara: formState.values.negara,
        kode_pos: formState.values.kode_pos,
      },
      alamat_domisili: {
        sesuaiktp: formState.values.sesuaiktp,
        alamat: formState.values.alamat_domisili,
      },
      lahir: {
        tempat_lahir: formState.values.tempat_lahir,
        tanggal_lahir: formState.values.tanggal_lahir,
      },
      email: formState.values.email,
      agama: formState.values.agama,
      status_kawin: formState.values.status_kawin,
      no_hp: formState.values.no_hp,
      tgl_bergabung: formState.values.tgl_bergabung,
    };
    simpanDataKaryawan(data_karyawan._id, data_karyawan);
  };

  const onSubmit = () => {
    if (onValiddata())
      setResponse({
        show: true,
        message: `Benar Data Pokok Karyawan ingin di ${
          formState.values._id ? `Update` : `Simpan`
        }?`,
        action: null,
        children: (
          <div>
            <Button onClick={closeResponse}>Tidak</Button>
            <Button onClick={onSave}>Ya</Button>
          </div>
        ),
      });
  };

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
    if (a && selected) {
      setFormState((formState) => ({
        ...formState,
        isValid: true,
        values: {
          ...selected,
          alamat: selected.alamat_ktp.alamat,
          kecamatan: selected.alamat_ktp.kecamatan,
          kota_kab: selected.alamat_ktp.kota_kab,
          propinsi: selected.alamat_ktp.propinsi,
          negara: selected.alamat_ktp.negara,
          kode_pos: selected.alamat_ktp.kode_pos,
          alamat_domisili: selected.alamat_domisili.alamat,
          sesuaiktp: selected.alamat_domisili.sesuaiktp,
          tempat_lahir: selected.lahir.tempat_lahir,
          tanggal_lahir: selected.lahir.tanggal_lahir,
          tgl_bergabung: selected.tgl_bergabung,
        },
        touched: {
          nik: true,
          nama: true,
          noktp: true,
          email: true,
          agama: true,
          jenis_kelamin: true,
          status_kawin: true,
          tempat_lahir: true,
          tanggal_lahir: true,
          alamat: true,
          alamat_domisili: true,
          kecamatan: true,
          kota_kab: true,
          propinsi: true,
          negara: true,
          tgl_bergabung: true,
        },
        errors: {},
      }));
    }
    // if (a && selected === null && response.status === "success") {
    //   props.close();
    // }
    return () => (a = false);
    // eslint-disable-next-line
  }, [selected]);

  useEffect(() => {
    let a = true;
    if (a) {
      if (response.status === "success") {
        clearForm();
      }
    }

    return () => {
      a = false;
    };
  }, [response.status]);

  return (
    <Div>
      <label id="title_field">Nik : </label>
      <input
        ref={txtnik}
        value={formState.values.nik || ""}
        onChange={onchange}
        name="nik"
        maxLength={7}
        minLength={7}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtnoktp.current.focus();
          }
        }}
      />
      {HasError("nik", formState) && (
        <label id="error">{formState.errors.nik}</label>
      )}
      <label id="title_field">No KTP : </label>
      <input
        ref={txtnoktp}
        name="noktp"
        value={formState.values.noktp || ""}
        onChange={onchange}
        maxLength="16"
        minLength="16"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtnpwp.current.focus();
          }
        }}
      />
      {HasError("noktp", formState) && (
        <label id="error">{formState.errors.noktp}</label>
      )}
      <label id="title_field">NPWP : </label>
      <input
        ref={txtnpwp}
        value={formState.values.npwp || ""}
        onChange={onchange}
        name="npwp"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtnama.current.focus();
          }
        }}
      />
      <label id="title_field">Nama : </label>
      <input
        type="text"
        ref={txtnama}
        value={formState.values.nama || ""}
        onChange={onchange}
        name="nama"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtemail.current.focus();
          }
        }}
      />
      {HasError("nama", formState) && (
        <label id="error">{formState.errors.nama}</label>
      )}
      <label id="title_field">Email : </label>
      <input
        placeholder="contoh@email.com"
        type="email"
        ref={txtemail}
        value={formState.values.email || ""}
        onChange={onchange}
        name="email"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtjalan.current.focus();
          }
        }}
      />
      {HasError("email", formState) && (
        <label id="error">{formState.errors.email}</label>
      )}
      <label id="title_field">Alamat Sesuai KTP : </label>
      <input
        name="alamat"
        ref={txtjalan}
        value={formState.values.alamat}
        onChange={onChangealamatsesuaiktp}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            cmdkec.current.focus();
          }
        }}
      />
      {HasError("alamat", formState) && (
        <label id="error">{formState.errors.alamat}</label>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          columnGap: "25px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label id="title_field">Kecamatan : </label>
          <select
            ref={cmdkec}
            value={formState.values.kecamatan || ""}
            onChange={onChangealamatsesuaiktp}
            name="kecamatan"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                cmdkabkota.current.focus();
              }
            }}
          >
            <option defaultValue="">Agama</option>
            <option value="Budha">Budha</option>
            <option value="Hindu">Hindu</option>
            <option value="Islam">Islam</option>
            <option value="Katolik">Katolik</option>
            <option value="Kristen Protestan">Kristen Protestan</option>
          </select>
          {HasError("kecamatan", formState) && (
            <label id="error">{formState.errors.kecamatan}</label>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label id="title_field">Kota/Kab : </label>
          <select
            ref={cmdkabkota}
            value={formState.values.kota_kab || ""}
            onChange={onChangealamatsesuaiktp}
            name="kota_kab"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                cmdprop.current.focus();
              }
            }}
          >
            <option defaultValue="">Agama</option>
            <option value="Budha">Budha</option>
            <option value="Hindu">Hindu</option>
            <option value="Islam">Islam</option>
            <option value="Katolik">Katolik</option>
            <option value="Kristen Protestan">Kristen Protestan</option>
          </select>
          {HasError("kota_kab", formState) && (
            <label id="error">{formState.errors.kota_kab}</label>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label id="title_field">Propinsi : </label>
          <select
            ref={cmdprop}
            value={formState.values.propinsi || ""}
            onChange={onChangealamatsesuaiktp}
            name="propinsi"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                cmdnegara.current.focus();
              }
            }}
          >
            <option defaultValue="">Agama</option>
            <option value="Budha">Budha</option>
            <option value="Hindu">Hindu</option>
            <option value="Islam">Islam</option>
            <option value="Katolik">Katolik</option>
            <option value="Kristen Protestan">Kristen Protestan</option>
          </select>
          {HasError("propinsi", formState) && (
            <label id="error">{formState.errors.propinsi}</label>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label id="title_field">Negara : </label>
          <select
            ref={cmdnegara}
            value={formState.values.negara || ""}
            onChange={onChangealamatsesuaiktp}
            name="negara"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                txtkodepos.current.focus();
              }
            }}
          >
            <option defaultValue="">Agama</option>
            <option value="Budha">Budha</option>
            <option value="Hindu">Hindu</option>
            <option value="Islam">Islam</option>
            <option value="Katolik">Katolik</option>
            <option value="Kristen Protestan">Kristen Protestan</option>
          </select>

          {HasError("negara", formState) && (
            <label id="error">{formState.errors.negara}</label>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label id="title_field">Kodepos : </label>
          <input
            ref={txtkodepos}
            value={formState.values.kode_pos || ""}
            onChange={onChangealamatsesuaiktp}
            name="kode_pos"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                txtalamat_domisili.current.focus();
              }
            }}
          />

          {HasError("kode_pos", formState) && (
            <label id="error">{formState.errors.kode_pos}</label>
          )}
        </div>
      </div>

      <label id="title_field"> Alamat Domisili :</label>
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
          name="sesuaiktp"
          type="checkbox"
          onChange={onCheck}
          checked={false || formState.values.sesuaiktp}
        />
        Sesuai dengan Alamat di KTP ?
      </p>

      <textarea
        ref={txtalamat_domisili}
        value={formState.values.alamat_domisili || ""}
        onChange={onchange}
        name="alamat_domisili"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txt_tempatlahir.current.focus();
          }
        }}
      />
      {HasError("alamat_domisili", formState) && (
        <label id="error">{formState.errors.alamat_domisili}</label>
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
                cmdagama.current.focus();
              }
            }}
          />
          {HasError("tanggal_lahir", formState) && (
            <label id="error">{formState.errors.tanggal_lahir}</label>
          )}
        </div>
      </div>

      <label id="title_field">Agama : </label>
      <select
        ref={cmdagama}
        value={formState.values.agama || ""}
        onChange={onchange}
        name="agama"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            cmdjenkel.current.focus();
          }
        }}
      >
        <option defaultValue="">Agama</option>
        <option value="Budha">Budha</option>
        <option value="Hindu">Hindu</option>
        <option value="Islam">Islam</option>
        <option value="Katolik">Katolik</option>
        <option value="Kristen Protestan">Kristen Protestan</option>
      </select>
      {HasError("agama", formState) && (
        <label id="error">{formState.errors.agama}</label>
      )}
      <label id="title_field">Jenis Kelamin : </label>
      <select
        ref={cmdjenkel}
        value={formState.values.jenis_kelamin || ""}
        onChange={onchange}
        name="jenis_kelamin"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            cmdstatuskawin.current.focus();
          }
        }}
      >
        <option defaultValue="">Jenis Kelamin</option>
        <option value="L">Laki-Laki</option>
        <option value="P">Perempuan</option>
      </select>
      {HasError("jenis_kelamin", formState) && (
        <label id="error">{formState.errors.jenis_kelamin}</label>
      )}
      <label id="title_field">Status Kawin : </label>
      <select
        ref={cmdstatuskawin}
        value={formState.values.status_kawin || ""}
        onChange={onchange}
        name="status_kawin"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txttglbergabung.current.focus();
          }
        }}
      >
        <option defaultValue="">Status Kawin</option>
        <option value="TK">TK</option>
        <option value="K0">K0</option>
        <option value="K1">K1</option>
        <option value="K2">K2</option>
        <option value="K3">K3</option>
      </select>
      {HasError("status_kawin", formState) && (
        <label id="error">{formState.errors.status_kawin}</label>
      )}

      <label id="title_field">Tanggal Bergabung : </label>
      <input
        type="date"
        ref={txttglbergabung}
        value={formState.values.tgl_bergabung || ""}
        onChange={onchange}
        name="tgl_bergabung"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            txtnohp.current.focus();
          }
        }}
      />
      {HasError("tgl_bergabung", formState) && (
        <label id="error">{formState.errors.tgl_bergabung}</label>
      )}

      <label id="title_field">No HP : </label>
      <input
        ref={txtnohp}
        value={formState.values.no_hp || ""}
        onChange={onchange}
        name="no_hp"
        maxLength={13}
        minLength={11}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            btnSubmit.current.focus();
          }
        }}
      />
      {HasError("no_hp", formState) && (
        <label id="error">{formState.errors.no_hp}</label>
      )}

      <label
        style={{ fontWeight: "bold", fontSize: "14px", marginTop: "15px" }}
      >
        {selected &&
          `Masa Kerja : ${selected.masa_kerja.tahun} Tahun ${selected.masa_kerja.bulan} Bulan`}
      </label>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px 0px",
        }}
      >
        <Button ref={btnBatal} onClick={clearForm}>
          Batal
        </Button>
        <Button
          ref={btnSubmit}
          disabled={formState.isValid ? false : true}
          onClick={() => {
            onSubmit();
          }}
        >
          Simpan
        </Button>
      </div>
    </Div>
  );
}

export default Pokok;

const schema = {
  nik: {
    format: {
      pattern: "[0-9]+",
      message: "is required and can only contain 0-9",
    },
  },
  noktp: {
    format: {
      pattern: "[0-9]+",
      message: "is required and can only contain 0-9",
    },
  },
  nama: {
    presence: { allowEmpty: false, message: "is required" },
  },

  alamat: {
    presence: { allowEmpty: false, message: "is required" },
  },
  kecamatan: {
    presence: { allowEmpty: false, message: "is required" },
  },
  kota_kab: {
    presence: { allowEmpty: false, message: "is required" },
  },
  propinsi: {
    presence: { allowEmpty: false, message: "is required" },
  },
  negara: {
    presence: { allowEmpty: false, message: "is required" },
  },

  alamat_domisili: {
    presence: { allowEmpty: false, message: "is required" },
  },
  email: {
    presence: {
      allowEmpty: true,

      // message: "is required",
    },
    email: true,
  },
  jenis_kelamin: {
    presence: { allowEmpty: false, message: "is required" },
  },
  agama: {
    presence: { allowEmpty: false, message: "is required" },
  },

  tanggal_lahir: {
    presence: { allowEmpty: false, message: "is required" },
  },
  tempat_lahir: {
    presence: { allowEmpty: false, message: "is required" },
  },
  status_kawin: {
    presence: { allowEmpty: false, message: "is required" },
  },
  no_hp: {
    format: {
      pattern: "[0-9]+",
      message: "is required and can only contain 0-9",
    },
  },
};
