import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { GlobalContext, KaryawanContext } from "../../context";
import { useTheme } from "../../theme/useTheme";
import Listdata from "../../components/shared/Listdata";
import { Inputfile } from "../../components";

import { useReactToPrint } from "react-to-print";
import { Button } from "../../components/shared";
import { MdPrint } from "react-icons/md";

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
  position: relative;
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
  & #rowtitle {
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 4px;
    & label {
      width: 150px;
    }
  }
`;
function Detail() {
  const { selected, changeAvatarKaryawan } = useContext(KaryawanContext);
  const { uploadPdf } = useContext(GlobalContext);
  const { theme } = useTheme();
  const [datakerja, setDataKerja] = useState([]);
  const [datapendidikan, setDatapendidikan] = useState([]);
  const [datapelatihan, setDatapelatihan] = useState([]);
  const [dataperingatan, setDataPeringatan] = useState([]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    let a = true;
    if (a) {
      if (selected && selected.data_pekerjaan) {
        const pekerjaans = selected.data_pekerjaan.map((f) => {
          return {
            ...f,
            nik: selected.nik,
            nama: selected.nama,
            jabatan: f.jabatan.desc,
            kantor_penempatan: f.kantor_penempatan.desc,
            jenis_karyawan: f.jenis_karyawan.desc,
            jabatan_aktif: f.jabatan_aktif === "true" ? "Ya" : "",
            masa_kerja: `${selected.masa_kerja.tahun} Tahun / ${selected.masa_kerja.bulan} Bulan`,
            file_sk: (
              <a href={f.file_sk} autoCapitalize="true">
                Download
              </a>
            ),
          };
        });
        const pendi = selected.data_pendidikan.map((f) => {
          return {
            ...f,
            nik: selected.nik,
            nama: selected.nama,
            pendidikan: f.pendidikan,
            pendidikan_terakhir: f.pendidikan_terakhir === "true" ? "Ya" : "",
            ijazahfile:
              f.pendidikan_terakhir === "true" ? (
                <a href={f.ijazahfile} autoCapitalize="true">
                  Download
                </a>
              ) : (
                ""
              ),
            // ijazahfile: f.ijazahfile,
          };
        });

        const pela = selected.data_pelatihan.map((f) => {
          return {
            ...f,
            // file_sertifikat: f.file_sertifikat,
            file_sertifikat: f.file_sertifikat ? (
              <a href={f.file_sertifikat} autoCapitalize="true">
                Download
              </a>
            ) : (
              ""
            ),
          };
        });
        const peri = selected.data_peringatan.map((f) => {
          return {
            ...f,
            file_peringatan: f.file_peringatan ? (
              <a href={f.file_peringatan} autoCapitalize="true">
                Download
              </a>
            ) : (
              ""
            ),
          };
        });
        setDatapendidikan(pendi);
        setDataKerja(pekerjaans);
        setDatapelatihan(pela);
        setDataPeringatan(peri);
      }
    }
    return () => {
      a = false;
    };
  }, [selected]);
  const onChangeAvatar = (e) => {
    const fileList = e.target.files;
    changeAvatarKaryawan(selected.nik, fileList[0]);
  };

  return (
    <>
      <Div>
        <div className="action_print">
          <Button onClick={handlePrint}>
            <MdPrint />
          </Button>
        </div>
        <div ref={componentRef} className="cardpaper">
          <div className="avatar">
            <img
              alt="userphoto"
              src={selected ? selected.avatar : ""}
              width="130px"
              height="150px"
            />
            <Inputfile
              id="uploadimage"
              type="file"
              //   title={!loading ? "Change" : null}
              className="avatar_btn"
              onChange={onChangeAvatar}
            />
          </div>
          <p />

          <div id="rowtitle">
            <label>Nik</label>
            {`: ${selected.nik}`}
          </div>
          <div id="rowtitle">
            <label>Nama</label>
            {`: ${selected.nama}`}
          </div>
          <div id="rowtitle">
            <label>No KTP</label>
            {`: ${selected.noktp}`}
          </div>
          <div id="rowtitle">
            <label>NPWP</label>
            {`: ${selected.npwp}`}
          </div>
          <div id="rowtitle">
            <label>EMAIL</label>
            {`: ${selected.email}`}
          </div>

          <div id="rowtitle">
            <label>Jenis Kelamin</label>
            {`: ${selected.jenis_kelamin === "P" ? "Perempuan" : "Laki-Laki"}`}
          </div>
          <div id="rowtitle">
            <label>Tempat/Tanggal Lahir</label>
            {`: ${selected.lahir.tempat_lahir} / ${selected.lahir.tanggal_lahir}`}
          </div>
          <div id="rowtitle">
            <label>Agama</label>
            {`: ${selected.agama}`}
          </div>

          <h3>Data Keluarga</h3>
          <div>
            <Tabledata
              theme={theme}
              rowperpage={5}
              rowsPerPageOptions={[5, 10, 15, "all"]}
              rowfilterby=""
              search_data=""
              cols={colKeluarga}
              datarows={selected ? selected.data_keluarga : []}
              pagination={false}
            />
          </div>
          <h3>Data Pendidikan</h3>
          <Tabledata
            theme={theme}
            rowperpage={5}
            rowsPerPageOptions={[5, 10, 15, "all"]}
            rowfilterby=""
            search_data=""
            cols={colpendidikan}
            datarows={datapendidikan || []}
            pagination={false}
          />
          <h3>Data Pekerjaan</h3>
          <Tabledata
            theme={theme}
            rowperpage={5}
            rowsPerPageOptions={[5, 10, 15, "all"]}
            rowfilterby=""
            search_data=""
            cols={colpekerjaan}
            datarows={datakerja || []}
            pagination={false}
          />
          <h3>Data Pelatihan Yang Pernah Diikuti</h3>
          <Tabledata
            theme={theme}
            rowperpage={5}
            rowsPerPageOptions={[5, 10, 15, "all"]}
            rowfilterby=""
            search_data=""
            cols={colPelatihan}
            datarows={datapelatihan || []}
            pagination={false}
          />
          <h3>Data Peringatan (SP)</h3>
          <Tabledata
            theme={theme}
            rowperpage={5}
            rowsPerPageOptions={[5, 10, 15, "all"]}
            rowfilterby=""
            search_data=""
            cols={colPeringatan}
            datarows={dataperingatan || []}
            pagination={false}
          />
        </div>
      </Div>
    </>
  );
}

export default Detail;

const colKeluarga = [
  { id: "no_kartu_keluarga", title: "No KK" },
  { id: "no_KTP", title: "No KTP" },
  { id: "nama", title: "NAMA" },
  { id: "tempat_lahir", title: "TEMPAT LAHIR" },
  { id: "tanggal_lahir", title: "TANGGAL LAHIR" },
  { id: "pendidikan", title: "PENDIDIKAN" },
  { id: "pekerjaan", title: "PEKERJAAN" },
  { id: "hubungan", title: "HUBUNGAN" },
];
const colpendidikan = [
  { id: "pendidikan", title: "Pendidikan" },
  { id: "jurusan", title: "JURUSAN" },
  { id: "no_ijazah", title: "No Ijazah" },
  { id: "nama_sekolah", title: "Sekolah" },
  { id: "kota_kab", title: "Alamat" },
  { id: "pendidikan_terakhir", title: "Pendidikan_terakhir" },
  { id: "ijazahfile", title: "File Ijazah" },
];

const colpekerjaan = [
  { id: "jenis_karyawan", title: "Jenis Karyawan" },
  { id: "golongan", title: "Golongan" },
  { id: "jabatan", title: "Jabatan" },
  { id: "masa_kerja", title: "Masa_kerja" },
  { id: "kantor_penempatan", title: "Kantor" },

  { id: "jabatan_aktif", title: "Jabatan Sekarang" },
  { id: "file_sk", title: "FILE SK/KONTRAK" },
];

const colPelatihan = [
  { id: "nama_pelatihan", title: "Nama" },
  { id: "tgl_pelatihan", title: "Tanggal Pelatihan" },
  { id: "tempat_pelatihan", title: "Tempat" },
  { id: "nama_penyelenggara", title: "Peneyelenggara" },
  { id: "nama_tentor", title: "Nama Tutor" },
  { id: "file_sertifikat", title: "File Setifikat" },
];

const colPeringatan = [
  { id: "jenis_peringatan", title: "Jenis Surat Peringatan" },
  { id: "tingkat_peringatan", title: "Tingkat Surat Peringatan" },
  { id: "tgl_peringatan", title: "Tanggal Surat Peringatan" },
  { id: "file_peringatan", title: "File Surat Peringatan" },
];
